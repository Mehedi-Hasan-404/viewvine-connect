// /src/pages/Messages.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch conversations from Firestore
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // In a real app, you would fetch actual conversations from Firestore
    // For now, we'll show an empty state until we implement real data
    const unsubscribe = onSnapshot(
      query(collection(db, "conversations")),
      (snapshot) => {
        const convos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConversations(convos);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      // Handle sending message to Firestore
      setMessageText("");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="h-[calc(100vh-120px)] border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-border/40 flex flex-col">
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
            
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 flex items-center space-x-3 hover:bg-muted/50 transition-colors ${
                      selectedConversation?.id === conversation.id ? "bg-muted/70" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={conversation.user?.avatar || "/placeholder-avatar.jpg"} 
                          alt={conversation.user?.username || "User"} 
                        />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {conversation.user?.username 
                            ? conversation.user.username.slice(0, 2).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user?.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm truncate">
                          {conversation.user?.username || "Unknown User"}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp || "Just now"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-primary text-white">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Conversations Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation with someone to see it here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col border-l border-border/40">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={selectedConversation.user?.avatar || "/placeholder-avatar.jpg"} 
                            alt={selectedConversation.user?.username || "User"} 
                          />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {selectedConversation.user?.username 
                              ? selectedConversation.user.username.slice(0, 2).toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.user?.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {selectedConversation.user?.username || "Unknown User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.user?.isOnline 
                            ? "Active now" 
                            : "Last seen recently"}
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-muted/10">
                  <div className="flex justify-center">
                    <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      Today
                    </div>
                  </div>
                  {/* In a real app, messages would be fetched from Firestore */}
                  <div className="text-center text-muted-foreground py-8">
                    No messages in this conversation yet
                  </div>
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Conversation Selected</h3>
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
