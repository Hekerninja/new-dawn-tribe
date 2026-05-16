"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Clock, Globe, Users, Shield, Zap, Star, CircleCheck as CheckCircle, ArrowRight, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';
import masterclassImage from '@/assets/Gemini_Generated_Image_p1vadfp1vadfp1va.png';
import { showSuccess, showError } from '@/utils/toast';

const agenda = [
  { time: "9:00 AM", title: "Welcome & Opening Ceremony", desc: "Set intentions, meet your cohort, and prepare your mind for transformation." },
  { time: "10:00 AM", title: "Understanding Addiction", desc: "The neuroscience of dependency — why willpower alone never works." },
  { time: "11:30 AM", title: "Breaking the Identity Loop", desc: "Discover how your self-image keeps you stuck and how to rewrite it." },
  { time: "1:00 PM", title: "Lunch Break", desc: "Recharge and connect with fellow participants." },
  { time: "2:00 PM", title: "Powerful Tools & Techniques", desc: "Practical exercises you can use the same day to manage cravings and triggers." },
  { time: "3:30 PM", title: "Building Resilience", desc: "Create a personalised relapse-prevention plan that actually sticks." },
  { time: "4:30 PM", title: "Q&A with Sagar Banerjee", desc: "Live hot-seat coaching and your burning questions answered." },
  { time: "5:00 PM", title: "Closing & Next Steps", desc: "Leave with clarity, community, and a concrete 30-day action plan." },
];

const highlights = [
  { icon: <Globe className="w-6 h-6 text-teal-400" />, label: "Virtual & Exclusive", desc: "Join from anywhere in the world — all you need is internet." },
  { icon: <Users className="w-6 h-6 text-teal-400" />, label: "Expert Guidance", desc: "Led by Sagar Banerjee — 2+ years sober, certified coach." },
  { icon: <Zap className="w-6 h-6 text-teal-400" />, label: "Powerful Tools", desc: "Walk away with real techniques, not just inspiration." },
  { icon: <Shield className="w-6 h-6 text-teal-400" />, label: "Build Resilience", desc: "A personalised relapse-prevention blueprint." },
];

const faqs = [
  { q: "Who is this masterclass for?", a: "Anyone struggling with addiction or supporting a loved one — no prior experience needed. Whether you're in early recovery or have been trying to quit for years, this day is designed for you." },
  { q: "Is it really only ₹99?", a: "Yes! We've priced it this way intentionally so nobody is priced out of their recovery. Spots are strictly limited to keep the session intimate and powerful." },
  { q: "What platform will the masterclass be on?", a: "You'll receive a Zoom link upon registration. Make sure you have Zoom installed before the day." },
  { q: "Will there be a recording?", a: "The masterclass is live-only to maintain the energy and confidentiality of participants. Show up live!" },
  { q: "What if I need to cancel?", a: "Reach out to us at newdawntribe@gmail.com and we'll sort you out." },
];

const Events = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showError("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    showSuccess("You're registered! Check your email for details.");
    setForm({ name: '', email: '', phone: '' });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen font-sans text-foreground relative">
      <CosmicBackground />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-teal-500 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">New Dawn Tribe</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <Link to="/events" className="text-teal-400 font-semibold">Events</Link>
            <Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <Link to="/quiz" className="hover:text-teal-400 transition-colors">Quiz</Link>
            <Link to="/tracker" className="hover:text-teal-400 transition-colors">Tracker</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <a href="#register">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold">Register — ₹99</Button>
              </a>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-0">
        {/* Hero image */}
        <div className="relative w-full max-h-[600px] overflow-hidden">
          <img
            src={masterclassImage}
            alt="Unlock Your Freedom – The De-Addiction Masterclass"
            className="w-full object-cover object-top"
            style={{ maxHeight: '600px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
        </div>

        {/* Event meta strip */}
        <div className="relative z-10 -mt-1 bg-black/60 backdrop-blur-md border-y border-white/10 py-4">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              Saturday, October 26th
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              9:00 AM – 5:00 PM
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              Virtual (Zoom)
            </span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-2 text-amber-400 font-bold text-base">
              Only ₹99
            </span>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">1-Day Transformation</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Unlock Your Freedom.<br />
            <span className="text-amber-400">The De-Addiction Masterclass.</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            One powerful day dedicated entirely to you. Whether you're fighting addiction yourself or supporting someone you love, this masterclass gives you the science, the tools, and the community to finally break free — for good.
          </p>
          <a href="#register">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 font-bold shadow-lg shadow-amber-500/20">
              Secure Your Spot — ₹99
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <p className="mt-4 text-sm text-gray-400">Limited seats. No refunds once confirmed.</p>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="relative z-10 py-16 bg-black/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <Card key={i} className="bg-black/50 border border-white/10 text-white">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/15 flex items-center justify-center">{h.icon}</div>
                  <div className="font-bold text-base">{h.label}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{h.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL GET ── */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What You'll Walk Away With</h2>
          <p className="text-gray-400 text-center mb-12">This isn't a webinar. It's a full-day immersive experience.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "A deep understanding of why you're addicted — and why willpower fails",
              "Proven techniques to manage cravings and triggers in real-time",
              "A rewritten identity that supports sobriety, not sabotages it",
              "A personalised 30-day relapse-prevention action plan",
              "Live Q&A and hot-seat coaching with Sagar Banerjee",
              "Lifetime access to the New Dawn Tribe community group",
              "Accountability partner matched from your cohort",
              "Digital workbook and resource kit (sent before the event)",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-black/40 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-gray-200 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENDA ── */}
      <section className="relative z-10 py-20 bg-black/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Day Agenda</h2>
          <p className="text-gray-400 text-center mb-12">Saturday, October 26th — 9:00 AM to 5:00 PM IST</p>
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-teal-400/20 hidden sm:block" />
            <div className="space-y-6">
              {agenda.map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start">
                  <div className="shrink-0 w-20 text-right text-teal-400 text-sm font-semibold pt-1 hidden sm:block">{item.time}</div>
                  {/* dot */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-teal-400 mt-1.5 ring-4 ring-teal-400/20" />
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 flex-1">
                    <div className="text-xs text-teal-400 font-semibold mb-1 sm:hidden">{item.time}</div>
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-gray-400 text-sm mt-1 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT HOST ── */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300"
                alt="Sagar Banerjee"
                className="w-44 h-44 object-cover rounded-full ring-4 ring-teal-400/40"
              />
            </div>
            <div>
              <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">Your Host</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-3">Sagar Banerjee</h2>
              <div className="flex gap-2 flex-wrap mb-4">
                {["2+ Years Sober", "De-Addiction Coach", "Author", "New Dawn Tribe Founder"].map(t => (
                  <span key={t} className="bg-teal-500/15 text-teal-300 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-4">
                Sagar Banerjee is the founder of New Dawn Tribe and a certified de-addiction coach who has helped hundreds of young adults reclaim their lives. Having walked the path of addiction and recovery himself — and maintained over 2 years of sobriety — he brings both professional expertise and deep personal empathy to every session.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                His upcoming autobiography shares his raw journey from darkness to freedom, and now he's distilling everything he's learned into one transformative day — just for you.
              </p>
              <div className="flex items-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                <span className="text-gray-400 text-sm ml-2">Rated 5★ by past participants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 py-20 bg-black/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What People Are Saying</h2>
          <p className="text-gray-400 text-center mb-12">From past webinars and coaching clients.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", role: "Coaching client", quote: "Sagar's approach is completely different. He actually gets it — he's lived it. After 6 months of trying on my own, one session changed everything." },
              { name: "Rahul M.", role: "Group Support member", quote: "I walked in skeptical and walked out with a plan I actually believed in. The community alone is worth 10x the price." },
              { name: "Ananya K.", role: "Family counseling", quote: "He helped my brother and our whole family heal. We finally understood what was happening and stopped blaming each other." },
            ].map((t, i) => (
              <Card key={i} className="bg-black/50 border border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-teal-400 text-xs">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 text-white font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-teal-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER ── */}
      <section id="register" className="relative z-10 py-20 bg-black/40">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-8">
            <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Limited Seats</span>
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Change Your Life?</h2>
            <p className="text-gray-300 text-sm">Saturday, October 26th &bull; 9:00 AM – 5:00 PM &bull; Virtual</p>
          </div>

          <Card className="bg-black/60 border border-white/10 text-white">
            <CardContent className="p-8">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-extrabold text-amber-400">₹99</span>
                <span className="text-gray-400 text-sm mb-2 line-through">₹999</span>
                <span className="ml-auto bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">90% OFF</span>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Full Name *</label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">WhatsApp Number (optional)</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-base mt-2" disabled={submitting}>
                  {submitting ? "Registering…" : "Register Now — ₹99"}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  Zoom link sent within 24 hours
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  Digital workbook included
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  Safe, judgement-free space
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-gray-500 text-xs mt-4">
            Questions? Email us at <a href="mailto:newdawntribe@gmail.com" className="text-teal-400 underline">newdawntribe@gmail.com</a> or call <a href="tel:+919529806294" className="text-teal-400 underline">+91 9529806294</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 text-gray-400 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="flex items-center gap-2 justify-center mb-4">
            <div className="bg-teal-500 p-1.5 rounded-lg">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">New Dawn Tribe</span>
          </Link>
          <p className="text-sm">&copy; 2026 New Dawn Tribe. All rights reserved.</p>
          <p className="text-xs mt-1">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default Events;
