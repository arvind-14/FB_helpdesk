import "../styles/globals.css";
import Head from 'next/head'
import { useEffect } from 'react';
import { AuthContextProvider } from '../Auth/AuthContext'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '764221832426219',
        xfbml: true,
        version: 'v19.0'
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
    );
  }, []);

  return (<>
    <Head>
      <title>FB Helpdesk</title>
    </Head>
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  </>)
}


