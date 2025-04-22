
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
