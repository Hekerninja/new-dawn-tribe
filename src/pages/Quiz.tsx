"use client";
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CosmicBackground from '@/components/CosmicBackground';

const Quiz = () => {
  return (
    <div className="min-h-screen font-sans text-foreground animate-fade-in theme-transition relative">
      <CosmicBackground />
            {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-teal-500 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-teal-400">New Dawn Tribe</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Services</Link>
            <Link to="/blog" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Blog</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/contact">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white btn-smooth shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden animate-slide-up z-10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Link to="/" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 font-medium animate-slide-up delay-100">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up delay-200">
            Quiz
            <br />
            <span className="text-teal-400">Coming Soon</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up delay-300">
            Our interactive quiz to help you understand your recovery journey is currently under development.
            Please check back soon!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-sm text-gray-400 py-8 border-t border-white/10 animate-fade-in transition-colors duration-300 z-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 New Dawn Tribe. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default Quiz;