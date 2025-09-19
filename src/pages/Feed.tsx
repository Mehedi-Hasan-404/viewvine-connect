// /src/pages/Feed.tsx
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Feed = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Firestore
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Fetch stories (in a real app, this would come from Firestore)
    const mockStories = [
      { id: "your-story", username: "Your Story", avatar: user.photoURL || "/placeholder-avatar.jpg", isOwn: true },
    ];
    
    setStories(mockStories);

    // Fetch posts from Firestore
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className="animate-fade-in-up">
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share something amazing!
              </p>
              <Button>Share Your First Post</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More Button */}
      {posts.length > 0 && (
        <div className="flex justify-center mt-8 mb-8">
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default Feed;
