// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IWhitelist.sol";

import "hardhat/console.sol";

error presale_not_runnig(string message);
error presale_runnig(string message);
error address_not_listed(string message);
error exceeded_max_supply(string message);
error insufficient_ether(string message);
error withdraw_fail(string message);
error paused(string message);

contract Poether is ERC721Enumerable, Ownable {
    event presale_started(bool indexed s_presaleStarted);
    event token_minted(uint256 tokenId);
    event withdraw_sent(uint256 amount);

    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    IWhitelist private s_whitelist;
    string private s_baseTokenURI;
    bool private s_presaleStarted;
    uint256 private s_presaleEndedInMinutes;
    uint256 private s_price = 0.01 ether;
    uint256 private s_maxTokenIds;
    bool s_paused;

    constructor(
        string memory baseURI,
        uint256 _maxTokenIds,
        address whitelistContract
    ) ERC721("Poether", "LETTHER") {
        s_baseTokenURI = baseURI;
        s_maxTokenIds = _maxTokenIds;
        s_whitelist = IWhitelist(whitelistContract);
        s_paused = false;
    }

    modifier onlyWhenNotPaused() {
        if (s_paused) revert paused({message: "Contract currently paused"});
        _;
    }

    function startPresale() public onlyOwner {
        s_presaleStarted = true;
        s_presaleEndedInMinutes = block.timestamp + 5 minutes;
        emit presale_started(s_presaleStarted);
    }

    function presaleMint() public payable onlyWhenNotPaused {
        if (!s_presaleStarted || block.timestamp > s_presaleEndedInMinutes)
            revert presale_not_runnig({message: "Presale is not running"});

        if (!s_whitelist.getWhitelistAddress(msg.sender))
            revert address_not_listed({message: "Address not listed"});

        if (s_tokenIds.current() >= s_maxTokenIds)
            revert exceeded_max_supply({
                message: "Exceeded maximum LETTHER supply"
            });

        if (msg.value < s_price)
            revert insufficient_ether({
                message: "Ether sent is not correct - minimum price 0.01 ether"
            });

        s_tokenIds.increment();
        uint256 tokenId = s_tokenIds.current();
        _safeMint(msg.sender, tokenId);
        emit token_minted(tokenId);
    }

    function mint() public payable onlyWhenNotPaused {
        if (s_presaleStarted && block.timestamp <= s_presaleEndedInMinutes)
            revert presale_runnig({message: "Presale has not ended yet"});

        if (s_tokenIds.current() >= s_maxTokenIds)
            revert exceeded_max_supply({
                message: "Exceeded maximum LETTHER supply"
            });

        if (msg.value < s_price)
            revert insufficient_ether({
                message: "Ether sent is not correct - minimum price 0.01 ether"
            });

        s_tokenIds.increment();
        uint256 tokenId = s_tokenIds.current();
        _safeMint(msg.sender, tokenId);
        emit token_minted(tokenId);
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        if (!sent) revert withdraw_fail({message: "Failed to send Ether"});
        emit withdraw_sent(amount);
    }

    function setPaused(bool _paused) public onlyOwner {
        s_paused = _paused;
    }

    function getPaused() public view returns (bool) {
        return s_paused;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseTokenURI;
    }

    function getWhitelist(address _address) public view returns (bool) {
        return s_whitelist.getWhitelistAddress(_address);
    }

    function getMaxSupply() public view returns (uint256) {
        return s_maxTokenIds;
    }

    function setMaxSupply(uint256 _tokenSupply) public onlyOwner {
        s_maxTokenIds = _tokenSupply;
    }

    function getPresaleStarted() public view returns (bool) {
        return s_presaleStarted;
    }

    function getPresaleEndedInMinutes() public view returns (uint256) {
        return s_presaleEndedInMinutes;
    }

    function getPrice() public view returns (uint256) {
        return s_price;
    }

    receive() external payable {}

    fallback() external payable {}
}
