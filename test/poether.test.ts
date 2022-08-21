import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Poether", function () {
  let Whitelist: ContractFactory;
  let whitelist: Contract;
  let deployer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let whitelistDeployedAddress: string;
  let Poether: ContractFactory;
  let poether: Contract;
  let poetherDeployedAddress: string;
  const MAX_LISTED = 5;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    Whitelist = await ethers.getContractFactory("Whitelist");
    whitelist = await Whitelist.deploy(MAX_LISTED);
    await whitelist.deployed();
    whitelistDeployedAddress = whitelist.address;

    Poether = await ethers.getContractFactory("Poether");
    poether = await Poether.deploy("poether.com", whitelistDeployedAddress);
    await poether.deployed();
    poetherDeployedAddress = poether.address;

    for (let i = 1; i <= MAX_LISTED; i++) {
      const account = accounts[i];
      const contract = await whitelist.connect(account);
      await contract.addAddressToWhiteList();
    }
  });

  describe("constructor", function () {
    it("intitiallizes Poether contract correctly", async () => {
      const owner = await poether.owner();
      expect(owner).equal(deployer.address);
    });
  });

  describe("Presale", function () {
    it("Start presale OK", async () => {
      await expect(poether.startPresale())
        .to.emit(poether, "presale_started")
        .withArgs(true);
    });

    it("Start presale FAIL", async () => {
      await expect(poether.connect(accounts[1]).startPresale()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
