import { useRouter } from 'next/router';
import React, {useEffect } from 'react'
import { usePoether } from '../../context/usePoether';

export const Dashboard = () => {
  const {
    state: { isConnected },
    dispatch,
  } = usePoether();

  const router = useRouter();
  useEffect(() => {
    console.log('DASH... ',isConnected)
    if(!isConnected)
     router.push('/');

  },[router, isConnected])

  return (
    <div>Dashboard</div>
  )
}
