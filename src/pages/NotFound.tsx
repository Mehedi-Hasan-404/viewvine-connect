import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import pixelShareLogo from "@/assets/pixelshare-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-8">
          <img 
            src={pixelShareLogo} 
            alt="PixelShare" 
            className="h-16 w-16 mx-auto mb-4 opacity-60"
          />
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="bg-gradient-primary hover:opacity-90 w-full">
              Return to Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" className="w-full">
              Explore Content
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
