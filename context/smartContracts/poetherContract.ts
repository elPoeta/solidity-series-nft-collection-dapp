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
