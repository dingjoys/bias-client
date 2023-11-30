// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CredentialVerifier.sol";

contract BiasProtocol is ERC20, Ownable{
    event Vote(
        address indexed voter,
        uint indexed topicId,
        uint choice,
        uint weight
    );
    struct Topic {
        address creator;
        uint createdAt;
        string title;
        string content;
        uint funds;
        /**
         * Of participants
         */
        uint max;
    }

    /**
     * @dev Earnings each vote
     */
    uint public _rewards = 10 * 1e18;

    Topic[] public _topics;
    /**
     * @dev Votes result storage
     */
    mapping(uint => mapping(uint => uint)) public _votes;

    /**
     * @dev Voter counts storage
     */
    mapping(uint => uint) public _voterCounts;

    /**
     * @dev Each user is allowed to create one live topic at the time. Once the topic is fulfilled the user could create the next topic. The purpose is to decrease verbose topics.
     */
    mapping(address => uint) private _living;
    CredentialVerifier private _credentialVerifier;

    mapping(address => uint256) public _lastJoinTime;
    uint256 constant DAY_IN_SECONDS = 86400;

    constructor() ERC20("BIAS", "BIAS") Ownable(msg.sender){
        // OP
        _credentialVerifier = new CredentialVerifier(0xc94aBf0292Ac04AAC18C251d9C8169a8dd2BBbDC);
    }

    /**
     * @dev The fund must be more than 10% voter rewards; The creators could get refunds when the topic is fulfilled. It is designed to decrease outdated topics and the creators should choose the participants numebr wisely.
     */
    function create(
        string memory title,
        string memory content,
        uint funds,
        uint max,
        bytes32 gitcoinPassUid
    ) public {
        require(
            _credentialVerifier.verifyGitcionPass(msg.sender, gitcoinPassUid),
            "not authorized"
        );
        require(
            balanceOf(msg.sender) >= funds && funds >= (max * _rewards) / 10,
            "insufficient funds"
        );
        require(max > 0, "invalid params");
        require(_living[msg.sender] == 0, "only allow one live topic");
        _burn(msg.sender, funds);
        _topics.push(
            Topic(msg.sender, block.timestamp, title, content, funds, max)
        );
        _living[msg.sender] = _topics.length - 1;
    }

    function topicAt(uint index) public returns (Topic memory ) {
        return _topics[index];
    }

    /**
     * @dev Each single user could vote once per day.
     */
    function vote(uint topicId, uint voteFor, bytes32 gitcoinPassUid) public {
        uint weight = _credentialVerifier.calcWeight(
            msg.sender,
            gitcoinPassUid
        );
        require(weight > 0, "not authorized");
        require(_voterCounts[topicId] < _topics[topicId].max, "finished");
        require(
            block.timestamp >= _lastJoinTime[msg.sender] + DAY_IN_SECONDS,
            "once per day"
        );
        _lastJoinTime[msg.sender] = block.timestamp;

        _mint(
            msg.sender,
            _rewards * weight + _topics[topicId].funds / _topics[topicId].max
        );
        _voterCounts[topicId] += 1;
        _votes[topicId][voteFor] += weight;
        emit Vote(msg.sender, topicId, voteFor, weight);

        if (_voterCounts[topicId] == _topics[topicId].max) {
            _living[_topics[topicId].creator] = 0;
        }
    }

    /**
     * @dev A successful votings could redeem the funds and receive a 10% bonus
     */
    function claimRewards(uint topicId) public {
        require(_voterCounts[topicId] >= _topics[topicId].max, "not finished");
        require(_topics[topicId].creator == msg.sender, "only creator");
        _mint(msg.sender, _topics[topicId].funds / 5);
    }

    /**
     * @dev the owner could be migrated to the relayer of inflation control
     */
    function updateRewards(uint rewards_) public onlyOwner {
        _rewards = rewards_;
    }
}
