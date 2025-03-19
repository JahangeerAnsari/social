
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import EditModal from "@/modal/edit-modal";
import LoginModal from "@/modal/login-modal";
import RegisterModal from "@/modal/register-modal";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
Toaster
export default function App({ Component, pageProps }: AppProps) {
  SessionProvider
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />

      <RegisterModal />
      <LoginModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />/
      </Layout>
    </SessionProvider>
  );
}
