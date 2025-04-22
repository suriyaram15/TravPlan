
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Search, 
  Filter, 
  Tag,
  Clock, 
  Bookmark, 
  PenSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BlogList from '@/components/Blogs/BlogList';
import BlogSubmissionForm from '@/components/Blogs/BlogSubmissionForm';

// Mock blog data
const MOCK_BLOGS = [
  {
    id: '1',
    title: 'Top 10 Places to Visit in Rajasthan',
    excerpt: 'Explore the rich cultural heritage and magnificent architecture of Rajasthan, the land of kings.',
    content: 'Rajasthan, the land of kings, is one of the most popular tourist destinations in India. With its magnificent forts, palaces, and temples, Rajasthan offers a glimpse into the royal past of India. Here are the top 10 places to visit in Rajasthan...',
    author: 'Rahul Sharma',
    date: '2023-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    tags: ['Historical', 'Cultural', 'Summer Travel'],
    likes: 124,
    comments: 32,
    category: 'Cultural'
  },
  {
    id: '2',
    title: 'Backpacking through Kerala: A Budget Guide',
    excerpt: "How to explore God's Own Country on a shoestring budget - from backwaters to hill stations.",
    content: "Kerala, known as God's Own Country, is a paradise for budget travelers. With its stunning backwaters, serene beaches, and lush hill stations, Kerala offers a diverse range of experiences. Here's how you can explore Kerala on a budget...",
    author: 'Ananya Patel',
    date: '2023-08-22',
    imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    tags: ['Budget', 'Backpacking', 'Monsoon Travel'],
    likes: 85,
    comments: 17,
    category: 'Budget'
  },
  {
    id: '3',
    title: 'Luxury Retreats in the Himalayas',
    excerpt: 'Indulge in the ultimate mountain luxury at these premium resorts and wellness retreats.',
    content: 'The majestic Himalayas offer not just adventure and natural beauty but also some of the most luxurious retreats in India. From infinity pools overlooking snow-capped peaks to spa treatments using local herbs, these luxury retreats provide an unforgettable experience...',
    author: 'Vikram Singh',
    date: '2023-09-05',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    tags: ['Luxury', 'Wellness', 'Winter Destinations'],
    likes: 210,
    comments: 45,
    category: 'Luxury'
  },
  {
    id: '4',
    title: 'Adventure Sports in Rishikesh',
    excerpt: 'Get your adrenaline pumping with white water rafting, bungee jumping, and more in Rishikesh.',
    content: 'Rishikesh, often called the Adventure Capital of India, offers a wide range of adrenaline-pumping activities. From white water rafting in the Ganges to bungee jumping from one of the highest platforms in India, Rishikesh has something for every adventure enthusiast...',
    author: 'Rohan Mehta',
    date: '2023-10-12',
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    tags: ['Adventure', 'Sports', 'Trending'],
    likes: 178,
    comments: 56,
    category: 'Adventure'
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'spiritual', name: 'Spiritual' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'budget', name: 'Budget' },
  { id: 'cultural', name: 'Cultural' },
];

const SEASONAL_TAGS = [
  { id: 'summer-travel', name: 'Summer Travel' },
  { id: 'monsoon-travel', name: 'Monsoon Travel' },
  { id: 'winter-destinations', name: 'Winter Destinations' },
  { id: 'best-time-to-visit', name: 'Best Time to Visit' },
  { id: 'trending', name: 'Trending' },
];

const TravelBlogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('browse');
  
  const { toast } = useToast();
  
  const filteredBlogs = MOCK_BLOGS.filter(blog => {
    // Search filter
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
                          blog.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
                      selectedTags.some(tag => blog.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleBlogSubmit = (blogData: any) => {
    // In a real app, this would send data to the backend
    console.log("Blog submission:", blogData);
    toast({
      title: "Blog Submitted",
      description: "Your blog has been submitted for review.",
    });
    setActiveTab('browse');
  };
  
  return (
    <Container className="py-8">
      <Helmet>
        <title>Travel Blogs - Insights & Stories | Travel India</title>
        <meta name="description" content="Explore travel stories, tips, and insights about traveling in India. From budget backpacking to luxury retreats, find inspiration for your next journey." />
        <meta name="keywords" content="India travel blog, travel stories, travel tips, adventure blogs, budget travel, luxury travel, spiritual journeys" />
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Travel <span className="text-primary">Blogs</span> & Stories
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Discover travel insights, tips, and inspiring stories from fellow travelers
        </p>
        
        <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <TabsList>
              <TabsTrigger value="browse" className="gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Browse Blogs</span>
              </TabsTrigger>
              <TabsTrigger value="submit" className="gap-2">
                <PenSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Submit a Blog</span>
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'browse' && (
              <div className="mt-4 md:mt-0 flex">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search blogs..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="ml-2">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <TabsContent value="browse" className="mt-0">
            <div className="mb-6">
              <h3 className="text-sm font-medium flex items-center gap-1 mb-2">
                <Tag className="h-4 w-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-medium flex items-center gap-1 mb-2">
                <Clock className="h-4 w-4" />
                Seasonal & Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {SEASONAL_TAGS.map(tag => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.name)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <BlogList blogs={filteredBlogs} />
          </TabsContent>
          
          <TabsContent value="submit">
            <BlogSubmissionForm onSubmit={handleBlogSubmit} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default TravelBlogs;
