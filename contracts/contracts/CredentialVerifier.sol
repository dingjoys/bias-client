// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IGitcoinResolver {
    mapping(address => mapping(bytes32 => bytes32)) public userAttestations;
}

contract CredentialVerifier is Ownable {
    IGitcoinResolver private _gitcoinResolver;

    constructor(address gitcoinResolverAddress_) public {
        _gitcoinResolver = IGitcoinResolver(gitcoinResolverAddress_);
        _transferOwnership(_msgsender());
    }

    function verifyGitcionPass(address owner, bytes32 uid) returns (bool) {
        return uint(_gitcoinResolver.userAttestations(owner, uid)) > 0;
    }

    function calcWeight(address owner, bytes32 uid) returns (uint) {
        if(uint(_gitcoinResolver.userAttestations(owner, uid)) > 0){
            return 1
        }else{
            return 0
        }
    }
}
