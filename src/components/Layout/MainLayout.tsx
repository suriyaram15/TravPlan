
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps = {}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children || <Outlet />}
        </main>
        <Footer />
        <ChatBot />
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
