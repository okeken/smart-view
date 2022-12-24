import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../providers'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Providers>
    <div className='px-4 mx-auto lg:max-w-4xl'>
   <Component {...pageProps} />
    </div>
  </Providers>
  </>
}

export default MyApp
