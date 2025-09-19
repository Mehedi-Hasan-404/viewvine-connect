// /src/pages/Explore.tsx
import { useState } from "react";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Explore = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleFollow = (username: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(username)) {
        newSet.delete(username);
      } else {
        newSet.add(username);
      }
      return newSet;
    });
  };

  if (!user) {
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
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Discover Amazing Content</h3>
              <p className="text-muted-foreground mb-4">
                Search for hashtags, users, or locations to explore
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button variant="outline" size="sm">#photography</Button>
                <Button variant="outline" size="sm">#travel</Button>
                <Button variant="outline" size="sm">#food</Button>
                <Button variant="outline" size="sm">#nature</Button>
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
                {[
                  { tag: "photography", posts: 2400000 },
                  { tag: "sunset", posts: 1800000 },
                  { tag: "coffee", posts: 1200000 },
                  { tag: "travel", posts: 3200000 },
                  { tag: "nature", posts: 2800000 },
                ].map((hashtag, index) => (
                  <button
                    key={hashtag.tag}
                    className="flex items-center justify-between w-full text-left hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-muted-foreground">#{index + 1}</span>
                      <div>
                        <div className="font-medium">#{hashtag.tag}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatNumber(hashtag.posts)} posts
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Suggested for you</h3>
              <div className="space-y-4">
                {[
                  { username: "alex_photos", fullName: "Alex Johnson", avatar: "/placeholder-avatar.jpg", isVerified: true, followers: 45600 },
                  { username: "travel_diary", fullName: "Sarah Travel", avatar: "/placeholder-avatar.jpg", isVerified: false, followers: 23400 },
                  { username: "foodie_life", fullName: "Food Lover", avatar: "/placeholder-avatar.jpg", isVerified: true, followers: 78900 },
                  { username: "art_gallery", fullName: "Digital Art", avatar: "/placeholder-avatar.jpg", isVerified: false, followers: 12300 },
                ].map((user) => (
                  <div key={user.username} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="bg-gradient-primary text-white text-sm">
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-semibold truncate">{user.username}</p>
                          {user.isVerified && (
                            <BadgeCheck className="h-3 w-3 text-blue-500 fill-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatNumber(user.followers)} followers
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleFollow(user.username)}
                      className={`transition-all duration-300 ${
                        followedUsers.has(user.username)
                          ? "bg-muted text-foreground hover:bg-muted/80"
                          : "bg-gradient-primary hover:opacity-90 text-white"
                      }`}
                    >
                      {followedUsers.has(user.username) ? (
                        "Following"
                      ) : (
                        <>
                          <UserPlus className="h-3 w-3 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
