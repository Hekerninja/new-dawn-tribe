"use client";
import React, { useState } from 'react';
import { Phone, Mail, Instagram, Twitter, Linkedin, ArrowRight, Calendar, Heart, Shield, Users, MessageSquare, Sparkles, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";
import { Link } from 'react-router-dom';
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';

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
  {
    icon: <Heart className="w-8 h-8 text-teal-400" />,
    title: "One-on-One Coaching",
    description: "Personalized sessions tailored to your unique journey and recovery goals.",
    price: "₹599 / session",
    popular: true
  },
  {
    icon: <Users className="w-8 h-8 text-teal-400" />,
    title: "Group Support",
    description: "Connect with others on similar paths in a safe, facilitated environment.",
    price: "₹199 / session",
    popular: false
  },
  {
    icon: <Shield className="w-8 h-8 text-teal-400" />,
    title: "Relapse Prevention",
    description: "Strategic planning and tools to maintain your sobriety long-term.",
    price: "₹399 / session",
    popular: false
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-teal-400" />,
    title: "Family Counseling",
    description: "Healing the family unit and rebuilding trust with loved ones.",
    price: "₹899 / session",
    popular: false
  }
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
        body: JSON.stringify({
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "New Dawn Tribe"
        })
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        showError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-foreground relative">
      <CosmicBackground />

      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold text-lg md:text-xl">🎉 Special Offer: ₹99 INR Webinar on "How to Stay Sober" - Coming Soon!</span>
          <Link to="/contact" className="ml-4 bg-white text-amber-600 hover:bg-amber-50 px-4 py-1.5 rounded-full font-semibold text-sm transition-colors flex items-center gap-1">
            Sign Up Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-teal-500 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">New Dawn Tribe</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <Link to="/events" className="hover:text-teal-400 transition-colors">Events</Link>
            <Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <Link to="/quiz" className="hover:text-teal-400 transition-colors">Quiz</Link>
            <Link to="/tracker" className="hover:text-teal-400 transition-colors">Tracker</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Link to="/contact">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Book Consultation
                </Button>
              </Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Reclaim Your Life
            <br />
            <span className="text-teal-400">One Step at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Professional de-addiction coaching for young adults. New Dawn Tribe provides a safe, non-judgmental space to help you break free and build a future you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleWhatsAppClick} size="lg" className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8">
              Start Your Journey
            </Button>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-teal-400 text-teal-400 hover:bg-teal-500/10 text-lg px-8">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team supporting each other" className="w-full h-96 object-cover rounded-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Welcome to New Dawn Tribe</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                At New Dawn Tribe, we understand the unique challenges young adults face when dealing with addiction. We've turned our personal journeys into a mission to help others find their way back to themselves.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our approach combines evidence-based techniques with empathy and real-world understanding. We don't just treat the addiction; we help you rebuild your identity, confidence, and future.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">2+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How We Can Help</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Comprehensive support tailored to your specific needs and recovery goals.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className={`border border-white/10 bg-black/40 ${service.popular ? 'ring-2 ring-teal-400' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
                  </div>
                )}
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-lg font-bold text-white">{service.price}</div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section - Updated to link to Blog page */}
      <section id="blog" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Insights</h2>
              <p className="text-gray-300">Weekly articles on recovery, mental health, and growth.</p>
            </div>
            <Link to="/blog">
              <Button variant="ghost" className="hidden md:flex text-teal-400 hover:text-teal-300">
                View All Posts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="block">
                <Card className="border border-white/10 overflow-hidden h-full bg-black/40">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
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
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button size="lg" variant="outline" className="border-teal-400 text-teal-400 hover:bg-teal-500/10">
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Ready to take the first step? Reach out to New Dawn Tribe directly or follow us on social media for daily tips and inspiration.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500 p-3 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <div className="font-medium">+91 9529806294</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500 p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email Us</div>
                    <div className="font-medium">newdawntribe@gmail.com</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/newdawntribe/" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href="https://x.com/NewDawnTribe" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/sagar-banerjee-40522b3b8/" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <Card className="bg-black/50 text-white border border-white/10">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Name</label>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-300">Message</label>
                    <Textarea
                      placeholder="How can we help you?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 text-gray-400 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 New Dawn Tribe. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;