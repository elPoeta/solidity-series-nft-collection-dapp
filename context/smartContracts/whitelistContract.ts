import { Contract, ethers, providers } from "ethers";
import { WHITELIST_CONTRACT, RPC_URL } from "../../utils/artifacts";
import { getSmartContract } from "./smartContract";

export const getWhiteListContract = async (
  web3Provider?: providers.Web3Provider,
  signer?: providers.JsonRpcSigner
): Promise<Contract> => {
  const provider = web3Provider
    ? web3Provider
    : new ethers.providers.JsonRpcProvider(RPC_URL);
  return await getSmartContract(WHITELIST_CONTRACT, provider, signer);
};

export const getMaxListedAddress = async (): Promise<number> => {
  const whitelistContract = await getWhiteListContract();
  return await whitelistContract.getMaxWhitelistAddresses();
};

export const getJoined = async (): Promise<number> => {
  const whitelistContract = await getWhiteListContract();
  return await whitelistContract.getAddressesListedCount();
};

export const isInWhitelist = async (address: string): Promise<boolean> => {
  const whitelistContract = await getWhiteListContract();
  return await whitelistContract.getWhitelistAddress(address);
};
