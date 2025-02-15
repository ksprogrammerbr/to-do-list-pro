import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FiXCircle } from "react-icons/fi";

const CancelPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-xl text-center">
        <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pagamento Cancelado</h1>
        <p className="text-gray-600 mb-4">
          O processo de pagamento foi cancelado. Você será redirecionado em
          alguns segundos...
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
