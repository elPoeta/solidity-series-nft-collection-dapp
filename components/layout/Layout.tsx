import Head from 'next/head'
import React from 'react'
import { Header } from '../header/Header'

const MainHead = () => {
  return (
    <Head>
        <title>Poether</title>
        <meta name="description" content="NFT collection" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
export const Layout = (props: { children: any })  => {
  return (
   <>
     <MainHead />
     <Header />
     {props.children}
   </>
  )
}
