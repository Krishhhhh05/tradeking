import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo h-16 w-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="logo react h-16 w-16"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React</h1>
        <div className="card bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            Edit{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">src/App.jsx</code>{" "}
            and save to test HMR
          </p>

          {/* Navigation Links */}
          <div className="mt-6 space-x-4">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <p className="read-the-docs mt-8 text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
