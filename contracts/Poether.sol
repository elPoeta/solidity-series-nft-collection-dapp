// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IWhitelist.sol";

contract Poether is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    IWhitelist private s_whitelist;
    string private s_baseTokenURI;
    bool private s_presaleStarted;
    uint256 private s_presaleEndedInMinutes;

    constructor(string memory baseURI, address whitelistContract)
        ERC721("Poether", "LETTHER")
    {
        s_baseTokenURI = baseURI;
        s_whitelist = IWhitelist(whitelistContract);
    }

    event presale_started(bool indexed s_presaleStarted);

    function startPresale() public onlyOwner {
        s_presaleStarted = true;
        s_presaleEndedInMinutes = block.timestamp + 5 minutes;
        emit presale_started(s_presaleStarted);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseTokenURI;
    }

    function getWhitelist(address _address) public view returns (bool) {
        return s_whitelist.getWhitelistAddress(_address);
    }

    receive() external payable {}

    fallback() external payable {}
}
