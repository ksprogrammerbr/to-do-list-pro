import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiArrowLeft, FiCalendar, FiFilter } from "react-icons/fi";
import Link from "next/link";
import ActivityList from "../../components/ActivityList";

const ActivityPage = () => {
  const { isLoaded, isSignedIn } = useUser();
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
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                Histórico de Atividades
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-700 rounded-lg hover:bg-white/20">
                <FiCalendar className="w-5 h-5" />
                Filtrar por Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-700 rounded-lg hover:bg-white/20">
                <FiFilter className="w-5 h-5" />
                Filtrar por Tipo
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <ActivityList />
        </div>
      </main>
    </div>
  );
};

export default ActivityPage;
