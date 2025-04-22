
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Reply, MoreHorizontal, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock comments data
const MOCK_COMMENTS = [
  {
    id: '1',
    blogId: '1',
    author: 'Priya Patel',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=PP',
    content: 'This is such a comprehensive guide! I visited Jaipur last year and it was exactly as you described. The Amber Fort was breathtaking, especially during sunset.',
    createdAt: '2023-08-15T10:30:00',
    likes: 12,
    replies: [
      {
        id: '1-reply-1',
        author: 'Rahul Sharma',
        authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=RS',
        content: 'Thanks for your comment, Priya! Yes, Amber Fort at sunset is magical. Did you try the elephant ride up to the fort?',
        createdAt: '2023-08-15T14:20:00',
        likes: 3
      }
    ]
  },
  {
    id: '2',
    blogId: '1',
    author: 'Amit Kumar',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=AK',
    content: 'I would add Bundi to this list as well. It\'s a hidden gem with beautiful step wells and not very crowded with tourists.',
    createdAt: '2023-08-20T15:45:00',
    likes: 8,
    replies: []
  },
  {
    id: '3',
    blogId: '1',
    author: 'Sarah Johnson',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=SJ',
    content: 'Planning to visit Rajasthan next month. This guide is super helpful! Any recommendations for local food I must try?',
    createdAt: '2023-09-01T09:15:00',
    likes: 5,
    replies: [
      {
        id: '3-reply-1',
        author: 'Rahul Sharma',
        authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=RS',
        content: 'You must try Dal Baati Churma, Laal Maas, and Pyaaz Kachori! Also, don\'t miss the lassi in Jodhpur.',
        createdAt: '2023-09-01T10:30:00',
        likes: 4
      },
      {
        id: '3-reply-2',
        author: 'Vikram Mehta',
        authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=VM',
        content: 'And Gatte ki Sabzi! It\'s a Rajasthani specialty made from gram flour dumplings.',
        createdAt: '2023-09-01T12:45:00',
        likes: 2
      }
    ]
  }
];

interface CommentSectionProps {
  blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const comments = MOCK_COMMENTS.filter(comment => comment.blogId === blogId);
  
  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.authorImage} />
                <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{comment.author}</h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm">{comment.content}</p>
                </div>
                
                <div className="flex items-center mt-2 ml-2 gap-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Reply className="h-4 w-4 mr-1" />
                    <span className="text-xs">Reply</span>
                  </Button>
                </div>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-6 mt-4 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.authorImage} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="bg-muted p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-sm">{reply.author}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="text-sm">{reply.content}</p>
                          </div>
                          
                          <div className="flex items-center mt-1 ml-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Heart className="h-3 w-3 mr-1" />
                              <span className="text-xs">{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
