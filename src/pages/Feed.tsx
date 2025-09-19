import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import samplePost1 from "@/assets/sample-post-1.png";
import samplePost2 from "@/assets/sample-post-2.png";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    user: {
      username: "naturelover",
      avatar: "/placeholder-avatar.jpg",
      isVerified: true,
    },
    images: [samplePost1],
    caption: "Caught this amazing sunset while hiking in the mountains! Nature never fails to amaze me 🌄✨ #sunset #mountains #nature #hiking",
    location: "Rocky Mountains",
    likes: 1247,
    comments: 89,
    timeAgo: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    user: {
      username: "coffeeaddict",
      avatar: "/placeholder-avatar.jpg",
      isVerified: false,
    },
    images: [samplePost2],
    caption: "Perfect morning fuel ☕️ This new blend from @localroastery is absolutely incredible! #coffee #morning #lifestyle",
    location: "Downtown Café",
    likes: 892,
    comments: 34,
    timeAgo: "4 hours ago",
    isLiked: true,
    isBookmarked: true,
  },
];

// Mock stories data
const mockStories = [
  { id: "your-story", username: "Your Story", avatar: "/placeholder-avatar.jpg", isOwn: true },
  { id: "1", username: "alex_photos", avatar: "/placeholder-avatar.jpg" },
  { id: "2", username: "travel_diary", avatar: "/placeholder-avatar.jpg" },
  { id: "3", username: "foodie_life", avatar: "/placeholder-avatar.jpg" },
  { id: "4", username: "art_gallery", avatar: "/placeholder-avatar.jpg" },
  { id: "5", username: "music_lover", avatar: "/placeholder-avatar.jpg" },
];

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [stories, setStories] = useState(mockStories);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories Section */}
      <Card className="mb-6 border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center space-y-1 min-w-[64px] cursor-pointer group"
              >
                <div className="relative">
                  <Avatar className={`h-16 w-16 ring-2 transition-all duration-300 ${
                    story.isOwn 
                      ? "ring-muted-foreground group-hover:ring-primary" 
                      : "ring-gradient-to-br from-pink-500 to-purple-500 group-hover:scale-105"
                  }`}>
                    <AvatarImage src={story.avatar} alt={story.username} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {story.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {story.isOwn && (
                    <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 ring-2 ring-background">
                      <Plus className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-center max-w-[64px] truncate">
                  {story.isOwn ? "Your Story" : story.username}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="animate-fade-in-up">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 mb-8">
        <Button
          variant="outline"
          className="hover:bg-primary hover:text-white transition-colors duration-300"
        >
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default Feed;