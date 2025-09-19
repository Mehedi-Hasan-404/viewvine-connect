import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: {
    id: string;
    user: {
      username: string;
      avatar: string;
      isVerified?: boolean;
    };
    images: string[];
    caption: string;
    location?: string;
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked: boolean;
    isBookmarked: boolean;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // Handle comment submission
      setComment("");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <Card className="w-full max-w-lg mx-auto mb-6 border-0 shadow-elegant hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            <AvatarImage src={post.user.avatar} alt={post.user.username} />
            <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
              {post.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-sm">{post.user.username}</span>
            {post.user.isVerified && (
              <Badge variant="secondary" className="h-4 w-4 p-0 bg-primary text-white">
                ✓
              </Badge>
            )}
          </div>
          {post.location && (
            <>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {post.location}
              </div>
            </>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Image(s) */}
      <div className="relative aspect-square bg-muted">
        <img
          src={post.images[currentImageIndex]}
          alt="Post content"
          className="w-full h-full object-cover"
          onDoubleClick={handleLike}
        />
        
        {/* Image Navigation */}
        {post.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              ›
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {post.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={`h-8 w-8 hover:bg-transparent ${
                isLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
              } transition-colors`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={`h-8 w-8 ${
              isBookmarked ? "text-primary" : ""
            } transition-colors`}
          >
            <Bookmark className={`h-6 w-6 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Likes Count */}
        {likesCount > 0 && (
          <div className="text-sm font-semibold mb-2">
            {likesCount.toLocaleString()} {likesCount === 1 ? "like" : "likes"}
          </div>
        )}

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-sm text-muted-foreground mb-2 hover:text-foreground transition-colors">
            View all {post.comments} comments
          </button>
        )}

        {/* Time */}
        <div className="text-xs text-muted-foreground mb-3">{post.timeAgo}</div>

        {/* Add Comment */}
        <div className="flex items-center space-x-3 border-t pt-3">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
            onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
          />
          {comment.trim() && (
            <Button
              onClick={handleCommentSubmit}
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
            >
              Post
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;