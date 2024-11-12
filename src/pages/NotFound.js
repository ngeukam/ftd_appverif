// pages/NotFound.js
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="text-lg text-blue-500 hover:underline font-semibold">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
