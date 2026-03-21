"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, LogIn, UserPlus, LogOut, RefreshCw, Crown, Flame, Calendar, Clock, Award, TrendingUp, Settings, UserCheck, UserX, Trash2, Trophy, Star, Medal, PartyPopper, Gift, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { showSuccess, showError } from "@/utils/toast";
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';
import { useSobrietyTracker } from '@/contexts/SobrietyTrackerContext';

const SobrietyTracker = () => {
  const {
    currentUser,
    isLoggedIn,
    isLoading,
    leaderboard,
    login,
    signup,
    logout,
    resetProgress,
    refreshLeaderboard,
    deleteAccount,
    updateAdminStatus
  } = useSobrietyTracker();

  const [activeTab, setActiveTab] = useState('tracker');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMilestones, setShowMilestones] = useState(false);

  // Calculate days since start date
  const calculateDaysSober = () => {
    if (!currentUser?.startDate) return 0;
    const startDate = new Date(currentUser.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSober = calculateDaysSober();

  // Milestones data
  const milestones = [
    { days: 1, title: "First Day", description: "You've taken the first step!", icon: <Sparkles className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 1 },
    { days: 7, title: "One Week", description: "7 days of commitment!", icon: <Star className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 7 },
    { days: 30, title: "One Month", description: "A full month of progress!", icon: <Trophy className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 30 },
    { days: 90, title: "Three Months", description: "90 days of transformation!", icon: <Medal className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 90 },
    { days: 180, title: "Six Months", description: "Half a year of freedom!", icon: <PartyPopper className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 180 },
    { days: 365, title: "One Year", description: "A full year of sobriety!", icon: <Gift className="w-6 h-6 text-yellow-400" />, achieved: daysSober >= 365 },
  ];

  // Calculate next milestone
  const nextMilestone = milestones.find(milestone => !milestone.achieved);
  const progressToNextMilestone = nextMilestone
    ? Math.min(100, Math.round((daysSober / nextMilestone.days) * 100))
    : 100;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginData.email, loginData.password);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(signupData.name, signupData.email, signupData.password);
      setSignupData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetProgress = async () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      try {
        await resetProgress();
        showSuccess("Your progress has been reset. Starting fresh today!");
      } catch (error) {
        console.error("Reset failed:", error);
        showError("Failed to reset progress. Please try again.");
      }
    }
  };

  const filteredLeaderboard = leaderboard.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalUsers = leaderboard.length;
  const totalDaysSobriety = leaderboard.reduce((acc, user) => acc + user.streak, 0);
  const avgDays = totalUsers > 0 ? Math.round(totalDaysSobriety / totalUsers) : 0;

  // Get user rank
  const userRank = leaderboard.findIndex(user => user.id === currentUser?.id) + 1;

  if (isLoading) {
    return (
      <div className="min-h-screen font-sans text-foreground relative flex items-center justify-center">
        <CosmicBackground />
        <div className="text-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-foreground relative">
      <CosmicBackground />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-teal-500 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-teal-400">New Dawn Tribe</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
            <Link to="/tracker" className="text-teal-400">Tracker</Link>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {currentUser?.isAdmin && (
                  <Link to="/admin">
                    <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button onClick={logout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setActiveTab('login')} variant="ghost" className="text-teal-400 hover:text-teal-300">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button onClick={() => setActiveTab('signup')} className="bg-teal-500 hover:bg-teal-600 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sobriety Tracker
              <br />
              <span className="text-teal-400">Your Journey to Freedom</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Track your progress, stay motivated, and join a community committed to recovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 z-10 relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/40 border border-white/10 p-1 flex flex-wrap gap-1">
            <TabsTrigger value="tracker" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Flame className="w-4 h-4 mr-2" />
              My Tracker
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            {isLoggedIn && (
              <TabsTrigger value="profile" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                <UserCheck className="w-4 h-4 mr-2" />
                My Profile
              </TabsTrigger>
            )}
            {!isLoggedIn && (
              <>
                <TabsTrigger value="login" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Tracker Tab */}
          <TabsContent value="tracker">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-teal-400" />
                      Your Progress
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {isLoggedIn ? `Welcome back, ${currentUser?.name}!` : "Login to start tracking your sobriety journey"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoggedIn ? (
                      <>
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-teal-400 mb-2">
                            {daysSober}
                          </div>
                          <div className="text-gray-300">days sober</div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Start Date:</span>
                            <span className="text-white font-medium">
                              {currentUser?.startDate ? new Date(currentUser.startDate).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Current Streak:</span>
                            <span className="text-teal-400 font-bold">
                              {daysSober} days
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Your Rank:</span>
                            <span className="text-amber-400 font-bold">
                              #{userRank || 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Next Milestone Progress */}
                        {nextMilestone && (
                          <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-300">Next Milestone: {nextMilestone.title}</span>
                              <span className="text-sm text-teal-400">{daysSober}/{nextMilestone.days} days</span>
                            </div>
                            <Progress value={progressToNextMilestone} className="h-2 bg-white/10" />
                          </div>
                        )}

                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <Button onClick={handleResetProgress} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset Progress
                          </Button>
                          <Button onClick={() => setShowMilestones(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
                            <Award className="w-4 h-4 mr-2" />
                            View Milestones
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-300 mb-4">Please login or sign up to start tracking your sobriety journey.</p>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={() => setActiveTab('login')} variant="outline" className="border-teal-400 text-teal-400 hover:bg-teal-500/10">
                            Login
                          </Button>
                          <Button onClick={() => setActiveTab('signup')} className="bg-teal-500 hover:bg-teal-600 text-white">
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-teal-400" />
                      Community Stats
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      See how our community is doing together
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-teal-400" />
                          <span className="text-gray-300">Total Members</span>
                        </div>
                        <span className="text-white font-bold">{totalUsers}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-teal-400" />
                          <span className="text-gray-300">Total Days Sober</span>
                        </div>
                        <span className="text-white font-bold">{totalDaysSobriety}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-amber-400" />
                          <span className="text-gray-300">Average Streak</span>
                        </div>
                        <span className="text-white font-bold">{avgDays} days</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-lg border border-teal-500/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        Top 3 This Week
                      </h4>
                      {leaderboard.length === 0 ? (
                        <p className="text-gray-400 text-sm">No data available</p>
                      ) : (
                        <div className="space-y-2">
                          {leaderboard.slice(0, 3).map((user, index) => (
                            <div key={user.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className={`font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-amber-600'}`}>
                                  {index + 1}.
                                </span>
                                <span className="text-white">{user.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-teal-400 font-bold">{user.streak} days</span>
                                {user.isAdmin && <Shield className="w-3 h-3 text-purple-400" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-teal-400" />
                      Community Leaderboard
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      See how our community members are progressing
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 w-64"
                    />
                    <Button onClick={refreshLeaderboard} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredLeaderboard.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No users found</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Days Sober</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeaderboard.map((user, index) => (
                        <TableRow key={user.id} className="border-white/10">
                          <TableCell className="font-medium text-white">
                            {index === 0 ? <span className="text-yellow-400">#1</span> : index === 1 ? <span className="text-gray-300">#2</span> : index === 2 ? <span className="text-amber-600">#3</span> : `#${index + 1}`}
                          </TableCell>
                          <TableCell className="text-white flex items-center gap-2">
                            {user.name}
                            {user.isAdmin && <Shield className="w-4 h-4 text-purple-400" />}
                          </TableCell>
                          <TableCell className="text-gray-300">{user.email}</TableCell>
                          <TableCell className="text-teal-400 font-medium">{user.streak}</TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Admin</span>
                            ) : (
                              <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">Member</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          {isLoggedIn && (
            <TabsContent value="profile">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-teal-400" />
                      Your Profile
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Name</Label>
                        <Input
                          value={currentUser?.name || ''}
                          readOnly
                          className="bg-black/50 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Email</Label>
                        <Input
                          value={currentUser?.email || ''}
                          readOnly
                          className="bg-black/50 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Member Since</Label>
                        <Input
                          value={currentUser?.startDate ? new Date(currentUser.startDate).toLocaleDateString() : 'N/A'}
                          readOnly
                          className="bg-black/50 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Account Status</Label>
                        <Input
                          value={currentUser?.isAdmin ? 'Administrator' : 'Member'}
                          readOnly
                          className="bg-black/50 border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={logout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-teal-400" />
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button onClick={handleResetProgress} variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset My Progress
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <Clock className="w-4 h-4 mr-2" />
                        Change Timezone
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Login Tab */}
          <TabsContent value="login">
            <div className="max-w-md mx-auto">
              <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-teal-400" />
                    Login to Your Account
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Welcome back! Please enter your details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 mt-1"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Logging in...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Button variant="link" onClick={() => setActiveTab('signup')} className="text-teal-400 hover:text-teal-300 p-0 h-auto">
                      Sign up
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <div className="max-w-md mx-auto">
              <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-teal-400" />
                    Create Your Account
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Join our community and start your sobriety journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Full Name</Label>
                      <Input
                        placeholder="Your Name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Password</Label>
                      <Input
                        type="password"
                        placeholder="•••••••• (min 6 characters)"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 mt-1"
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Creating account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Button variant="link" onClick={() => setActiveTab('login')} className="text-teal-400 hover:text-teal-300 p-0 h-auto">
                      Login
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Milestones Modal */}
      <Dialog open={showMilestones} onOpenChange={setShowMilestones}>
        <DialogContent className="bg-black/80 backdrop-blur-md border border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Your Sobriety Milestones
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Celebrate your progress and achievements on your journey to recovery
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {milestones.map((milestone, index) => (
              <Card key={index} className={`border border-white/10 ${milestone.achieved ? 'bg-teal-500/10 border-teal-500/30' : 'bg-white/5'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-2 rounded-full">
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{milestone.title}</h4>
                      <p className="text-sm text-gray-300 mb-2">{milestone.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                          {milestone.days} days
                        </span>
                        {milestone.achieved ? (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                            Achieved ✓
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowMilestones(false)} className="bg-teal-500 hover:bg-teal-600 text-white">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black/60 text-gray-400 py-8 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 New Dawn Tribe. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering young adults to live free from addiction.</p>
        </div>
      </footer>
    </div>
  );
};

export default SobrietyTracker;