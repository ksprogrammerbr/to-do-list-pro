import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return {
    isLoaded,
    isSignedIn,
    userId: user?.id,
    user,
  };
};

export default useAuth;
