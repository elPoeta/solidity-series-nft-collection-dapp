import Link from "next/link";
import React from "react";
import { usePoether } from "../../context/usePoether";
import { toast } from "react-toastify";
import { connect } from "../../context/smartContracts/walletConnection";
import { actions } from "../../context/state";

export const NavBar = () => {
  const {
    state: { isConnected },
    dispatch,
  } = usePoether();
  const connectWallet = async () => {
    try {
      if (
        typeof window != "undefined" &&
        typeof window.ethereum != "undefined" &&
        window.ethereum.isMetaMask
      ) {
        const provider = await connect();
        if (!provider) {
          toast.error("An error was ocurred when try to connect your wallet");
          return;
        }
        const { chainId } = await provider.getNetwork();
        if (chainId !== 31337) {
          toast.error("Change your network to Local HardHat");
          dispatch({ type: actions.RESET });
          return;
        }
        const signer = provider.getSigner();
        const accounts = await signer.provider.listAccounts();
        dispatch({
          type: actions.CONNECT,
          data: {
            isConnected: true,
            signerAddress: accounts[0],
            web3Provider: provider,
            networkId: chainId,
          },
        });
        handleProviderEvents();
      } else {
        toast.info("Please install metamask!");
        dispatch({ type: actions.RESET });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error was ocurred when try to connect your wallet");
      dispatch({ type: actions.RESET });
    }
  };

  const handleProviderEvents = () => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = async (e: string[] | string) => {
      if (typeof e === "object") {
        if (!e.length) {
          dispatch({ type: actions.RESET })
          return;
        }
        dispatch({
          type: actions.CONNECT,
          data: { isConnected: true, signerAddress: e[0] },
        });
      } else if (typeof e === "string") {
        const chainId = parseInt(e);
        if (chainId !== 31337) {
          toast.error("Change your network to Local HardHat");
          dispatch({ type: actions.RESET });
          return;
        }
      }
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  };

  return (
    <nav className="px-4">
      <ul>
        <li>
          {!isConnected ? (
            <button
              className="bg-gradient-to-br from-purple-800 via-violet-900 to-purple-800 p-2 rounded-md"
              onClick={connectWallet}
            >
              Connect
            </button>
          ) : (
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
