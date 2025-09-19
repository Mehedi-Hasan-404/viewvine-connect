// /src/pages/Explore.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  TrendingUp,
  Play,
  Heart,
  MessageCircle,
  Hash,
  UserPlus,
} from "lucide-react";

// Mock trending hashtags
const trendingHashtags = [
  { tag: "photography", posts: 2400000 },
  { tag: "sunset", posts: 1800000 },
  { tag: "coffee", posts: 1200000 },
  { tag: "travel", posts: 3200000 },
  { tag: "nature", posts: 2800000 },
  { tag: "lifestyle", posts: 1600000 },
];

// Mock suggested users
const suggestedUsers = [
  { username: "alex_photos", fullName: "Alex Johnson", avatar: "/placeholder-avatar.jpg", isVerified: true, followers: 45600 },
  { username: "travel_diary", fullName: "Sarah Travel", avatar: "/placeholder-avatar.jpg", isVerified: false, followers: 23400 },
  { username: "foodie_life", fullName: "Food Lover", avatar: "/placeholder-avatar.jpg", isVerified: true, followers: 78900 },
  { username: "art_gallery", fullName: "Digital Art", avatar: "/placeholder-avatar.jpg", isVerified: false, followers: 12300 },
];

const Explore = () => {
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
          {/* Explore Grid */}
          <div className="grid grid-cols-3 gap-1 auto-rows-fr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="relative aspect-square bg-muted hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <img
                  src={`/placeholder-post-${i % 2 === 0 ? '1' : '2'}.png`}
                  alt={`Explore post ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-semibold">1.2K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-5 w-5 fill-white" />
                      <span className="font-semibold">89</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                {trendingHashtags.map((hashtag) => (
                  <button
                    key={hashtag.tag}
                    className="flex items-center justify-between w-full text-left hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4 text-primary" />
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
                {suggestedUsers.map((user) => (
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
                          {/* REAL SVG VERIFICATION BADGE */}
                          {user.isVerified && (
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              className="h-3 w-3 text-blue-500 fill-blue-500"
                            >
                              <path d="M23.954 4.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 7.5 9.03 6.265a.75.75 0 0 0-.747.06L4.46 8.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 3.431L11.28 1.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                              <path d="M23.954 8.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 11.5 9.03 10.265a.75.75 0 0 0-.747.06L4.46 12.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 7.431L11.28 5.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                              <path d="M23.954 12.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 15.5 9.03 14.265a.75.75 0 0 0-.747.06L4.46 16.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 11.431L11.28 9.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                              <path d="M23.954 16.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 19.5 9.03 18.265a.75.75 0 0 0-.747.06L4.46 20.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 15.431L11.28 13.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                              <path d="M23.954 20.569c-.029.113-.086.216-.162.301l-3.25 3.75a.75.75 0 0 1-.976.073l-3.825-2.25a.75.75 0 0 0-.747-.06L12 23.5 9.03 22.265a.75.75 0 0 0-.747.06L4.46 24.575a.75.75 0 0 1-.976-.073l-3.25-3.75A.75.75 0 0 1 .054 19.431L11.28 17.204a1 1 0 0 1 .814.092l.106.053 11.169 2.279a.75.75 0 0 1 .625.725z"/>
                            </svg>
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
