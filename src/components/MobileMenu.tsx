"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        className="text-white hover:bg-white/10"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-teal-500 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">New Dawn Tribe</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeMenu}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex flex-col p-4 space-y-4 flex-grow">
            <Link 
              to="/about" 
              className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link 
              to="/tracker" 
              className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Tracker
            </Link>
            <Link 
              to="/contact" 
              className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <Link to="/contact" onClick={closeMenu}>
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;