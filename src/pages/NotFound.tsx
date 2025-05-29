
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from '@/contexts/ThemeContext';

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className={`text-6xl font-serif font-bold mb-4 ${
          theme === 'dark' ? 'text-neutral-100' : 'text-neutral-700'
        }`}>
          404
        </h1>
        <p className={`text-xl mb-8 font-light ${
          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          Oops! Page not found
        </p>
        <Link
          to="/"
          className={`inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-[#FBC5CC] text-neutral-800 hover:bg-[#f5b1bc] shadow-lg hover:shadow-xl'
              : 'bg-[#F45265] text-white hover:bg-[#e23c50] shadow-lg hover:shadow-xl'
          }`}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
