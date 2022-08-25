import whitelist from "../lib/whitelist.json";
import poether from "../lib/poether.json";

export const WHITELIST_CONTRACT = whitelist as Record<string | number, any>;
export const POETHER_CONTRACT = poether as Record<string | number, any>;

export const RPC_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "testnet"
    ? process.env.NEXT_PUBLIC_VERCEL_TEST_RPC_URL
    : process.env.NEXT_PUBLIC_VERCEL_RPC_URL;
