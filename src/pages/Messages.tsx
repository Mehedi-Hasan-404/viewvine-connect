import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  Image,
  Heart,
  Smile,
  Info,
  Phone,
  Video,
  MoreHorizontal,
} from "lucide-react";

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    user: {
      username: "alex_photos",
      fullName: "Alex Johnson",
      avatar: "/placeholder-avatar.jpg",
      isOnline: true,
    },
    lastMessage: "Hey! Love your latest photos 📸",
    timestamp: "2m",
    unreadCount: 2,
    isActive: true,
  },
  {
    id: "2",
    user: {
      username: "sarah_travels",
      fullName: "Sarah Wilson",
      avatar: "/placeholder-avatar.jpg",
      isOnline: false,
    },
    lastMessage: "Thanks for the follow! 🙏",
    timestamp: "1h",
    unreadCount: 0,
    isActive: false,
  },
  {
    id: "3",
    user: {
      username: "mike_design",
      fullName: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      isOnline: true,
    },
    lastMessage: "Can you send me that template?",
    timestamp: "3h",
    unreadCount: 1,
    isActive: false,
  },
  {
    id: "4",
    user: {
      username: "foodie_emma",
      fullName: "Emma Rodriguez",
      avatar: "/placeholder-avatar.jpg",
      isOnline: false,
    },
    lastMessage: "That restaurant looks amazing! 🍕",
    timestamp: "1d",
    unreadCount: 0,
    isActive: false,
  },
];

// Mock messages for active conversation
const mockMessages = [
  {
    id: "1",
    text: "Hey! I saw your latest mountain photo series",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    text: "It's absolutely stunning! 🏔️",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "3",
    text: "Thank you so much! Spent the whole weekend up there",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "4",
    text: "The sunrise shots are incredible",
    timestamp: "10:33 AM",
    isOwn: true,
  },
  {
    id: "5",
    text: "Would love to know the location if you don't mind sharing",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: "6",
    text: "Of course! It's Rocky Mountain National Park",
    timestamp: "10:36 AM",
    isOwn: true,
  },
  {
    id: "7",
    text: "Hey! Love your latest photos 📸",
    timestamp: "Just now",
    isOwn: false,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText("");
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="h-[600px] border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Messages</h2>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </CardHeader>
            
            <div className="overflow-y-auto custom-scrollbar">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-center space-x-3 hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-muted/70" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.username} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {conversation.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{conversation.user.username}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-primary text-white">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.username} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {selectedConversation.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedConversation.user.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.user.isOnline ? "Active now" : "Last seen recently"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? "bg-gradient-primary text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? "text-white/80" : "text-muted-foreground"
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10 bg-muted/50 border-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>

                {messageText.trim() ? (
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5 text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;