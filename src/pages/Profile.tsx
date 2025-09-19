import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Grid3X3,
  Bookmark,
  Tag,
  Play,
  Heart,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  UserCheck,
} from "lucide-react";
import samplePost1 from "@/assets/sample-post-1.png";
import samplePost2 from "@/assets/sample-post-2.png";

// Mock profile data
const profileData = {
  username: "pixeluser",
  fullName: "John Doe",
  bio: "📸 Photography enthusiast | 🌍 Travel lover | ☕ Coffee addict\nCapturing life's beautiful moments ✨\n📍 San Francisco, CA",
  website: "www.johndoe.com",
  avatar: "/placeholder-avatar.jpg",
  isVerified: true,
  isFollowing: false,
  isOwnProfile: true,
  stats: {
    posts: 147,
    followers: 12500,
    following: 892,
  },
};

// Mock posts data
const mockPosts = [
  { id: "1", image: samplePost1, likes: 1247, comments: 89, isVideo: false },
  { id: "2", image: samplePost2, likes: 892, comments: 34, isVideo: false },
  { id: "3", image: samplePost1, likes: 2103, comments: 156, isVideo: true },
  { id: "4", image: samplePost2, likes: 743, comments: 67, isVideo: false },
  { id: "5", image: samplePost1, likes: 1456, comments: 201, isVideo: false },
  { id: "6", image: samplePost2, likes: 934, comments: 78, isVideo: true },
];

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(profileData.isFollowing);
  const [followersCount, setFollowersCount] = useState(profileData.stats.followers);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6 border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start w-full md:w-auto">
              <Avatar className="h-32 w-32 ring-4 ring-primary/20 hover:ring-primary/40 transition-all">
                <AvatarImage src={profileData.avatar} alt={profileData.username} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                  {profileData.fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              {/* Username and Actions */}
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-light">{profileData.username}</h1>
                  {profileData.isVerified && (
                    <Badge className="bg-primary text-white">
                      ✓
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {profileData.isOwnProfile ? (
                    <>
                      <Button variant="outline" className="hover:bg-muted/50">
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-muted/50">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleFollow}
                        className={`transition-all duration-300 ${
                          isFollowing
                            ? "bg-muted text-foreground hover:bg-muted/80"
                            : "bg-gradient-primary hover:opacity-90 shadow-primary hover:shadow-glow"
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                      <Button variant="outline">Message</Button>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="font-semibold">{formatNumber(profileData.stats.posts)}</div>
                  <div className="text-sm text-muted-foreground">posts</div>
                </div>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <div className="font-semibold">{formatNumber(followersCount)}</div>
                  <div className="text-sm text-muted-foreground">followers</div>
                </button>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <div className="font-semibold">{formatNumber(profileData.stats.following)}</div>
                  <div className="text-sm text-muted-foreground">following</div>
                </button>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <div className="font-semibold">{profileData.fullName}</div>
                <div className="whitespace-pre-line text-sm">{profileData.bio}</div>
                {profileData.website && (
                  <a
                    href={`https://${profileData.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm transition-colors"
                  >
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm border-0 shadow-elegant">
          <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="reels" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Play className="h-4 w-4 mr-2" />
            Reels
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="tagged" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Tag className="h-4 w-4 mr-2" />
            Tagged
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square bg-muted hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                {post.isVideo && (
                  <div className="absolute top-2 right-2">
                    <Play className="h-4 w-4 text-white fill-white" />
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
        </TabsContent>

        <TabsContent value="reels" className="mt-6">
          <div className="grid grid-cols-3 gap-1">
            {mockPosts.filter(post => post.isVideo).map((post) => (
              <div
                key={post.id}
                className="relative aspect-square bg-muted hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <img
                  src={post.image}
                  alt="Reel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
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
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground">Posts you save will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-6">
          <div className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tagged posts</h3>
            <p className="text-muted-foreground">Posts you're tagged in will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;