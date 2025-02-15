import type { AppProps } from "next/app";
import RootLayout from "../components/RootLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
