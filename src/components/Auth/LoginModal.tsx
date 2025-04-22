
import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, LogIn, AtSign, KeyRound, User } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      await login();
      
      toast({
        title: "Login successful",
        description: "Welcome back to Travel India!",
      });
      
      onOpenChange(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!email || !password || !displayName) {
        throw new Error('Please fill out all fields.');
      }
      
      // In a real application, this would use a signup method
      // For this mock version, we'll just use login
      await login();
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Travel India!",
      });
      
      onOpenChange(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during signup');
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login" 
              ? "Sign in to access your account and plan your next adventure." 
              : "Sign up to start your journey with Travel India."}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <span className="flex items-center gap-2">
                    <AtSign className="h-4 w-4" />
                    Email
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">
                  <span className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Password
                  </span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="underline text-primary hover:text-primary/90 font-medium"
                >
                  Sign up
                </button>
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name
                  </span>
                </Label>
                <Input
                  id="displayName"
                  placeholder="Your Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">
                  <span className="flex items-center gap-2">
                    <AtSign className="h-4 w-4" />
                    Email
                  </span>
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">
                  <span className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Password
                  </span>
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="underline text-primary hover:text-primary/90 font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
