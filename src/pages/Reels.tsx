// /src/pages/Reels.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Music,
  MoreHorizontal
} from "lucide-react";

const Reels = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
        {/* Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-700 flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <p className="text-lg font-semibold">Reel Video</p>
            <p className="text-sm opacity-80">Click to play</p>
          </div>
        </div>

        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-0 w-full h-full rounded-none opacity-0 hover:opacity-100 transition-opacity"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-16 w-16 text-white" />
          ) : (
            <Play className="h-16 w-16 text-white" />
          )}
        </Button>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback className="bg-gradient-primary text-white">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="font-semibold text-white">@username</p>
                {/* REAL SVG VERIFICATION BADGE */}
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
              </div>
              <p className="text-sm text-white/90 truncate">Amazing sunset video 🌅</p>
            </div>
          </div>

          {/* Music Info */}
          <div className="flex items-center space-x-2 mb-4">
            <Music className="h-4 w-4 text-white" />
            <p className="text-sm text-white/90 truncate">
              Original Audio - Some Artist
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
              onClick={toggleLike}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <span className="text-white text-xs mt-1">1.2K</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs mt-1">89</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
              onClick={toggleBookmark}
            >
              <Bookmark className={`h-6 w-6 ${bookmarked ? "fill-white" : ""}`} />
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
            >
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reels;
