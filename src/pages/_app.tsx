import { ClerkProvider } from "@clerk/clerk-react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

console.log(
  "CLERK PUBLISHABLE KEY:",
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        variables: { colorPrimary: "#0F172A" },
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
