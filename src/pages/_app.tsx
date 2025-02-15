import { ClerkProvider } from "@clerk/clerk-react";
import type { AppProps } from "next/app";
import { ptBR } from "@clerk/localizations";
import "../styles/globals.css";

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={ptBR}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
          termsPageUrl: "/terms",
          privacyPageUrl: "/privacy",
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
