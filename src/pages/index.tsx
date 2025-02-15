import React from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";

const HomePage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <Navbar />
      <TaskList />
    </div>
  );
};

export default HomePage;
