// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IGitcoinResolver {
    mapping(address => mapping(bytes32 => bytes32)) public userAttestations;
}