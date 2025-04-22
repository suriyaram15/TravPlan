
import { useState, useRef, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  X,
  Maximize2,
  Minimize2,
  Bot,
  CheckCircle2,
  Clock,
  MapPin,
  CalendarDays,
  Hotel,
  Train,
  Plane,
  Bus,
  PanelRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/services/ai-service";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";

// Message structure
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  read?: boolean;
  type?: "text" | "options" | "recommendations" | "redirect";
  options?: string[];
  recommendations?: {
    type: "accommodation" | "transport" | "destination" | "season";
    items: {
      name: string;
      description?: string;
      price?: string;
      category?: "budget" | "moderate" | "premium";
      image?: string;
    }[];
  };
  redirectLink?: string;
}

// Predefined keywords for redirection
const REDIRECT_KEYWORDS = {
  temple: "/destinations?category=spiritual",
  temples: "/destinations?category=spiritual",
  beach: "/destinations?category=beach",
  beaches: "/destinations?category=beach",
  mountain: "/destinations?category=mountain",
  mountains: "/destinations?category=mountain",
  adventure: "/destinations?category=adventure",
  blog: "/blogs",
  blogs: "/blogs",
  itinerary: "/create-itinerary",
  itineraries: "/itineraries",
  plan: "/ai-planner",
  travobot: "/travobot",
};

// Seasonal recommendations
const SEASONAL_RECOMMENDATIONS = {
  summer: ["Manali", "Shimla", "Ooty", "Munnar", "Kodaikanal"],
  monsoon: ["Goa", "Kerala", "Coorg", "Lonavala", "Udaipur"],
  winter: ["Jaipur", "Jodhpur", "Rann of Kutch", "Auli", "Gulmarg"]
};

// Policy information
const POLICY_INFO = {
  "refund": "Our standard refund policy allows for full refunds if canceled within 48 hours of booking and at least 7 days before the trip. Partial refunds (50%) for cancellations made 3-7 days before the trip. No refunds for cancellations less than 72 hours before the trip unless there are extraordinary circumstances.",
  "cancellation": "To cancel a booking, please contact our customer service team at least 72 hours before your scheduled trip. Cancellations can be made through your account dashboard or by contacting support@travelindia.com.",
  "terms": "By using our services, you agree to the terms and conditions including privacy policy, booking terms, and community guidelines. Full terms can be viewed at www.travelindia.com/terms.",
  "safety": "We prioritize your safety during travels. Always follow local guidelines, keep emergency contacts handy, maintain awareness of your surroundings, secure valuables, and check travel advisories before your trip. Our 24/7 emergency helpline is available at +91-1234567890."
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    content: "Hello! I'm your travel assistant. How can I help you plan your perfect trip?",
    role: "assistant",
    timestamp: new Date(),
    read: true,
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 0,
    activities: [] as string[],
    travelers: 1,
    travelMode: "",
  });

  const conversationFlow = [
    {
      id: "destination",
      question: "Where would you like to travel in India?",
      field: "destination",
    },
    {
      id: "startDate",
      question: "What's your planned start date? (YYYY-MM-DD)",
      field: "startDate",
    },
    {
      id: "endDate",
      question: "What's your planned end date? (YYYY-MM-DD)",
      field: "endDate",
    },
    {
      id: "budget",
      question: "What's your approximate budget (in INR)?",
      field: "budget",
    },
    {
      id: "activities",
      question: "What activities are you interested in? (e.g., adventure, culture, food, relaxation)",
      field: "activities",
    },
    {
      id: "travelers",
      question: "How many travelers will be joining?",
      field: "travelers",
    },
    {
      id: "travelMode",
      question: "What's your preferred mode of travel? (e.g., train, flight, car)",
      field: "travelMode",
    },
  ];
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when user opens the chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setMessages(prevMessages => 
        prevMessages.map(msg => ({
          ...msg,
          read: true
        }))
      );
    }
  }, [isOpen, isMinimized]);

  const startConversation = () => {
    setCurrentStep(0);
    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: conversationFlow[0].question,
      role: "assistant",
      timestamp: new Date(),
      read: true,
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Handle conversation flow if in a guided flow
    if (currentStep !== null) {
      handleConversationStep(message);
      return;
    }

    try {
      // Check for policy related keywords
      for (const [keyword, info] of Object.entries(POLICY_INFO)) {
        if (message.toLowerCase().includes(keyword)) {
          const policyMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: info,
            role: "assistant",
            timestamp: new Date(),
            type: "text",
          };
          
          setMessages((prev) => [...prev, policyMessage]);
          setIsLoading(false);
          return;
        }
      }

      // Check for redirection keywords
      for (const [keyword, url] of Object.entries(REDIRECT_KEYWORDS)) {
        if (message.toLowerCase().includes(keyword)) {
          // Add a redirect message before sending to API
          const redirectMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: `I can help you find information about ${keyword}. Would you like to visit our ${keyword} page?`,
            role: "assistant",
            timestamp: new Date(),
            type: "redirect",
            redirectLink: url,
          };
          
          setMessages((prev) => [...prev, redirectMessage]);
          setIsLoading(false);
          return;
        }
      }

      // Check for itinerary planning intent
      if (message.toLowerCase().includes("plan") || 
          message.toLowerCase().includes("itinerary") || 
          message.toLowerCase().includes("trip")) {
        const planMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'd be happy to help you plan your trip! Let me ask you a few questions to create a personalized itinerary.",
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, planMessage]);
        setIsLoading(false);
        
        // Start the guided conversation flow
        setTimeout(() => {
          startConversation();
        }, 1000);
        
        return;
      }

      const userName = user?.displayName || "Traveler";
      const contextPrompt = `${userName} is planning a trip. ` +
        `Use collaborative filtering and content-based recommendations. ` +
        `Provide itinerary, places, budget, weather insights, and relevant travel tips. User message: ${message}`;

      const response = await sendMessage(contextPrompt);

      // Process the response for any special content types
      let formattedResponse = response;
      let messageType: Message["type"] = "text";
      let recommendations = undefined;
      
      // Check for accommodation recommendations
      if (message.toLowerCase().includes("hotel") || 
          message.toLowerCase().includes("stay") || 
          message.toLowerCase().includes("accommodation")) {
        messageType = "recommendations";
        recommendations = {
          type: "accommodation",
          items: [
            { name: "Budget Inn", description: "Affordable comfort", price: "₹1,500-2,500", category: "budget" },
            { name: "Comfort Suites", description: "Mid-range hotel with amenities", price: "₹3,000-5,000", category: "moderate" },
            { name: "Luxury Palace", description: "Premium experience", price: "₹7,000+", category: "premium" },
          ]
        };
      }
      
      // Check for transport recommendations
      else if (message.toLowerCase().includes("transport") || 
               message.toLowerCase().includes("travel") || 
               message.toLowerCase().includes("bus") ||
               message.toLowerCase().includes("train") ||
               message.toLowerCase().includes("flight")) {
        messageType = "recommendations";
        recommendations = {
          type: "transport",
          items: [
            { name: "Bus", description: "Economic option", price: "₹500-1,500", category: "budget" },
            { name: "Train", description: "Comfortable journey", price: "₹1,000-3,000", category: "moderate" },
            { name: "Flight", description: "Fastest option", price: "₹3,000+", category: "premium" },
          ]
        };
      }
      
      // Check for seasonal recommendations
      else if (message.toLowerCase().includes("season") || 
               message.toLowerCase().includes("weather") || 
               message.toLowerCase().includes("best time")) {
        const currentMonth = new Date().getMonth();
        let season = "summer";
        
        if (currentMonth >= 6 && currentMonth <= 8) {
          season = "monsoon";
        } else if (currentMonth >= 9 || currentMonth <= 2) {
          season = "winter";
        }
        
        messageType = "recommendations";
        recommendations = {
          type: "season",
          items: SEASONAL_RECOMMENDATIONS[season as keyof typeof SEASONAL_RECOMMENDATIONS].map(place => ({
            name: place,
            description: `Great to visit in ${season}`,
            category: "moderate"
          }))
        };
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formattedResponse,
        role: "assistant",
        timestamp: new Date(),
        type: messageType,
        recommendations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to get response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversationStep = (userInput: string) => {
    if (currentStep === null) return;
    
    // Update trip details based on current step
    const currentQuestion = conversationFlow[currentStep];
    const fieldName = currentQuestion.field as keyof typeof tripDetails;
    
    // Handle different data types
    if (fieldName === "budget" || fieldName === "travelers") {
      const numValue = parseInt(userInput);
      if (!isNaN(numValue)) {
        setTripDetails(prev => ({
          ...prev,
          [fieldName]: numValue
        }));
      }
    } else if (fieldName === "activities") {
      const activities = userInput.split(',').map(act => act.trim());
      setTripDetails(prev => ({
        ...prev,
        activities
      }));
    } else {
      setTripDetails(prev => ({
        ...prev,
        [fieldName]: userInput
      }));
    }
    
    // Move to next step or finish conversation
    if (currentStep < conversationFlow.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Send next question
      setTimeout(() => {
        const nextQuestion: Message = {
          id: Date.now().toString(),
          content: conversationFlow[nextStep].question,
          role: "assistant",
          timestamp: new Date(),
          read: true,
        };
        setMessages(prev => [...prev, nextQuestion]);
        setIsLoading(false);
      }, 1000);
    } else {
      // Finish conversation and generate itinerary
      setCurrentStep(null);
      
      // Send confirmation message
      setTimeout(() => {
        const summaryMessage: Message = {
          id: Date.now().toString(),
          content: `Thank you for providing all the details! Here's a summary of your trip:\n\n` +
            `Destination: ${tripDetails.destination}\n` +
            `Dates: ${tripDetails.startDate} to ${tripDetails.endDate}\n` +
            `Budget: ₹${tripDetails.budget}\n` +
            `Activities: ${tripDetails.activities.join(', ')}\n` +
            `Travelers: ${tripDetails.travelers}\n` +
            `Travel Mode: ${tripDetails.travelMode}\n\n` +
            `Would you like to view your personalized itinerary?`,
          role: "assistant",
          timestamp: new Date(),
          read: true,
          type: "options",
          options: ["Yes, show my itinerary", "No, I'll check later"]
        };
        setMessages(prev => [...prev, summaryMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleOptionSelected = (option: string) => {
    if (option === "Yes, show my itinerary") {
      // Navigate to the itinerary page with trip details
      navigate('/travobot');
      
      // Pass trip details via local storage
      localStorage.setItem('tripDetails', JSON.stringify(tripDetails));
      
      setIsOpen(false);
    } else {
      // User chose not to view itinerary now
      const responseMessage: Message = {
        id: Date.now().toString(),
        content: "No problem! You can always come back to me whenever you're ready to plan your trip. Is there anything else I can help you with?",
        role: "assistant",
        timestamp: new Date(),
        read: true,
      };
      setMessages(prev => [...prev, responseMessage]);
    }
  };

  const handleRedirect = (url: string) => {
    setIsOpen(false);
    navigate(url);
  };

  const toggleChat = () => setIsMinimized((prev) => !prev);
  const toggleVisibility = () => setIsOpen((prev) => !prev);

  if (!isOpen) {
    return (
      <Button
        onClick={toggleVisibility}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 w-80 shadow-lg transition-all duration-300 ease-in-out md:w-96 z-50",
        isMinimized ? "h-14" : "h-[32rem]"
      )}
    >
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-md flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Travel Assistant</span>
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleVisibility} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(32rem-7.5rem)] py-4 pr-4">
              <div className="space-y-4 pl-4">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.type === "recommendations" && msg.recommendations && (
                      <div className="w-full mb-3 bg-muted rounded-lg p-3">
                        <h4 className="font-medium mb-2">
                          {msg.recommendations.type === "accommodation" && "Recommended Places to Stay"}
                          {msg.recommendations.type === "transport" && "Transportation Options"}
                          {msg.recommendations.type === "season" && "Seasonal Recommendations"}
                        </h4>
                        <div className="grid gap-2">
                          {msg.recommendations.items.map((item, i) => (
                            <div key={i} className="bg-background p-2 rounded-md flex justify-between items-center">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
                              </div>
                              {item.price && <div className="text-sm">{item.price}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {msg.type === "redirect" && msg.redirectLink && (
                      <div className="w-full mb-3 bg-muted rounded-lg p-3">
                        <p className="mb-2">{msg.content}</p>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => handleRedirect(msg.redirectLink!)}
                          className="w-full"
                        >
                          <PanelRight className="h-4 w-4 mr-2" /> Go to page
                        </Button>
                      </div>
                    )}
                    
                    {(!msg.type || msg.type === "text") && (
                      <div
                        className={cn(
                          "flex w-max max-w-[80%] flex-col gap-2 rounded-lg p-3",
                          msg.role === "user"
                            ? "ml-auto bg-[#D3E4FD] text-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        <div className="flex items-center justify-end gap-1">
                          <span
                            className={cn(
                              "text-xs",
                              msg.role === "user"
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {msg.role === "user" && (
                            msg.read 
                              ? <CheckCircle2 className="h-3 w-3 text-primary" /> 
                              : <Clock className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    )}

                    {msg.type === "options" && msg.options && (
                      <div className="w-full mb-3 flex flex-wrap gap-2">
                        {msg.options.map((option, idx) => (
                          <Button 
                            key={idx} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOptionSelected(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ChatBot;
