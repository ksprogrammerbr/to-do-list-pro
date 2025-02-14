import React from "react";
import { SignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { redirect_url } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white/80 backdrop-blur-md shadow-xl",
            formButtonPrimary: "bg-primary-400 hover:bg-primary-300 text-white",
          },
        }}
        redirectUrl={(redirect_url as string) || "/"}
      />
    </div>
  );
};

export default SignInPage;
