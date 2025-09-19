import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  Play,
  Heart,
  MessageCircle,
  Hash,
  UserPlus,
} from "lucide-react";
import samplePost1 from "@/assets/sample-post-1.png";
import samplePost2 from "@/assets/sample-post-2.png";

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

// Mock explore posts - mix of different sizes
const explorePosts = [
  { id: "1", image: samplePost1, likes: 1247, comments: 89, isVideo: false, size: "large" },
  { id: "2", image: samplePost2, likes: 892, comments: 34, isVideo: false, size: "medium" },
  { id: "3", image: samplePost1, likes: 2103, comments: 156, isVideo: true, size: "medium" },
  { id: "4", image: samplePost2, likes: 743, comments: 67, isVideo: false, size: "small" },
  { id: "5", image: samplePost1, likes: 1456, comments: 201, isVideo: false, size: "small" },
  { id: "6", image: samplePost2, likes: 934, comments: 78, isVideo: true, size: "large" },
  { id: "7", image: samplePost1, likes: 567, comments: 45, isVideo: false, size: "medium" },
  { id: "8", image: samplePost2, likes: 1123, comments: 98, isVideo: false, size: "small" },
  { id: "9", image: samplePost1, likes: 789, comments: 56, isVideo: true, size: "medium" },
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

  const getGridClasses = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
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
            {explorePosts.map((post) => (
              <div
                key={post.id}
                className={`relative bg-muted hover:opacity-80 transition-opacity cursor-pointer group aspect-square ${getGridClasses(post.size)}`}
              >
                <img
                  src={post.image}
                  alt="Explore post"
                  className="w-full h-full object-cover"
                />
                {post.isVideo && (
                  <div className="absolute top-2 right-2">
                    <Play className="h-4 w-4 text-white fill-white drop-shadow-sm" />
                  </div>
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{formatNumber(post.comments)}</span>
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
                          {user.isVerified && (
                            <Badge className="h-3 w-3 p-0 bg-primary text-white">
                              ✓
                            </Badge>
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