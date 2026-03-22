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
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Cosmic Background */}
          <div className="absolute inset-0 bg-[#0a0a1a]">
            {/* Deep space gradient base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]" />

            {/* Stars */}
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
            </div>

            {/* Nebula effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl" />
              <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-teal-600 rounded-full mix-blend-screen filter blur-2xl" />
              <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-600 rounded-full mix-blend-screen filter blur-2xl" />
            </div>
          </div>

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col bg-black/80 backdrop-blur-md">
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
                to="/quiz"
                className="text-xl py-3 px-4 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Quiz
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
        </div>
      )}
    </div>
  );
};

export default MobileMenu;