import '../styles/globals.css'
import React from 'react'

import Head from 'next/head'
import { AppProps } from 'next/dist/shared/lib/router/router'

function MyApp({ Component, pageProps }: AppProps):JSX.Element {
  return <>
    <Head>
      <title>Weather App</title>
      <link rel="favicon" href="/public/favicon.ico"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap" rel="stylesheet"/>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
