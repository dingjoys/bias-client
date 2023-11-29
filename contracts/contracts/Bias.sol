// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./CredentialVerifier.sol";

contract Bias is ERC20 {
    struct Topic {
        address creator;
        uint32 createdAt;
        string title;
        string content;
        uint funds;
        // string choiceA;
        // string choiceB;
    }

    /**
     * @dev Earnings each vote
     */
    uint public rewards = 10 * 1e18

    Topic[] public _topics;
    mapping(uint => mapping(uint => uint)) public votes;
    mapping (uint => mapping(address => uint)) public voted;

    CredentialVerifier private _credentialVerifier;

    constructor() ERC20("BIAS", "BIAS") {
        // OP
        _credentialVerifier = new CredentialVerifier("0xc94aBf0292Ac04AAC18C251d9C8169a8dd2BBbDC");
    }

    function propose(
        string title,
        string content,
        uint funds,
        bytes32 gitcoinPassUid
    ) public {
        require(_credentialVerifier.verifyGitcionPass(gitcoinPassUid), "not authorized");
        require(_transferFrom())
        _topics.push(Topic(msg.sender, block.timestamp, title, content, funds));
    }

    function topicAt(uint index) public returns (Topic) {
        return _topics[index];
    }

    function vote(uint raffleId, uint voteFor, bytes32 gitcoinPassUid) public {
        uint weight = _credentialVerifier.calcWeight(msg.sender, gitcoinPassUid);
        require(weight>0, "not authorized");

        _mint(msg.sender, rewards);
    }




}
