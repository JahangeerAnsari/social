
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import LoginModal from "@/modal/login-modal";
import RegisterModal from "@/modal/register-modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModal/>
     <LoginModal/>
      <Layout>
        <Component {...pageProps} />/
      </Layout>
    </>
  );
}
