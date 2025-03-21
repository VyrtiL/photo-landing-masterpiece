
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Camera } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 px-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-border">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Camera className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-6xl font-display font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          This page seems to be missing from our collection
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
