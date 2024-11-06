import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Biostate Challenge
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/substring"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Longest Substring Calculator
        </Link>

        <Link
          to="/binarytree"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Binary Tree Path Sum Calculator
        </Link>
        <Link
          to="/dashboard"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800"
        >
          Users Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
