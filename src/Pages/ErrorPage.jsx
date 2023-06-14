import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const imageUrl =
    "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img className="w-64 h-auto" src={imageUrl} alt="404 Error" />
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4">Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
