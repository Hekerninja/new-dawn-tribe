"use client";
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowRight, 
  Calendar, 
  Heart, 
  Shield, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

// Mock data for blogs (You can replace this with real data later)
const blogs = [
  {
    id: 1,
    title: "Understanding the First Steps of Recovery",
    excerpt: "Recovery begins with a single step. Learn how to navigate the initial challenges of breaking free from addiction.",
    date: "Oct 15, 2023",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building a Support System That Lasts",
    excerpt: "Why having the right people around you is crucial for long-term sobriety and mental well-being.",
    date: "Oct 22, 2023",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Mindfulness Techniques for Cravings",
    excerpt: "Practical mindfulness exercises to help you manage urges and stay grounded in the present moment.",
    date: "Oct 29, 2023",
    readTime: "6 min read"
  }
];

const services = [
  {
    icon: <Heart className="w-8 h-8 text-teal-600" />,
    title: "One-on-One Coaching",
    description: "Personalized sessions tailored to your unique journey and recovery goals."
  },
  {
    icon: <Users className="w-8 h-8 text-teal-600" />,
    title: "Group Support",
    description: "Connect with others on similar paths in a safe, facilitated environment."
  },
  {
    icon: <Shield className="w-8 h-8 text-teal-600" />,
    title: "Relapse Prevention",
    description: "Strategic planning and tools to maintain your sobriety long-term."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-teal-600" />,
    title: "Family Counseling",
    description: "Healing the family unit and rebuilding trust with loved ones."
  }
];

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showError("Please fill in all fields.");
      return;
    }
    // Simulate form submission
    showSuccess("Message sent! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">RecoveryPath</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#services" className="hover:text-teal-600 transition-colors">Services</a>
            <a href="#blog" className="hover:text-teal-600 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Book Consultation
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Reclaim Your Life <br />
            <span className="text-teal-600">One Step at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Professional de-addiction coaching for young adults. I provide a safe, non-judgmental space to help you break free and build a future you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 text-lg px-8">
              Read My Story
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-100 rounded-2xl transform rotate-3 -z-10" />
              <div className="bg-slate-200 h-96 w-full rounded-xl flex items-center justify-center text-slate-400">
                {/* Placeholder for your photo */}
                <span className="text-lg">Your Photo Here</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Hi, I'm [Your Name]</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                At 18, I understand the unique challenges young adults face when dealing with addiction. 
                I've turned my personal journey into a mission to help others find their way back to themselves.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                My approach combines evidence-based techniques with empathy and real-world understanding. 
                I don't just treat the addiction; I help you rebuild your identity, confidence, and future.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">100+</div>
                  <div className="text-sm text-slate-500">Lives Changed</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">5+</div>
                  <div className="text-sm text-slate-500">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How I Can Help</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive support tailored to your specific needs and recovery goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Insights</h2>
              <p className="text-slate-600">Weekly articles on recovery, mental health, and growth.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-teal-600 hover:text-teal-700">
              View All Posts <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                <div className="h-48 bg-slate-100 rounded-t-lg flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
                  <span>Blog Image</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <span className="text-teal-600 font-medium text-sm flex items-center">
                    Read More <ArrowRight className="ml-1 w-3 h-3" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full text-teal-600 border-teal-600">
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media & Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Ready to take the first step? Reach out to me directly or follow me on social media for daily tips and inspiration.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-600 p-3 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Call Me</div>
                    <div className="font-medium">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-teal-600 p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Email Me</div>
                    <div className="font-medium">coach@recoverypath.com</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Follow My Journey</h3>
                <div className="flex gap-4">
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-white text-slate-900 border-none shadow-xl">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <Textarea 
                      placeholder="How can I help you?" 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 RecoveryPath Coaching. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;