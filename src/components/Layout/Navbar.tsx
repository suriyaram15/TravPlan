
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  Globe, 
  Bot, 
  User,
  LogOut,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthContext } from '@/context/AuthContext';
import { ThemeContext } from '@/context/ThemeContext';
import LoginModal from '@/components/Auth/LoginModal';

const navigationItems = [
  { name: 'Destinations', href: '/destinations', icon: MapPin },
  { name: 'Itineraries', href: '/itineraries', icon: Calendar },
  { name: 'TravoBot', href: '/travobot', icon: Bot },
  { name: 'Blogs', href: '/blogs', icon: Globe },
  { name: 'About Us', href: '/about', icon: Globe },
  { name: 'Contact', href: '/contact', icon: Search },
  
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Travel India
        </Link>

        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5 mr-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-64">
              <SheetHeader>
                <SheetTitle>Travel India</SheetTitle>
                <SheetDescription>
                  Explore the best of India with our curated travel plans.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-secondary ${location.pathname === item.href ? 'bg-secondary text-secondary-foreground' : ''}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <div className="mt-4 flex justify-between items-center px-4">
                  <Button variant="outline" size="sm" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </Button>
                </div>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" className="absolute top-2 right-2">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium hover:underline ${location.pathname === item.href ? 'underline' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-0">
                    <span className="hidden md:inline-block">{user.displayName}</span>
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img 
                        src={user.photoURL || "https://images.unsplash.com/photo-1721322800607-8c38375eef04"} 
                        alt="User Avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" onClick={() => setLoginModalOpen(true)}>Sign In</Button>
            )}
          </div>
        )}
      </div>
      
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </nav>
  );
};

export default Navbar;

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SheetDescription: React.FC<SheetDescriptionProps> = ({ className, ...props }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {props.children}
    </p>
  );
};
