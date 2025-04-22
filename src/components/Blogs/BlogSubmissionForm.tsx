
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Upload, 
  Image as ImageIcon, 
  Loader2,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogSubmissionFormProps {
  onSubmit: (data: any) => void;
}

const BLOG_CATEGORIES = [
  { id: 'adventure', name: 'Adventure' },
  { id: 'spiritual', name: 'Spiritual' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'budget', name: 'Budget' },
  { id: 'cultural', name: 'Cultural' },
];

const BlogSubmissionForm: React.FC<BlogSubmissionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(newContent.trim().split(/\s+/).length);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };
  
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your blog",
        variant: "destructive"
      });
      return;
    }
    
    if (wordCount < 100) {
      toast({
        title: "Content too short",
        description: "Your blog should have at least 100 words",
        variant: "destructive"
      });
      return;
    }
    
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload a featured image for your blog",
        variant: "destructive"
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for your blog",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would upload the image and save the blog
    setTimeout(() => {
      const blogData = {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl: imagePreview,
        date: new Date().toISOString().split('T')[0],
      };
      
      onSubmit(blogData);
      setIsSubmitting(false);
      
      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
      setImage(null);
      setImagePreview(null);
      setWordCount(0);
    }, 1500);
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your Travel Story</CardTitle>
        <CardDescription>
          Write about your travel experiences, tips, or insights to help fellow travelers
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {BLOG_CATEGORIES.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              className="min-h-[200px]"
              value={content}
              onChange={handleContentChange}
              disabled={isSubmitting}
            />
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Minimum 100 words recommended</span>
              <span className={wordCount < 100 ? "text-destructive" : ""}>
                {wordCount} words
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g., Adventure, Mountains, Budget Travel"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mx-auto max-h-48 object-contain mb-2"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 h-6 w-6 rounded-full"
                    onClick={removeImage}
                    type="button"
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a featured image for your blog
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    JPG, PNG or GIF, max 5MB
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    disabled={isSubmitting}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Blog'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogSubmissionForm;
