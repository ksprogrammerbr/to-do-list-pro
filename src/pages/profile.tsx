import { UserProfile, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Seu Perfil</h1>
        <UserProfile
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "rounded-lg shadow-md",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
