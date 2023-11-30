// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IGitcoinResolver.sol";

contract CredentialVerifier is Ownable {
    
    IGitcoinResolver private _gitcoinResolver;

    constructor(address gitcoinResolverAddress_) Ownable(_msgSender()) {
        _gitcoinResolver = IGitcoinResolver(gitcoinResolverAddress_);
    }

    function verifyGitcionPass(address owner, bytes32 uid) public returns (bool) {
        // Testnet
        return true;
        // return uint(_gitcoinResolver.userAttestations(owner, uid)) > 0;
    }

    function calcWeight(address owner, bytes32 uid) public returns (uint) {
        // Testnet
        if (true) {
            // if (uint(_gitcoinResolver.userAttestations(owner, uid)) > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    // TODO
    // 1. integration of other resolvers & credentials
    // 2. framework design
}
