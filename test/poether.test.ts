import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers, network } from "hardhat";

describe("Poether", function () {
  let Whitelist: ContractFactory;
  let whitelist: Contract;
  let deployer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let whitelistDeployedAddress: string;
  let Poether: ContractFactory;
  let poether: Contract;
  let poetherDeployedAddress: string;
  const MAX_LISTED = 10;
  let maxTokenSupply = 20;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    Whitelist = await ethers.getContractFactory("Whitelist");
    whitelist = await Whitelist.deploy(MAX_LISTED);
    await whitelist.deployed();
    whitelistDeployedAddress = whitelist.address;

    Poether = await ethers.getContractFactory("Poether");
    poether = await Poether.deploy(
      "poether.com",
      maxTokenSupply,
      whitelistDeployedAddress
    );
    await poether.deployed();
    poetherDeployedAddress = poether.address;

    for (let i = 1; i <= MAX_LISTED; i++) {
      const account = accounts[i];
      const contract = await whitelist.connect(account);
      await contract.addAddressToWhiteList();
    }
  });

  // ### CONSTRUCTOR
  describe("constructor", function () {
    it("intitiallizes Poether contract correctly", async () => {
      const owner = await poether.owner();
      expect(owner).equal(deployer.address);
    });
  });

  // ### PRESALE
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

  // ### PRESALE-MINT
  describe("Presale-Mint", () => {
    let price = ethers.utils.parseUnits("0.01", "ether");
    describe("Mint Success", () => {
      it("presale token minted", async () => {
        await poether.startPresale();
        await expect(poether.connect(accounts[1]).presaleMint({ value: price }))
          .to.emit(poether, "presale_minted")
          .withArgs(1);
      });
    });

    describe("Minted FAIL", () => {
      it("presale not started", async () => {
        await expect(poether.connect(accounts[1]).presaleMint({ value: price }))
          .to.be.revertedWithCustomError(poether, "presale_not_runnig")
          .withArgs("Presale is not running");
      });

      it("presale time end", async () => {
        await poether.startPresale();
        await network.provider.send("evm_increaseTime", [60 * 6]);
        await network.provider.request({ method: "evm_mine", params: [] });
        await expect(poether.connect(accounts[1]).presaleMint({ value: price }))
          .to.be.revertedWithCustomError(poether, "presale_not_runnig")
          .withArgs("Presale is not running");
      });

      it("presale not in whitelist", async () => {
        await poether.startPresale();
        await expect(
          poether.connect(accounts[15]).presaleMint({ value: price })
        )
          .to.be.revertedWithCustomError(poether, "address_not_listed")
          .withArgs("Address not listed");
      });

      it("presale overflow max supply", async () => {
        await poether.setMaxSupply(MAX_LISTED - 1);
        await poether.startPresale();
        for (let i = 1; i < MAX_LISTED; i++) {
          const account = accounts[i];
          const contract = await poether.connect(account);
          await contract.presaleMint({ value: price });
        }
        await expect(
          poether.connect(accounts[MAX_LISTED]).presaleMint({ value: price })
        )
          .to.be.revertedWithCustomError(poether, "exceeded_max_supply")
          .withArgs("Exceeded maximum LETTHER supply");
      });

      it("presale not in whitelist", async () => {
        price = ethers.utils.parseUnits("0.001", "ether");
        await poether.startPresale();
        await expect(poether.connect(accounts[1]).presaleMint({ value: price }))
          .to.be.revertedWithCustomError(poether, "insufficient_ether")
          .withArgs("Ether sent is not correct - minimum price 0.01 ether");
      });
    });
  });
});
