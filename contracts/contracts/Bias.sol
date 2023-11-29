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
        string choiceA;
        string choiceB;
    }

    /**
     * @dev Earnings each vote
     */
    uint public rewards = 10 * 1e18

    Topic[] private _topics;
    mapping(uint => uint) votes;

    CredentialVerifier private _credentialVerifier;

    constructor() ERC20("BIAS", "BIAS") {
        // OP
        _credentialVerifier = new CredentialVerifier("0xc94aBf0292Ac04AAC18C251d9C8169a8dd2BBbDC");
    }

    function propose(
        uint32 createdAt,
        string title,
        string content,
        string choiceA,
        string choiceB,
        bytes32 gitcoinPassUid
    ) public {
        require(_credentialVerifier.verifyGitcionPass(gitcoinPassUid), "not authorized");
        _topics.push(Topic(round, msg.sender, createdAt, title, content, choiceA, choiceB));
    }

    function topicAt(uint index) public returns (Topic) {
        return _topics[index];
    }


}
