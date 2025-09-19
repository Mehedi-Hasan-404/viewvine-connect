// /src/components/Layout.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  MessageCircle, 
  Compass,
  Play,
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
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Check if user is verified
  useEffect(() => {
    if (user) {
      const checkVerification = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setIsVerified(userDoc.data()?.isVerified || false);
          }
        } catch (error) {
          console.error("Error checking verification:", error);
        }
      };
      checkVerification();
    }
  }, [user]);

  // Bottom navigation items - Added Reels, Removed Messages
  const bottomNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/explore", icon: Compass, label: "Explore" },
    { path: "/create", icon: PlusSquare, label: "Create" },
    { path: "/reels", icon: Play, label: "Reels" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pb-16">
      {/* Top Navigation */}
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

            {/* Search Bar - Hidden on mobile */}
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
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse-glow border-2 border-background">
                      {notifications > 9 ? "9+" : notifications}
                    </div>
                  )}
                </Button>
              </div>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200">
                      <AvatarImage src={user.photoURL || "/placeholder-avatar.jpg"} alt="Profile" />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                        {user.displayName ? user.displayName.charAt(0) : "SL"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border border-border/50" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || "/placeholder-avatar.jpg"} alt="Profile" />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {user.displayName ? user.displayName.charAt(0) : "SL"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <div className="flex items-center space-x-1">
                        <p className="font-medium">@{user.displayName || user.email?.split("@")[0]}</p>
                        {/* REAL SVG VERIFICATION BADGE */}
                        {isVerified && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            className="h-4 w-4 text-blue-500 fill-blue-500"
                          >
                            <path d="M23.954 4.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 7.5 9.03 6.265a.75.75 0 0 0-.747.06L4.46 8.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 3.431L11.28 1.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                            <path d="M23.954 8.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 11.5 9.03 10.265a.75.75 0 0 0-.747.06L4.46 12.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 7.431L11.28 5.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                            <path d="M23.954 12.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 15.5 9.03 14.265a.75.75 0 0 0-.747.06L4.46 16.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 11.431L11.28 9.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                            <path d="M23.954 16.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 19.5 9.03 18.265a.75.75 0 0 0-.747.06L4.46 20.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 15.431L11.28 13.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                            <path d="M23.954 20.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 23.5 9.03 22.265a.75.75 0 0 0-.747.06L4.46 24.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 19.431L11.28 17.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                          </svg>
                        )}
                      </div>
                      <p className="w-[180px] truncate text-sm text-muted-foreground">
                        {user.email}
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
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
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

      {/* Bottom Navigation - Fixed at bottom */}
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
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;
