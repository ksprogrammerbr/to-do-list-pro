import { useUser } from "@clerk/nextjs";

const ProtectedPage = () => {
  const { user } = useUser();

  return (
    <div className="p-4">
      <h1>Página Protegida</h1>
      <p>Esta página só pode ser vista por usuários autenticados.</p>
      <p>
        Seu email:{" "}
        {user?.emailAddresses?.[0]?.emailAddress || "Email não disponível"}
      </p>
    </div>
  );
};

export default ProtectedPage;
