import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">Oops! Page not found</p>
        <Link to="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;