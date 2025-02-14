import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { ptBR } from "@clerk/localizations";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
        },
        variables: {
          colorPrimary: "#73C7C7",
        },
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
