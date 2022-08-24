import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PoetherProvider } from "../context/PoetherProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PoetherProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer theme="dark" />
    </PoetherProvider>
  );
}

export default MyApp;
