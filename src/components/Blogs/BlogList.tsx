
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Calendar,
  User,
  Eye
} from 'lucide-react';

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

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No blogs found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map(blog => (
        <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <Link to={`/blogs/${blog.id}`} className="h-48 overflow-hidden block">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 img-dark-filter"
            />
          </Link>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Link to={`/blogs/${blog.id}`}>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </Link>
                <CardDescription className="flex items-center gap-2 text-xs">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" /> 
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </CardDescription>
              </div>
              <Badge>{blog.category}</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm line-clamp-3 mb-3">{blog.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="p-0 h-8">
                <Heart className="h-4 w-4 mr-1" /> 
                <span className="text-xs">{blog.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-8">
                <MessageSquare className="h-4 w-4 mr-1" /> 
                <span className="text-xs">{blog.comments}</span>
              </Button>
            </div>
            <Link to={`/blogs/${blog.id}`}>
              <Button variant="ghost" size="sm" className="p-0 h-8">
                <Eye className="h-4 w-4 mr-1" /> 
                <span className="text-xs">Read More</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
