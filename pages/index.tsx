import type { NextPage } from 'next'
import Head from 'next/head'
import { CustomConnect } from '../components/customConnect';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>     
       <CustomConnect />
      
    </div>
  )
}

export default Home
