import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";

export const clerkFrontendApi = process.env
  .NEXT_PUBLIC_CLERK_FRONTEND_API as string;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>{children}</ClerkProvider>
  );
};

// Função para proteger rotas
export const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    return (
      <RedirectToSignIn>
        <Component {...props} />
      </RedirectToSignIn>
    );
  };
};
