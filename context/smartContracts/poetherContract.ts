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

export const presaleStarted = async (): Promise<boolean> => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.getPresaleStarted();
};

export const getPresaleEndedInMinutes = async (): Promise<number> => {
  const poetherContract = await getPoetherContract();
  const endTimeSeconds = await poetherContract.getPresaleEndedInMinutes();
  return parseInt(endTimeSeconds.toString()) * 1000;
};

export const getMaxSupply = async (): Promise<number> => {
  const poetherContract = await getPoetherContract();
  const maxSupply = await poetherContract.getMaxSupply();
  return parseInt(maxSupply.toString());
};

export const getPrice = async (): Promise<string> => {
  const poetherContract = await getPoetherContract();
  const price = await poetherContract.getPrice();
  return price.toString();
};

export const setPause = async (
  web3Provider: providers.Web3Provider,
  signer: providers.JsonRpcSigner,
  _pause: boolean
): Promise<void> => {
  const poetherContract = await getPoetherContract(web3Provider, signer);
  await poetherContract.setPaused(_pause);
};

export const getPause = async (): Promise<boolean> => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.getPaused();
};
