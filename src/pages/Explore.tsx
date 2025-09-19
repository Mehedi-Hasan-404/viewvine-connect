// /src/pages/Explore.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import {
  Search,
  TrendingUp,
  Play,
  Heart,
  MessageCircle,
  Hash,
  UserPlus,
  SearchIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Explore = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingHashtags, setTrendingHashtags] = useState<any[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Fetch trending hashtags (in a real app)
    const hashtagsUnsubscribe = onSnapshot(
      query(collection(db, "hashtags"), orderBy("count", "desc"), limit(10)),
      (snapshot) => {
        const hashtags = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrendingHashtags(hashtags);
      },
      (error) => {
        console.error("Error fetching hashtags:", error);
      }
    );

    // Fetch suggested users (in a real app)
    const usersUnsubscribe = onSnapshot(
      query(collection(db, "users"), limit(10)),
      (snapshot) => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSuggestedUsers(users);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    return () => {
      hashtagsUnsubscribe();
      usersUnsubscribe();
    };
  }, [user]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleFollow = (userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
    
    // In a real app, you would update Firestore here
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Section */}
      <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users, hashtags, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Explore Content */}
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Discover Amazing Content</h3>
              <p className="text-muted-foreground mb-4">
                Search for hashtags, users, or locations to explore
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {trendingHashtags.slice(0, 4).map((hashtag) => (
                  <Button key={hashtag.id} variant="outline" size="sm">
                    #{hashtag.tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Hashtags */}
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingHashtags.length > 0 ? (
                  trendingHashtags.map((hashtag, index) => (
                    <button
                      key={hashtag.id}
                      className="flex items-center justify-between w-full text-left hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-muted-foreground">#{index + 1}</span>
                        <div>
                          <div className="font-medium">#{hashtag.tag}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatNumber(hashtag.count || 0)} posts
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No trending hashtags yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Suggested for you</h3>
              <div className="space-y-4">
                {suggestedUsers.length > 0 ? (
                  suggestedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                          <AvatarImage 
                            src={user.avatar || "/placeholder-avatar.jpg"} 
                            alt={user.username || "User"} 
                          />
                          <AvatarFallback className="bg-gradient-primary text-white text-sm">
                            {user.username 
                              ? user.username.slice(0, 2).toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <p className="text-sm font-semibold truncate">
                              {user.username || "User"}
                            </p>
                            {user.isVerified && (
                              <BadgeCheck className="h-3 w-3 text-blue-500 fill-blue-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.fullName || "SocialLens User"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(user.followers || 0)} followers
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleFollow(user.id)}
                        className={`transition-all duration-300 ${
                          followedUsers.has(user.id)
                            ? "bg-muted text-foreground hover:bg-muted/80"
                            : "bg-gradient-primary hover:opacity-90 text-white"
                        }`}
                      >
                        {followedUsers.has(user.id) ? (
                          "Following"
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No suggested users yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
