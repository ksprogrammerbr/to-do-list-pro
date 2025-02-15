import React from "react";
import { SignUp } from "@clerk/clerk-react";
import type { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/80 backdrop-blur-md shadow-xl",
              formButtonPrimary:
                "bg-primary-400 hover:bg-primary-300 text-white",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
              privacyPageUrl: "/privacy",
              termsPageUrl: "/terms",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
