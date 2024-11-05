import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import TreeBuilder from "../components/TreeBuilder/TreeBuilder";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Biostate Challenge
      </h1>

      {/* <TreeBuilder /> */}

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

      <div className="mt-8">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default HomePage;
