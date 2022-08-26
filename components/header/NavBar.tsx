import Link from 'next/link';
import React from 'react'
import { usePoether } from '../../context/usePoether'
import { toast } from 'react-toastify';
import { connect } from '../../context/smartContracts/walletConnection';
import { actions } from '../../context/state';

export const NavBar = () => {
  const { state: { isConnected }, dispatch} = usePoether();

    const connectWallet = async () => {
      try {
        if (
          typeof window != "undefined" &&
          typeof window.ethereum != "undefined" &&
          window.ethereum.isMetaMask
        ) {
          const web3Provider = await connect();
          if (!web3Provider) {
            toast.error("An error was ocurred when try to connect your wallet");
            return;
          }
          const { chainId } = await web3Provider.getNetwork();
          if (chainId !== 31337) {
            toast.error(
              "Change your network to Mumbai Testnet or Local HardHat"
            );
            dispatch({ type: actions.RESET });
            return;
          }
          const signer = web3Provider.getSigner();
          const accounts = await signer.provider.listAccounts();
          dispatch({ type: actions.CONNECT, data: {  isConnected: true, signerAddress: accounts[0], web3Provider, networkId: chainId }});
          // providerEvents();
        } else {
            toast.info("Please install metamask!");
            dispatch({ type: actions.RESET });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error was ocurred when try to connect your wallet");
        dispatch({ type: actions.RESET });

      }
  }

  return (
    <nav className='px-4'>
      <ul>
        <li>
          {!isConnected ?
           <button className='bg-gradient-to-br from-purple-800 via-violet-900 to-purple-800 p-2 rounded-md' onClick={connectWallet}>Connect</button> :
           <Link href='/dashboard' ><a>Dashboard</a></Link>
          }
        </li>
      </ul>
    </nav>
  )
}
