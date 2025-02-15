import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FiCheckCircle } from "react-icons/fi";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona após 5 segundos
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-xl text-center">
        <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          Pagamento Realizado com Sucesso!
        </h1>
        <p className="text-gray-600 mb-4">
          Obrigado pela sua compra. Você será redirecionado em alguns
          segundos...
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
