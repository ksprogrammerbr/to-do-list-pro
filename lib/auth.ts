import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};

// Função para proteger rotas
export const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    return (
      <ClerkProvider>
        <Component {...props} />
      </ClerkProvider>
    );
  };
};
