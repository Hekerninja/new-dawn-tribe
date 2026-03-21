"use client";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Target, Award, LogIn, UserPlus, LogOut, Plus, RotateCcw, Crown, Trash2, Shield, Users, Loader2, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { showError } from "@/utils/toast";
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';
import { useSobrietyTracker } from '@/contexts/SobrietyTrackerContext';

const SobrietyTracker: React.FC = () => {
  const { currentUser, isLoggedIn, isLoading, leaderboard, login, signup, logout, resetProgress, refreshLeaderboard, deleteAccount, updateAdminStatus } = useSobrietyTracker();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showLogin, setShowLogin] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timer, setTimer] = useState(0);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (currentUser) {
      const startDate = new Date(currentUser.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setCurrentStreak(diffDays);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isLoggedIn && currentUser?.isAdmin) {
      refreshLeaderboard();
    }
  }, [isLoggedIn, currentUser, refreshLeaderboard]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isLoggedIn) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoggedIn]);

  const handleSignup = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      showError("Please fill in all fields");
      return;
    }
    try {
      await signup(signupForm.name, signupForm.email, signupForm.password);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen font-sans text-foreground relative flex items-center justify-center">
        <CosmicBackground />
        <div className="text-center z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
            <span className="text-white text-xl">Loading Sobriety Tracker...</span>
          </div>
          <p className="text-gray-300">Please wait while we initialize your session</p>
          <div className="mt-4">
            <Link to="/" className="text-teal-400 hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen font-sans text-foreground relative">
        <CosmicBackground />
        <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-teal-500 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-teal-400">New Dawn Tribe</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
              <Link to="/" className="hover:text-teal-400 transition-colors duration-300">Home</Link>
              <Link to="/about" className="hover:text-teal-400 transition-colors duration-300">About</Link>
              <Link to="/services" className="hover:text-teal-400 transition-colors duration-300">Services</Link>
              <Link to="/blog" className="hover:text-teal-400 transition-colors duration-300">Blog</Link>
              <Link to="/contact" className="hover:text-teal-400 transition-colors duration-300">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/contact">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white btn-smooth shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hidden md:block">
                  Book Consultation
                </Button>
              </Link>
              <MobileMenu />
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-12 max-w-4xl z-10 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sobriety Tracker</h1>
            <p className="text-xl text-gray-300">Begin your journey to recovery and track your progress</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <LogIn className="w-6 h-6 text-teal-400" />
                    Login to Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                      Login
                    </Button>
                  </form>
                  <div className="mt-4 text-center">
                    <p className="text-gray-400">
                      Don't have an account?{' '}
                      <button onClick={() => setShowLogin(false)} className="text-teal-400 hover:underline">
                        Sign up
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            {!showLogin && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2">
                      <UserPlus className="w-6 h-6 text-teal-400" />
                      Create New Account                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-300">Full Name</label>
                        <Input
                          placeholder="Your Name"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                          className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-300">Email</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                          className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-300">Password</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                          className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                        Sign Up
                      </Button>
                    </form>
                    <div className="mt-4 text-center">
                      <p className="text-gray-400">
                        Already have an account?{' '}
                        <button onClick={() => setShowLogin(true)} className="text-teal-400 hover:underline">
                          Login
                        </button>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 max-w-md mx-auto">
            <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-purple-400" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    Admin access is managed securely through Firestore. Contact the system administrator to request admin privileges.
                  </p>
                  <p className="text-sm text-gray-500">
                    Your admin status is stored securely in the database and cannot be bypassed client-side. All admin actions require proper Firebase Authentication.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-foreground relative">
      <CosmicBackground />
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-teal-500 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-teal-400">New Dawn Tribe</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-teal-400 transition-colors duration-300">Home</Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors duration-300">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors duration-300">Services</Link>
            <Link to="/blog" className="hover:text-teal-400 transition-colors duration-300">Blog</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors duration-300">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            {currentUser?.isAdmin && (
              <Link to="/admin">
                <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 flex items-center gap-2 hidden md:flex">
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center gap-2 hidden md:flex">
              <LogOut className="w-4 h-4" />
              Logout            </Button>
            <MobileMenu />
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 max-w-6xl z-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sobriety Tracker</h1>
          <p className="text-xl text-gray-300">Celebrating your journey to recovery</p>
        </motion.div>
        {currentUser?.isAdmin && (
          <div className="md:hidden mb-6 flex gap-2">
            <Link to="/admin" className="flex-1">
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 flex items-center gap-2 w-full justify-center">
                <Settings className="w-4 h-4" />
                Admin Panel
              </Button>
            </Link>
            <Button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
        {!isAdminView && (
          <div className="mb-6">
            <Button onClick={() => setShowLeaderboard(!showLeaderboard)} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30 flex items-center gap-2 w-full md:w-auto justify-center">
              <Users className="w-4 h-4" />
              {showLeaderboard ? 'Hide Leaderboard' : 'View Community Leaderboard'}
            </Button>
          </div>
        )}
        {isAdminView ? (
          <motion.div key="admin-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No users found in the leaderboard</p>
                    <Button onClick={refreshLeaderboard} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30">
                      Refresh Leaderboard
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Days Sober</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-white">
                            {index === 0 ? <span className="text-yellow-400">#1</span> : index === 1 ? <span className="text-gray-300">#2</span> : index === 2 ? <span className="text-amber-600">#3</span> : `#${index + 1}`}
                          </TableCell>
                          <TableCell className="text-white flex items-center gap-2">
                            {user.name}
                            {user.isAdmin && <Shield className="w-4 h-4 text-purple-400" />}
                          </TableCell>
                          <TableCell className="text-teal-400">{user.streak}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                                onClick={() => updateAdminStatus(user.id, !user.isAdmin)}
                              >
                                {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                onClick={() => deleteAccount(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div>
            {showLeaderboard && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      Community Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {leaderboard.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">No users found in the leaderboard</p>
                        <Button onClick={refreshLeaderboard} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30">
                          Refresh Leaderboard
                        </Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-300">Rank</TableHead>
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Days Sober</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaderboard.map((user, index) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium text-white">
                                {index === 0 ? <span className="text-yellow-400">#1</span> : index === 1 ? <span className="text-gray-300">#2</span> : index === 2 ? <span className="text-amber-600">#3</span> : `#${index + 1}`}
                              </TableCell>
                              <TableCell className="text-white flex items-center gap-2">
                                {user.name}
                                {user.isAdmin && <Shield className="w-4 h-4 text-purple-400" />}
                              </TableCell>
                              <TableCell className="text-teal-400">{user.streak}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">{currentStreak}</div>
                    <div className="text-gray-300">Days Sober</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">{formatTime(timer)}</div>
                    <div className="text-gray-300">Current Session</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">0</div>
                    <div className="text-gray-300">Relapses</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">100%</div>
                    <div className="text-gray-300">Commitment</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lg:col-span-2">
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2">
                      <Target className="w-6 h-6 text-teal-400" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Sobriety Milestone</span>
                          <span className="text-teal-400 font-medium">{currentStreak} days</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            className="bg-teal-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, currentStreak)}%` }}
                            transition={{ duration: 1, delay: 0.7 }}
                          ></motion.div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <div className="text-2xl font-bold text-teal-400">1</div>
                          <div className="text-sm text-gray-300">Day</div>
                        </div>
                        <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <div className="text-2xl font-bold text-teal-400">7</div>
                          <div className="text-sm text-gray-300">Week</div>
                        </div>
                        <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <div className="text-2xl font-bold text-teal-400">30</div>
                          <div className="text-sm text-gray-300">Month</div>
                        </div>
                        <div className="text-center p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <div className="text-2xl font-bold text-teal-400">365</div>
                          <div className="text-sm text-gray-300">Year</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={resetProgress} className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 flex items-center gap-2">
                          <RotateCcw className="w-4 h-4" />
                          Reset Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2">
                      <Award className="w-6 h-6 text-teal-400" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">First Day</div>
                          <div className="text-sm text-gray-400">Completed 1 day</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-500">Week Champion</div>
                          <div className="text-sm text-gray-500">Complete 7 days</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-500">Month Master</div>
                          <div className="text-sm text-gray-500">Complete 30 days</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-500">Year Warrior</div>
                          <div className="text-sm text-gray-500">Complete 365 days</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="mt-8">
              <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Your Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-4">🌟</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Keep Going Strong!</h3>
                      <p className="text-gray-300 max-w-md mx-auto">
                        You've made it {currentStreak} days! Every moment of sobriety is a victory worth celebrating.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobrietyTracker;