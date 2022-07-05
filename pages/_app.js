import NProgress from "nprogress";
import React from "react";
import Router from "next/router";
import "../styles/globals.css";
import Nav from "../components/Nav";
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 
import {Provider} from 'react-redux'
import store from "../redux/store";
import Footer from '../components/Footer/index'
import 'moment-timezone';
import 'moment/locale/vi';

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
    <Provider store={store}>
      <Nav />
        <Component {...pageProps} />
        <Footer/>
     </Provider>
    </>
  );
}




export default MyApp
