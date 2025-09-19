// /src/pages/CreatePost.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  X, 
  Image as ImageIcon, 
  MapPin, 
  Smile, 
  Tag,
  ChevronLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      // Create previews
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
    
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleSubmit = async () => {
    if (!user || (!caption.trim() && images.length === 0)) return;
    
    setLoading(true);
    
    try {
      // Upload images to Firebase Storage
      const imageUrls: string[] = [];
      
      for (const image of images) {
        const imageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadUrl);
      }
      
      // Save post to Firestore
      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        username: user.displayName || user.email?.split("@")[0] || "Anonymous",
        userAvatar: user.photoURL || "",
        caption,
        location,
        images: imageUrls,
        likes: 0,
        comments: 0,
        createdAt: serverTimestamp(),
        isLiked: false,
        isBookmarked: false,
      });
      
      // Navigate back to feed
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-xl">Create New Post</CardTitle>
          <Button 
            onClick={handleSubmit}
            disabled={!caption.trim() && images.length === 0 || loading}
            className="bg-gradient-primary hover:opacity-90"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "Share"
            )}
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={user.photoURL || "/placeholder-avatar.jpg"} alt="Your profile" />
              <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                {user.displayName ? user.displayName.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user.displayName || user.email}</div>
              <div className="text-sm text-muted-foreground">Your Profile</div>
            </div>
          </div>
          
          {/* Image Upload Area */}
          {images.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Upload Photos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add photos to your post
              </p>
              <label className="cursor-pointer">
                <Input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                <Button variant="outline">Select from computer</Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="aspect-square object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {images.length < 10 && (
                <label className="cursor-pointer">
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add more photos
                  </Button>
                </label>
              )}
            </div>
          )}
          
          {/* Caption Input */}
          <div className="space-y-2">
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="text-right text-sm text-muted-foreground">
              {caption.length}/2200
            </div>
          </div>
          
          {/* Additional Options */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Tag className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-8 w-32 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
