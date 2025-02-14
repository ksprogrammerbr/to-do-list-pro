import { auth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";

export async function getUser(): Promise<User | null> {
  const { userId } = auth();
  if (!userId) return null;

  // Aqui você pode buscar mais informações do usuário se necessário
  return {
    id: userId,
    role: "admin", // Implemente sua lógica de roles
  } as User;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getUser();
  return user?.role === "admin";
}
