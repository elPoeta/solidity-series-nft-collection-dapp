import { Contract, ethers, providers } from "ethers";
import { POETHER_CONTRACT, RPC_URL } from "../../utils/artifacts";
import { getSmartContract } from "./smartContract";

export const getPoetherContract = async (
  web3Provider?: providers.Web3Provider,
  signer?: providers.JsonRpcSigner
): Promise<Contract> => {
  const provider = web3Provider
    ? web3Provider
    : new ethers.providers.JsonRpcProvider(RPC_URL);
  return await getSmartContract(POETHER_CONTRACT, provider, signer);
};

export const getOwner = async (): Promise<string> => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.owner();
};

export const startPresale = async (
  web3Provider: providers.Web3Provider,
  signer: providers.JsonRpcSigner
): Promise<void> => {
  const poetherContract = await getPoetherContract(web3Provider, signer);
  const starting = await poetherContract.startPresale();
  console.log(starting);
  await web3Provider.waitForTransaction(starting.hash);
};
