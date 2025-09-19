import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, Camera, Heart } from "lucide-react";
import pixelShareLogo from "@/assets/pixelshare-logo.png";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20 animate-gradient-shift" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={pixelShareLogo} 
                alt="PixelShare" 
                className="h-10 w-10 animate-pulse-glow"
              />
              <span className="gradient-text font-bold text-2xl">PixelShare</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-white/10">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:opacity-90 shadow-primary hover:shadow-glow transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              Share Your
              <span className="gradient-text block">Pixel Perfect</span>
              Moments
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up">
              Connect with friends, share your story, and discover amazing content from creators around the world.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow hover:scale-105 transition-all duration-300 animate-scale-in">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/explore">
                <Button variant="outline" size="lg" className="hover:bg-white/10 border-white/20 backdrop-blur-sm animate-scale-in">
                  Explore Content
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Share Photos</h3>
                  <p className="text-muted-foreground">
                    Upload and share your best moments with beautiful filters and effects
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Connect</h3>
                  <p className="text-muted-foreground">
                    Follow friends, discover new creators, and build your community
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Engage</h3>
                  <p className="text-muted-foreground">
                    Like, comment, and share content that inspires you
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-16 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">1M+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">10M+</div>
                <div className="text-muted-foreground">Photos Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">50M+</div>
                <div className="text-muted-foreground">Likes Given</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 border-t border-white/20">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 PixelShare. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
