import { ethers, network } from "hardhat";
import { writeFileSync, readFileSync } from "fs";
import * as path from "path";

async function main() {
  const MAX_WHITELIST_ADDRESSES = 5;
  const MAX_POETHER_TOKENS = 10;
  const METADATA_URL = "http://localhost:3000/api/";

  const chainId = network.config.chainId;
  console.log("chain", chainId);
  console.log("--------------------------------------------\n");
  console.log("### DEPLOY WHITELIST CONTRACT ###\n");

  const Whitelist = await ethers.getContractFactory("Whitelist");
  const whitelist = await Whitelist.deploy(MAX_WHITELIST_ADDRESSES);
  await whitelist.deployed();

  const whitelistJson = JSON.parse(
    readFileSync(
      path.resolve(__dirname, "../", "lib", "whitelist.json"),
      "utf8"
    )
  );

  const whitelistAbi = {
    address: whitelist.address,
    abi: JSON.parse(whitelist.interface.format("json") as string),
  };

  whitelistJson[chainId!.toString()] = whitelistAbi;

  writeFileSync(
    path.resolve(__dirname, "../", "lib", "whitelist.json"),
    JSON.stringify(whitelistJson, null, 2)
  );

  console.log("WHITELIST DEPLOYED TO: ", whitelist.address);
  console.log("\n--------------------------------------------");
  console.log("### DEPLOY POETHER CONTRACT ###");

  const Poether = await ethers.getContractFactory("Poether");
  const poether = await Poether.deploy(
    METADATA_URL,
    MAX_POETHER_TOKENS,
    whitelist.address
  );
  poether.deployed();

  console.log("\nPOETHER DEPLOYED TO: ", poether.address);
  console.log("\n--------------------------------------------");

  const poetherJson = JSON.parse(
    readFileSync(path.resolve(__dirname, "../", "lib", "poether.json"), "utf8")
  );

  const poetherAbi = {
    address: poether.address,
    abi: JSON.parse(poether.interface.format("json") as string),
  };

  poetherJson[chainId!.toString()] = poetherAbi;

  writeFileSync(
    path.resolve(__dirname, "../", "lib", "poether.json"),
    JSON.stringify(poetherJson, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
