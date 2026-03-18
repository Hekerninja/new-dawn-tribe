"use client";
import React, { useState } from 'react';
import { Phone, Mail, Instagram, Twitter, Linkedin, ArrowRight, Calendar, Heart, Shield, Users, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";
import { Link } from 'react-router-dom';
import { ThemeToggle } from "@/components/ThemeToggle";

export const blogs = [
  {
    id: 1,
    title: "Understanding the First Steps of Recovery",
    excerpt: "Recovery begins with a single step. Learn how to navigate the initial challenges of breaking free from addiction.",
    date: "Oct 15, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Building a Support System That Lasts",
    excerpt: "Why having the right people around you is crucial for long-term sobriety and mental well-being.",
    date: "Oct 22, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Mindfulness Techniques for Cravings",
    excerpt: "Practical mindfulness exercises to help you manage urges and stay grounded in the present moment.",
    date: "Oct 29, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  }
];

const services = [
  { icon: <Heart className="w-8 h-8 text-teal-600" />, title: "One-on-One Coaching", description: "Personalized sessions tailored to your unique journey and recovery goals." },
  { icon: <Users className="w-8 h-8 text-teal-600" />, title: "Group Support", description: "Connect with others on similar paths in a safe, facilitated environment." },
  { icon: <Shield className="w-8 h-8 text-teal-600" />, title: "Relapse Prevention", description: "Strategic planning and tools to maintain your sobriety long-term." },
  { icon: <MessageSquare className="w-8 h-8 text-teal-600" />, title: "Family Counseling", description: "Healing the family unit and rebuilding trust with loved ones." }
];

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919529806294", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      showSuccess("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error("Email sending failed:", error);
      showError(error.message || "Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 animate-fade-in transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-teal-600 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-teal-600">New Dawn Tribe</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link to="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">About</Link>
            <a href="#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Services</a>
            <a href="#blog" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Blog</a>
            <a href="#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleWhatsAppClick} className="bg-teal-600 hover:bg-teal-700 text-white btn-smooth shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Book Consultation
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 -z-10 transition-colors duration-300" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight animate-slide-up delay-100">
            Reclaim Your Life <br />
            <span className="text-teal-600 dark:text-teal-400">One Step at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-slide-up delay-200">
            Professional de-addiction coaching for young adults. New Dawn Tribe provides a safe, non-judgmental space to help you break free and build a future you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
            <Button onClick={handleWhatsAppClick} size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 btn-smooth shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Journey
            </Button>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 text-lg px-8 btn-smooth shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900 animate-slide-up transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-teal-100 dark:bg-teal-900/30 rounded-2xl transform rotate-3 -z-10 transition-transform duration-500 group-hover:rotate-6" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team supporting each other" className="w-full h-96 object-cover rounded-xl shadow-lg img-smooth group-hover:scale-105" />
            </div>
            <div className="animate-slide-up delay-100">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">Welcome to New Dawn Tribe</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                At New Dawn Tribe, we understand the unique challenges young adults face when dealing with addiction. We've turned our personal journeys into a mission to help others find their way back to themselves.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Our approach combines evidence-based techniques with empathy and real-world understanding. We don't just treat the addiction; we help you rebuild your identity, confidence, and future.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">100+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Lives Changed</div>
                </div>
                <div className="w-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">5+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950 animate-slide-up transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">How We Can Help</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Comprehensive support tailored to your specific needs and recovery goals.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-900 card-smooth transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-50">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white dark:bg-slate-900 animate-slide-up transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Latest Insights</h2>
              <p className="text-slate-600 dark:text-slate-300">Weekly articles on recovery, mental health, and growth.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 btn-smooth">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="block group">
                <Card className="border-none shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden h-full card-smooth transform hover:-translate-y-2 bg-white dark:bg-slate-900">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover img-smooth group-hover:scale-110" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{blog.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <span className="text-teal-600 dark:text-teal-400 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400 btn-smooth">View All Posts</Button>
          </div>
        </div>
      </section>

      {/* Social Media & Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 dark:bg-slate-950 text-white animate-slide-up transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Ready to take the first step? Reach out to New Dawn Tribe directly or follow us on social media for daily tips and inspiration.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 group">
                  <div className="bg-teal-600 p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Call Us</div>
                    <div className="font-medium">+91 9529806294</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-teal-600 p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Email Us</div>
                    <div className="font-medium">newdawntribe@gmail.com</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/newdawntribe/" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white btn-smooth">
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href="https://x.com/NewDawnTribe" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white btn-smooth">
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/sagar-banerjee-40522b3b8/" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white btn-smooth">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <Card className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-none shadow-xl card-smooth transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="transition-all duration-300 focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="transition-all duration-300 focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <Textarea placeholder="How can we help you?" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="transition-all duration-300 focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                  </div>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white btn-smooth shadow-md hover:shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 dark:bg-black text-slate-400 py-8 border-t border-slate-800 animate-fade-in transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 New Dawn Tribe. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;