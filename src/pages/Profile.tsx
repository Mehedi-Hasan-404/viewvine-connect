// /src/pages/Profile.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(12500);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6 border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start w-full md:w-auto">
              <Avatar className="h-32 w-32 ring-4 ring-primary/20 hover:ring-primary/40 transition-all">
                <AvatarImage src={user.photoURL || "/placeholder-avatar.jpg"} alt={user.displayName || "User"} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                  {user.displayName ? user.displayName.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              {/* Username and Actions */}
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-light">{user.displayName || user.email?.split("@")[0]}</h1>
                  <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-500" />
                </div>

                <div className="flex items-center space-x-2">
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
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="font-semibold">147</div>
                  <div className="text-sm text-muted-foreground">posts</div>
                </div>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <div className="font-semibold">{formatNumber(followersCount)}</div>
                  <div className="text-sm text-muted-foreground">followers</div>
                </button>
                <button className="text-center hover:opacity-70 transition-opacity">
                  <div className="font-semibold">892</div>
                  <div className="text-sm text-muted-foreground">following</div>
                </button>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <div className="font-semibold">{user.displayName || "SocialLens User"}</div>
                <div className="whitespace-pre-line text-sm">
                  Welcome to SocialLens! Share your moments with the world.
                </div>
                <a
                  href={`mailto:${user.email}`}
                  className="text-primary hover:text-primary/80 text-sm transition-colors"
                >
                  {user.email}
                </a>
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
          <div className="text-center py-12">
            <Grid3X3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground mb-4">When you share photos, they'll appear here</p>
            <Button>Create Your First Post</Button>
          </div>
        </TabsContent>

        <TabsContent value="reels" className="mt-6">
          <div className="text-center py-12">
            <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reels Yet</h3>
            <p className="text-muted-foreground">Your reels will appear here</p>
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
