import React from 'react'
import { setPause, startPresale } from '../../context/smartContracts/poetherContract';
import { actions } from '../../context/state';
import { usePoether } from '../../context/usePoether';
import { Loader } from '../common/Loader';

const OwnerDasboard = () => {
  const {state:{ loading, web3Provider, isPresaleStarted, pause, signerAddress }, dispatch} = usePoether();


  const handleStartPresale = async () => {
    if(!web3Provider) return;
     const connectedSigner = web3Provider.getSigner();
     await startPresale(web3Provider, connectedSigner); 
  }

  const handlePause = async () => {
    if(!web3Provider) return;
     const connectedSigner = web3Provider.getSigner();
     const _pause = !pause;
     await setPause(web3Provider, connectedSigner, _pause);
     dispatch({ type: actions.PAUSE, data: { pause: _pause } });
  }

  return (
    <div>
      {loading ? <Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} /> : (
        <div className='flex w-[80%] mx-auto my-2 flex-col justify-center'>
          <h3 className='text-2xl'>Owner: {signerAddress}</h3>
          <div className='p-5 flex items-center justify-evenly'>
            {!isPresaleStarted && <button className='bg-gradient-to-tr from-sky-400 to-blue-500 py-2 rounded-full w-[130px]' onClick={handleStartPresale}>Start presale</button> }
            <button className='bg-gradient-to-tr from-sky-400 to-blue-500 py-2 rounded-full w-[130px]' onClick={handlePause}>{pause ? 'resume' : 'pause'}</button>
          </div>
        </div>
      ) }
    </div>
  )
}

export default OwnerDasboard