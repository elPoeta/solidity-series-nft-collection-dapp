import { Contract, ethers, providers } from "ethers";

export const getSmartContract = async (
  contract: Record<string | number, any>,
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  signer?: providers.JsonRpcSigner
): Promise<Contract> => {
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  const contractAddress = contract[key].address;
  const contractAbi = contract[key].abi;
  const signerOrProvider:
    | providers.Web3Provider
    | providers.JsonRpcProvider
    | providers.JsonRpcSigner = !signer ? provider : signer;
  const poetherContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signerOrProvider
  );
  return poetherContract;
};
