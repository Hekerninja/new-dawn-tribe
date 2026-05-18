"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Trash2, Crown, LogOut, RefreshCw, ChartBar as BarChart3, Settings, UserCheck, UserX, Activity, Database, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { showSuccess } from "@/utils/toast";
import CosmicBackground from '@/components/CosmicBackground';
import MobileMenu from '@/components/MobileMenu';
import { useSobrietyTracker } from '@/contexts/SobrietyTrackerContext';

const AdminPanel = () => {
  const { currentUser, leaderboard, logout, refreshLeaderboard, deleteAccount, updateAdminStatus, checkDatabaseStatus } = useSobrietyTracker();
  const [activeTab, setActiveTab] = useState('overview');
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Check if user is admin
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen font-sans text-foreground relative flex items-center justify-center">
        <CosmicBackground />
        <div className="text-center z-10 p-8">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-8">You don't have permission to access the admin panel.</p>
          <Link to="/tracker">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white"> Return to Tracker </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Check database status
  useEffect(() => {
    const checkDb = async () => {
      setDbStatus('checking');
      const isConnected = await checkDatabaseStatus();
      setDbStatus(isConnected ? 'connected' : 'error');
    };
    checkDb();
  }, [checkDatabaseStatus]);

  // Filter leaderboard by search term
  const filteredLeaderboard = leaderboard.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalUsers = leaderboard.length;
  const totalDaysSobriety = leaderboard.reduce((acc, user) => acc + user.streak, 0);
  const avgDays = totalUsers > 0 ? Math.round(totalDaysSobriety / totalUsers) : 0;

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // error is shown by context
    }
  };

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
            <div className="hidden md:flex items-center gap-2 mr-4">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">Admin</span>
            </div>
            <Button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-teal-900/50 border-b border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Panel</h1>
          </div>
          <p className="text-gray-300">Manage users, view analytics, and configure system settings</p>
        </div>
      </div>

      {/* Admin Panel Content */}
      <div className="container mx-auto px-4 py-8 z-10 relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/40 border border-white/10 p-1 flex flex-wrap gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Users</p>
                        <p className="text-3xl font-bold text-white">{totalUsers}</p>
                      </div>
                      <div className="bg-teal-500/20 p-3 rounded-full">
                        <Users className="w-6 h-6 text-teal-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Days Sobriety</p>
                        <p className="text-3xl font-bold text-white">{totalDaysSobriety}</p>
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded-full">
                        <Activity className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Average Days</p>
                        <p className="text-3xl font-bold text-white">{avgDays}</p>
                      </div>
                      <div className="bg-amber-500/20 p-3 rounded-full">
                        <Crown className="w-6 h-6 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Database Status</p>
                        <p className={`text-3xl font-bold ${dbStatus === 'connected' ? 'text-green-400' : dbStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {dbStatus === 'checking' ? '...' : dbStatus === 'connected' ? 'OK' : 'Error'}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${dbStatus === 'connected' ? 'bg-green-500/20' : dbStatus === 'error' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                        <Database className={`w-6 h-6 ${dbStatus === 'connected' ? 'text-green-400' : dbStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Top Performers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
              <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    Top Performers
                  </CardTitle>
                  <CardDescription className="text-gray-400">Users with the longest sobriety streaks</CardDescription>
                </CardHeader>
                <CardContent>
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No users found</div>
                  ) : (
                    <div className="space-y-4">
                      {leaderboard.slice(0, 5).map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : index === 1 ? 'bg-gray-400/20 text-gray-300' : index === 2 ? 'bg-amber-600/20 text-amber-600' : 'bg-white/10 text-gray-400'}`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-teal-400">{user.streak}</p>
                            <p className="text-sm text-gray-400">days</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-4 h-4 mr-2" />
                      User Management
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage all registered users</CardDescription>
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
                        <TableHead className="text-gray-300">Actions</TableHead>
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
                              <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">User</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className={`border ${user.isAdmin ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/20' : 'border-green-500/30 text-green-400 hover:bg-green-500/20'}`}
                                onClick={() => updateAdminStatus(user.id, !user.isAdmin)}
                              >
                                {user.isAdmin ? <><UserX className="w-3 h-3 mr-1" /> Remove Admin</> : <><UserCheck className="w-3 h-3 mr-1" /> Make Admin</>}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                onClick={() => setDeleteTargetId(user.id)}
                              >
                                <Trash2 className="w-3 h-3" />
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
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Configure system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400">Security Notice</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        All admin actions are securely stored in Firestore. Admin privileges can only be granted by existing administrators. Client-side bypass is not possible.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h4 className="font-medium text-white">Database Connection</h4>
                      <p className="text-sm text-gray-400">Check Firestore connection status</p>
                    </div>
                    <Button
                      onClick={async () => {
                        const status = await checkDatabaseStatus();
                        showSuccess(status ? 'Database connected successfully' : 'Database connection failed');
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Test Connection
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h4 className="font-medium text-white">Refresh Leaderboard</h4>
                      <p className="text-sm text-gray-400">Manually refresh the user leaderboard</p>
                    </div>
                    <Button onClick={refreshLeaderboard} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-black/60 text-gray-400 py-6 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 New Dawn Tribe. Admin Panel.</p>
        </div>
      </footer>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTargetId} onOpenChange={(open) => { if (!open) setDeleteTargetId(null); }}>
        <AlertDialogContent className="bg-gray-900 border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" /> Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will permanently delete the account and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-gray-300 hover:bg-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => { if (deleteTargetId) { deleteAccount(deleteTargetId); setDeleteTargetId(null); } }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPanel;