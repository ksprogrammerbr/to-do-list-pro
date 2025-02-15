import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";
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
    const { isSignedIn } = useUser(); // Verifica se o usuário está autenticado

    if (!isSignedIn) {
      return <RedirectToSignIn />; // Redireciona para a página de login se não estiver autenticado
    }

    return <Component {...props} />;
  };
};
