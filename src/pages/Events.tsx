"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Calendar, Clock, Globe, Users, Shield, Zap, Star,
  CircleCheck as CheckCircle, ArrowRight, ChevronDown, ChevronLeft, ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';
import masterclassImage from '@/assets/Gemini_Generated_Image_p1vadfp1vadfp1va.png';

// ── Event data ─────────────────────────────────────────────────────────────
// To add a new event, append an object to this array following the same shape.
const EVENTS = [
  {
    id: "masterclass-jun-21",
    badge: "Masterclass",
    badgeColor: "amber",
    title: "Unlock Your Freedom",
    subtitle: "The De-Addiction Masterclass",
    tagline: "A One-Day Transformation to Reclaim Your Life",
    date: "Sunday, June 21st, 2026",
    time: "12:00 PM – 2:00 PM",
    platform: "Virtual (Zoom)",
    price: "₹99",
    originalPrice: "₹999",
    discount: "90% OFF",
    status: "Upcoming",
    image: masterclassImage,
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeHS1Ul2J5-1f1LEnPzm0AwXfYBh6Tf7dd5qGcqpt6m85uI5g/viewform?usp=dialog",
    highlights: [
      { icon: "globe",   label: "Virtual & Exclusive", desc: "Join from anywhere in the world — all you need is internet." },
      { icon: "users",   label: "Expert Guidance",     desc: "Led by Sagar Banerjee — 2+ years sober, certified coach." },
      { icon: "zap",     label: "Powerful Tools",      desc: "Walk away with real techniques, not just inspiration." },
      { icon: "shield",  label: "Build Resilience",    desc: "A personalised relapse-prevention blueprint." },
    ],
    outcomes: [
      "A deep understanding of why you're addicted — and why willpower fails",
      "Proven techniques to manage cravings and triggers in real-time",
      "A rewritten identity that supports sobriety, not sabotages it",
      "A personalised 30-day relapse-prevention action plan",
      "Live Q&A and hot-seat coaching with Sagar Banerjee",
      "Lifetime access to the New Dawn Tribe community group",
      "Accountability partner matched from your cohort",
      "Digital workbook and resource kit (sent before the event)",
    ],
    agenda: [
      { time: "12:00 PM", title: "Welcome & Opening",             desc: "Set intentions, meet your cohort, and prepare your mind for transformation." },
      { time: "12:20 PM", title: "Understanding Addiction",        desc: "The neuroscience of dependency — why willpower alone never works." },
      { time: "12:45 PM", title: "Breaking the Identity Loop",     desc: "Discover how your self-image keeps you stuck and how to rewrite it." },
      { time: "1:15 PM",  title: "Powerful Tools & Techniques",    desc: "Practical exercises you can use the same day to manage cravings and triggers." },
      { time: "1:40 PM",  title: "Q&A with Sagar Banerjee",        desc: "Live hot-seat coaching and your burning questions answered." },
      { time: "2:00 PM",  title: "Closing & Next Steps",           desc: "Leave with clarity, community, and a concrete 30-day action plan." },
    ],
    faqs: [
      { q: "Who is this masterclass for?",           a: "Anyone struggling with addiction or supporting a loved one — no prior experience needed. Whether you're in early recovery or have been trying to quit for years, this day is designed for you." },
      { q: "Is it really only ₹99?",                 a: "Yes! We've priced it this way intentionally so nobody is priced out of their recovery. Spots are strictly limited to keep the session intimate and powerful." },
      { q: "What platform will the masterclass be on?", a: "You'll receive a Zoom link upon registration. Make sure you have Zoom installed before the day." },
      { q: "Will there be a recording?",             a: "The masterclass is live-only to maintain the energy and confidentiality of participants. Show up live!" },
      { q: "What if I need to cancel?",              a: "Reach out to us at newdawntribe@gmail.com and we'll sort you out." },
    ],
  },
  // ── Add future events below this line ──
];

// ── Icon helper ────────────────────────────────────────────────────────────
function HighlightIcon({ name }: { name: string }) {
  const cls = "w-6 h-6 text-teal-400";
  if (name === "globe")  return <Globe  className={cls} />;
  if (name === "users")  return <Users  className={cls} />;
  if (name === "zap")    return <Zap    className={cls} />;
  if (name === "shield") return <Shield className={cls} />;
  return null;
}

// ── Badge colour map ───────────────────────────────────────────────────────
const badgeClasses: Record<string, string> = {
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  teal:  "bg-teal-500/20  text-teal-400  border-teal-500/30",
  blue:  "bg-blue-500/20  text-blue-400  border-blue-500/30",
};
const statusClasses: Record<string, string> = {
  Upcoming: "bg-teal-500/20 text-teal-300",
  Live:     "bg-green-500/20 text-green-300",
  Past:     "bg-gray-500/20 text-gray-400",
};

// ── Event detail page ──────────────────────────────────────────────────────
function EventDetail({ event, onBack }: { event: typeof EVENTS[0]; onBack: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Back button */}
      <div className="relative z-10 bg-black/40 border-b border-white/10 py-3">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Events
          </button>
        </div>
      </div>

      {/* Hero image */}
      <section className="relative z-10 pt-0">
        <div className="relative w-full overflow-hidden" style={{ maxHeight: 560 }}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-cover object-top"
            style={{ maxHeight: 560 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
        </div>
        {/* Meta strip */}
        <div className="relative z-10 bg-black/60 backdrop-blur-md border-y border-white/10 py-4">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-white">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-400" />{event.date}</span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-teal-400" />{event.time}</span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-teal-400" />{event.platform}</span>
            <span className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="text-amber-400 font-bold text-base">Only {event.price}</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border mb-4 ${badgeClasses[event.badgeColor] ?? badgeClasses.teal}`}>
            {event.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            {event.title}
          </h1>
          <p className="text-2xl font-bold text-amber-400 mb-4">{event.subtitle}</p>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">{event.tagline}</p>
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 font-bold shadow-lg shadow-amber-500/20">
              Register Now — {event.price}
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <p className="mt-4 text-sm text-gray-400">Limited seats. Secure yours before they're gone.</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 py-16 bg-black/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.highlights.map((h, i) => (
              <Card key={i} className="bg-black/50 border border-white/10 text-white">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/15 flex items-center justify-center">
                    <HighlightIcon name={h.icon} />
                  </div>
                  <div className="font-bold text-base">{h.label}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{h.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What You'll Walk Away With</h2>
          <p className="text-gray-400 text-center mb-12">This isn't a webinar. It's a full-day immersive experience.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {event.outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-black/40 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-gray-200 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="relative z-10 py-20 bg-black/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Day Agenda</h2>
          <p className="text-gray-400 text-center mb-12">{event.date} — {event.time} IST</p>
          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-teal-400/20 hidden sm:block" />
            <div className="space-y-6">
              {event.agenda.map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start">
                  <div className="shrink-0 w-20 text-right text-teal-400 text-sm font-semibold pt-1 hidden sm:block">{item.time}</div>
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

      {/* About host — text only, no photo */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">Your Host</span>
          <h2 className="text-2xl font-bold text-white mt-2 mb-4">Sagar Banerjee</h2>
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            {["2+ Years Sober", "De-Addiction Coach", "Author", "New Dawn Tribe Founder"].map(t => (
              <span key={t} className="bg-teal-500/15 text-teal-300 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            Sagar Banerjee is the founder of New Dawn Tribe and a certified de-addiction coach who has helped hundreds of young adults reclaim their lives. Having walked the path of addiction and recovery himself — and maintained over 2 years of sobriety — he brings both professional expertise and deep personal empathy to every session.
          </p>
          <div className="flex items-center gap-1 mt-6 justify-center">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            <span className="text-gray-400 text-sm ml-2">Rated 5★ by past participants</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 bg-black/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What People Are Saying</h2>
          <p className="text-gray-400 text-center mb-12">From past webinars and coaching clients.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.",   role: "Coaching client",      quote: "Sagar's approach is completely different. He actually gets it — he's lived it. After 6 months of trying on my own, one session changed everything." },
              { name: "Rahul M.",   role: "Group Support member",  quote: "I walked in skeptical and walked out with a plan I actually believed in. The community alone is worth 10x the price." },
              { name: "Ananya K.", role: "Family counseling",     quote: "He helped my brother and our whole family heal. We finally understood what was happening and stopped blaming each other." },
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

      {/* FAQ */}
      <section className="relative z-10 py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {event.faqs.map((faq, i) => (
              <div key={i} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 text-white font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-teal-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section id="register" className="relative z-10 py-20 bg-black/40">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-500/30 mb-6">Limited Seats</span>
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Change Your Life?</h2>
          <p className="text-gray-300 text-sm mb-8">{event.date} &bull; {event.time} &bull; Virtual</p>

          <Card className="bg-black/60 border border-white/10 text-white">
            <CardContent className="p-8">
              <div className="flex items-end gap-3 mb-6 justify-center">
                <span className="text-5xl font-extrabold text-amber-400">{event.price}</span>
                {event.originalPrice && (
                  <span className="text-gray-400 text-sm mb-2 line-through">{event.originalPrice}</span>
                )}
                {event.discount && (
                  <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">{event.discount}</span>
                )}
              </div>

              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-base">
                  Register via Google Forms
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                {["Zoom link sent within 24 hours", "Digital workbook included", "Safe, judgement-free space"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-gray-500 text-xs mt-4">
            Questions? <a href="mailto:newdawntribe@gmail.com" className="text-teal-400 underline">newdawntribe@gmail.com</a> or <a href="tel:+919529806294" className="text-teal-400 underline">+91 9529806294</a>
          </p>
        </div>
      </section>
    </div>
  );
}

// ── Events listing page ────────────────────────────────────────────────────
function EventsListing({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-500/30 mb-4">New Dawn Tribe</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Events</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Workshops, masterclasses, and live sessions to help you break free and build the life you deserve.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {EVENTS.map(event => (
            <button
              key={event.id}
              onClick={() => onSelect(event.id)}
              className="text-left group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              {/* Thumbnail */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeClasses[event.badgeColor] ?? badgeClasses.teal}`}>
                    {event.badge}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClasses[event.status] ?? statusClasses.Upcoming}`}>
                    {event.status}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-white text-sm font-extrabold px-3 py-1 rounded-lg shadow-lg">
                  {event.price}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h2 className="text-xl font-extrabold text-white group-hover:text-teal-400 transition-colors mb-1">{event.title}</h2>
                <p className="text-amber-400 font-semibold text-sm mb-3">{event.subtitle}</p>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{event.tagline}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-teal-400" />{event.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-400" />{event.time}</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-teal-400" />{event.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-xs text-gray-500">Click to explore</span>
                </div>
              </div>
            </button>
          ))}

          {/* "More coming soon" placeholder — hidden once 4+ events exist */}
          {EVENTS.length < 4 && (
            <div className="bg-black/20 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-teal-400/60" />
              </div>
              <p className="text-gray-500 font-medium">More events coming soon</p>
              <p className="text-gray-600 text-sm mt-1">Follow us on Instagram to be the first to know.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Main Events page ───────────────────────────────────────────────────────
const Events = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedEvent = EVENTS.find(e => e.id === selectedId) ?? null;

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
            <Link to="/about"    className="hover:text-teal-400 transition-colors">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <Link to="/events"   className="text-teal-400 font-semibold">Events</Link>
            <Link to="/blog"     className="hover:text-teal-400 transition-colors">Blog</Link>
            <Link to="/quiz"     className="hover:text-teal-400 transition-colors">Quiz</Link>
            <Link to="/tracker"  className="hover:text-teal-400 transition-colors">Tracker</Link>
            <Link to="/contact"  className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            {selectedEvent ? (
              <div className="hidden md:block">
                <a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold">
                    Register — {selectedEvent.price}
                  </Button>
                </a>
              </div>
            ) : null}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Content */}
      {selectedEvent
        ? <EventDetail event={selectedEvent} onBack={() => setSelectedId(null)} />
        : <EventsListing onSelect={setSelectedId} />
      }

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
