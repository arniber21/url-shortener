import Head from "next/head";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>URL Shortener</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
