import { ClerkProvider } from "@clerk/clerk-react";
import { ptBR } from "@clerk/localizations";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
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
      <div
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
