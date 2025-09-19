import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  MessageCircle, 
  Compass,
  Settings,
  User,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import socialLensLogo from "@/assets/sociallens-logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count
  const [searchQuery, setSearchQuery] = useState("");

  const bottomNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/explore", icon: Compass, label: "Explore" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Top Navigation - Only Logo, Search, Messages, Notifications */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={socialLensLogo} 
                  alt="SocialLens" 
                  className="h-9 w-9 group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300" />
              </div>
              <span className="gradient-text font-bold text-xl tracking-tight">SocialLens</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users, posts, hashtags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-2 bg-muted/30 border border-border/50 rounded-full focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Messages */}
              <Link to="/messages">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-primary/10 rounded-full transition-all duration-200 ${
                    isActive("/messages") ? "text-primary bg-primary/5" : "text-muted-foreground"
                  }`}
                  title="Messages"
                >
                  <MessageCircle className="h-6 w-6" />
                </Button>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full transition-all duration-200"
                  title="Notifications"
                >
                  <Heart className="h-6 w-6" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse-glow border-2 border-background"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                        SL
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border border-border/50" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        SL
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">@socialuser</p>
                      <p className="w-[180px] truncate text-sm text-muted-foreground">
                        John Doe
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/20 z-40">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-around py-3">
            {bottomNavItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path} className="flex flex-col items-center group">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-primary/10 rounded-full transition-all duration-200 ${
                    isActive(path) ? "text-primary bg-primary/5" : "text-muted-foreground"
                  }`}
                  title={label}
                >
                  <Icon className="h-6 w-6" />
                </Button>
                <span className={`text-xs mt-1 transition-colors duration-200 ${
                  isActive(path) ? "text-primary font-medium" : "text-muted-foreground"
                }`}>
                  {label}
                </span>
              </Link>
            ))}
            
            {/* Create Post Button - Special styling */}
            <div className="flex flex-col items-center group">
              <Button
                variant="default"
                size="icon"
                className="bg-gradient-primary hover:shadow-primary hover:scale-105 transition-all duration-200 rounded-full"
                title="Create post"
              >
                <PlusSquare className="h-6 w-6 text-white" />
              </Button>
              <span className="text-xs mt-1 text-primary font-medium">Create</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;