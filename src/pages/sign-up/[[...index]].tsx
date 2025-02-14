import React from "react";
import { SignUp } from "@clerk/nextjs";
import type { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white/80 backdrop-blur-md shadow-xl",
            formButtonPrimary: "bg-primary-400 hover:bg-primary-300 text-white",
          },
        }}
        redirectUrl="/"
      />
    </div>
  );
};

export default SignUpPage;
