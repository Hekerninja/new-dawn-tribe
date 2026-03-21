"use client";
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Heart, ArrowLeft, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogs } from './Index';
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';

const Blog = () => {
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
            <Link to="/blog" className="text-teal-400 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1">Blog</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/contact">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white btn-smooth shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Book Consultation
              </Button>
            </Link>
            <MobileMenu />
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
            Latest Insights
            <br />
            <span className="text-teal-400">On Recovery & Growth</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up delay-300">
            Weekly articles on recovery, mental health, and personal growth.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-black/20 backdrop-blur-sm animate-slide-up transition-colors duration-300 z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="block">
                <Card className="border border-white/10 overflow-hidden h-full bg-black/40 backdrop-blur-sm card-smooth transform hover:-translate-y-2 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover img-smooth" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <span className="text-teal-400 font-medium text-sm flex items-center">
                      Read More <ArrowRight className="ml-1 w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-600/90 text-white animate-slide-up z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            You don't have to do this alone. Let's work together to reclaim your life and build a future you love.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 text-lg px-8 btn-smooth shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Book a Consultation
            </Button>
          </Link>
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

export default Blog;