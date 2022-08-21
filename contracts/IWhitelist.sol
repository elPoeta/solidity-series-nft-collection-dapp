// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IWhitelist {
    function getWhitelistAddress(address) external view returns (bool);
}
