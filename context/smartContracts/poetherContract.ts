import { Contract, ethers, providers, utils } from "ethers";
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
  const tx = await poetherContract.startPresale();
  console.log(tx);
  await web3Provider.waitForTransaction(tx.hash);
};

export const presaleStarted = async (): Promise<boolean> => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.getPresaleStarted();
};

export const getPresaleEndedInMinutes = async () => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.getPresaleEndedInMinutes();
};

export const isPresaleEnded = async (): Promise<boolean> => {
  try {
    const _presaleEnded = await getPresaleEndedInMinutes();
    return _presaleEnded.lt(Math.floor(Date.now() / 1000));
  } catch (error) {
    console.error(error);
    return false;
  }
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
  const tx = await poetherContract.setPaused(_pause);
  await web3Provider.waitForTransaction(tx.hash);
};

export const getPause = async (): Promise<boolean> => {
  const poetherContract = await getPoetherContract();
  return await poetherContract.getPaused();
};

export const mint = async (
  web3Provider: providers.Web3Provider,
  signer: providers.JsonRpcSigner,
  mintType: string
): Promise<boolean> => {
  try {
    const poetherContract = await getPoetherContract(web3Provider, signer);
    const tx = poetherContract[mintType]({ value: utils.parseEther("0.01") });
    await web3Provider.waitForTransaction(tx.hash);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getTokensCount = async (): Promise<number | null> => {
  try {
    const poetherContract = await getPoetherContract();
    const _tokenIds = await poetherContract.getTokenIds();
    return parseInt(_tokenIds.toString());
  } catch (error) {
    console.error(error);
    return null;
  }
};
