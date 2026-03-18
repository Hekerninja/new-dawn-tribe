"use client"; import React from 'react'; import { useParams, Link } from 'react-router-dom'; import { ArrowLeft, Calendar, Clock, Share2, Heart } from 'lucide-react'; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { blogs } from './Index'; // Importing the data for now, ideally this would come from a DB or API

const BlogPost = () => { const { id } = useParams(); const blog = blogs.find(b => b.id === parseInt(id!));

if (!blog) { return ( <div className="min-h-screen flex items-center justify-center bg-slate-50"> <div className="text-center"> <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1> <Link to="/"> <Button variant="outline">Back to Home</Button> </Link> </div> </div> ); }

return ( <div className="min-h-screen bg-slate-50 font-sans text-slate-900"> {/* Navigation (Simplified for blog) */} <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50"> <div className="container mx-auto px-4 py-4 flex justify-between items-center"> <Link to="/" className="flex items-center gap-2"> <div className="bg-teal-600 p-2 rounded-lg"> <Heart className="w-6 h-6 text-white" /> </div> <span className="text-xl font-bold text-slate-800">New Dawn Tribe</span> </Link> <Link to="/"> <Button variant="ghost" className="text-slate-600">Home</Button> </Link> </div> </nav>

<div className="container mx-auto px-4 py-12 max-w-4xl"> <Link to="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8 font-medium"> <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog </Link>

<Card className="border-none shadow-xl overflow-hidden"> <div className="h-64 md:h-96 overflow-hidden"> <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" /> </div> <CardContent className="p-8 md:p-12"> <div className="flex items-center gap-4 text-sm text-slate-500 mb-6"> <div className="flex items-center gap-1"> <Calendar className="w-4 h-4" /> <span>{blog.date}</span> </div> <div className="flex items-center gap-1"> <Clock className="w-4 h-4" /> <span>{blog.readTime}</span> </div> </div>

<h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">{blog.title}</h1>

<div className="prose prose-lg prose-slate max-w-none text-slate-600"> <p className="text-xl leading-relaxed mb-6 text-slate-700 font-medium">{blog.excerpt}</p> <p className="mb-6">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</p> <p className="mb-6">
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
</p> <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Key Takeaways</h3> <ul className="list-disc pl-6 space-y-2 mb-6"> <li>Understanding the root causes of addiction is the first step to recovery.</li> <li>Building a strong support system is crucial for long-term success.</li> <li>Mindfulness and self-care practices help manage cravings effectively.</li> <li>Professional guidance provides the tools needed for sustainable change.</li> </ul> <p className="mb-6">
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
</p> <p>
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
</p> </div>

<div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center"> <div className="flex gap-2"> <Button variant="outline" size="sm" className="gap-2"> <Heart className="w-4 h-4" /> Like </Button> <Button variant="outline" size="sm" className="gap-2"> <Share2 className="w-4 h-4" /> Share </Button> </div> </div> </CardContent> </Card> </div> </div> ); }; export default BlogPost;