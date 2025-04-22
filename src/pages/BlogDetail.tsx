import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  ArrowLeft, 
  User, 
  Calendar 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AuthContext } from '@/context/AuthContext';
import CommentSection from '@/components/Blogs/CommentSection';
import { ThemeContext } from '@/context/ThemeContext';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  comments: number;
  category: string;
}

const MOCK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'Top 10 Places to Visit in Rajasthan',
    excerpt: 'Explore the rich cultural heritage and magnificent architecture of Rajasthan, the land of kings.',
    content: `
      <h2>Exploring Rajasthan: The Land of Kings</h2>
      <p>Rajasthan, the land of kings, is one of the most popular tourist destinations in India. With its magnificent forts, palaces, and temples, Rajasthan offers a glimpse into the royal past of India.</p>
      
      <h3>1. Jaipur - The Pink City</h3>
      <p>Known as the Pink City, Jaipur is the capital of Rajasthan and a must-visit destination for travelers. The city is home to several magnificent structures, including Hawa Mahal, City Palace, Amber Fort, and Jantar Mantar (a UNESCO World Heritage Site).</p>
      
      <h3>2. Udaipur - The City of Lakes</h3>
      <p>Often referred to as the "Venice of the East," Udaipur is known for its picturesque lakes, royal residences, and luxurious hotels. The City Palace, Lake Pichola, and Jag Mandir are some of the key attractions.</p>
      
      <h3>3. Jodhpur - The Blue City</h3>
      <p>Jodhpur is famous for its blue-painted houses and the massive Mehrangarh Fort which dominates the cityscape. Other attractions include Jaswant Thada, Umaid Bhawan Palace, and the vibrant markets of the old city.</p>
      
      <h3>4. Jaisalmer - The Golden City</h3>
      <p>Located in the heart of the Thar Desert, Jaisalmer is known for its golden-hued sandstone architecture. The Jaisalmer Fort, also known as Sonar Quila (Golden Fort), is a UNESCO World Heritage Site and the city's main attraction.</p>
      
      <h3>5. Pushkar</h3>
      <p>Known for the sacred Pushkar Lake and the only Brahma Temple in the world, Pushkar is a popular pilgrimage site. The town is also famous for its annual camel fair, which attracts thousands of tourists from around the world.</p>
      
      <h3>6. Ranthambore National Park</h3>
      <p>Home to the majestic Bengal tiger, Ranthambore National Park is one of the largest national parks in northern India. Besides tigers, the park is also home to various other wildlife species, including leopards, nilgai, wild boars, and over 300 species of birds.</p>
      
      <h3>7. Mount Abu</h3>
      <p>The only hill station in Rajasthan, Mount Abu is a popular retreat from the scorching heat of the desert. The Dilwara Temples, a group of Jain temples renowned for their marble carvings, are the main attraction here.</p>
      
      <h3>8. Bikaner</h3>
      <p>Known for its camel festival and the magnificent Junagarh Fort, Bikaner is a vibrant city with a rich cultural heritage. The city is also famous for its spicy savories and sweets.</p>
      
      <h3>9. Chittorgarh</h3>
      <p>Home to one of the largest forts in India, Chittorgarh is a city steeped in history and valor. The Chittorgarh Fort, spread over 700 acres, is a UNESCO World Heritage Site and houses several palaces, temples, and towers.</p>
      
      <h3>10. Bundi</h3>
      <p>A hidden gem in Rajasthan, Bundi is known for its step wells, palaces, and forts. The Taragarh Fort and the Sukh Mahal (where Rudyard Kipling is said to have written parts of his novel "Kim") are the main attractions.</p>
      
      <h2>Best Time to Visit</h2>
      <p>The best time to visit Rajasthan is from October to March when the weather is pleasant and suitable for sightseeing and outdoor activities. The monsoon season (July to September) brings some relief from the heat but can make traveling difficult in some areas.</p>
      
      <h2>Getting Around</h2>
      <p>Rajasthan has a good transport network, with trains and buses connecting major cities. For more flexibility, consider hiring a car with a driver to explore the state at your own pace.</p>
      
      <h2>Accommodation</h2>
      <p>Rajasthan offers a range of accommodation options, from budget guesthouses to luxury heritage hotels. Staying in a heritage hotel, many of which are converted palaces and havelis, is a unique experience that allows you to immerse yourself in the royal lifestyle of Rajasthan.</p>
      
      <h2>Conclusion</h2>
      <p>With its rich history, vibrant culture, and stunning architecture, Rajasthan offers a travel experience like no other. Whether you're exploring the majestic forts, wandering through the bustling markets, or enjoying a cultural performance, Rajasthan will leave you with memories to cherish for a lifetime.</p>
    `,
    author: 'Rahul Sharma',
    date: '2023-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    tags: ['Historical', 'Cultural', 'Summer Travel'],
    likes: 124,
    comments: 32,
    category: 'Cultural'
  }
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [userLiked, setUserLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    const fetchBlog = () => {
      setIsLoading(true);
      try {
        const foundBlog = MOCK_BLOGS.find(b => b.id === id);
        if (foundBlog) {
          setBlog(foundBlog);
          setLikesCount(foundBlog.likes);
        } else {
          navigate('/blogs');
          toast({
            title: "Blog not found",
            description: "The blog you're looking for doesn't exist or has been removed.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast({
          title: "Error",
          description: "There was a problem loading the blog. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, navigate, toast]);
  
  const handleLike = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like this blog.",
        variant: "destructive"
      });
      return;
    }
    
    setUserLiked(prev => !prev);
    setLikesCount(prev => userLiked ? prev - 1 : prev + 1);
    
    toast({
      title: userLiked ? "Removed like" : "Added like",
      description: userLiked ? "You've removed your like from this blog." : "You've liked this blog!",
    });
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment on this blog.",
        variant: "destructive"
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    });
    
    setComment('');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Blog link has been copied to your clipboard.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-muted rounded mb-4"></div>
          <div className="h-6 bg-muted rounded w-3/4 mb-6"></div>
          <div className="h-96 bg-muted rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return null;
  }
  
  return (
    <div className="py-8 px-4">
      <Helmet>
        <title>{blog.title} | Travel India</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags.join(', ') + ', India travel blog, travel stories'} />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 p-0" 
          onClick={() => navigate('/blogs')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`} />
                <AvatarFallback>{blog.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{blog.author}</div>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })}
            </div>
            
            <Badge>{blog.category}</Badge>
          </div>
          
          <div className="rounded-lg overflow-hidden mb-6 h-[400px]">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag: string, idx: number) => (
              <Badge key={idx} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <article 
            className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''} mb-8`}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <Separator className="my-8" />
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{likesCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageSquare className="h-5 w-5" />
                <span>{blog.comments}</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          <div id="comments-section">
            <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments})</h2>
            
            <div className="mb-8">
              <form onSubmit={handleComment} className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 mt-1">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback>
                      {user?.displayName?.[0] || <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder={user ? "Add a comment..." : "Sign in to comment..."}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={!user}
                      className="min-h-[80px] resize-y"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={!user || !comment.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </form>
            </div>
            
            <CommentSection blogId={blog.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
