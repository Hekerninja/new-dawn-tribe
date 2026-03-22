"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirebaseError } from '@/lib/firebase';

const TestDataGenerator = () => {
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    streak: 30,
    isAdmin: false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTestData = async () => {
    setIsGenerating(true);
    try {
      // Add test user to Firestore
      const now = new Date();
      await addDoc(collection(db, "users"), {
        name: testData.name,
        email: testData.email,
        startDate: now,
        streak: testData.streak,
        lastUpdate: now,
        isAdmin: testData.isAdmin,
      });

      // Add test document to test collection
      await addDoc(collection(db, "test"), {
        test: true,
        timestamp: serverTimestamp(),
        description: "Test document for database connection verification"
      });

      showSuccess("Test data generated successfully!");
    } catch (error) {
      console.error("Error generating test data:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border border-white/10 bg-black/40 backdrop-blur-sm max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          Test Data Generator
        </CardTitle>
        <CardDescription className="text-gray-400">
          Generate test users and test documents for development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Name</Label>
          <Input
            value={testData.name}
            onChange={(e) => setTestData({...testData, name: e.target.value})}
            className="bg-black/50 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Email</Label>
          <Input
            value={testData.email}
            onChange={(e) => setTestData({...testData, email: e.target.value})}
            className="bg-black/50 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Streak (days)</Label>
          <Input
            type="number"
            value={testData.streak}
            onChange={(e) => setTestData({...testData, streak: parseInt(e.target.value) || 0})}
            className="bg-black/50 border-white/10 text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={testData.isAdmin}
            onChange={(e) => setTestData({...testData, isAdmin: e.target.checked})}
            className="w-4 h-4"
          />
          <Label htmlFor="isAdmin" className="text-gray-300">Make Admin</Label>
        </div>
        <Button
          onClick={generateTestData}
          disabled={isGenerating}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
        >
          {isGenerating ? 'Generating...' : 'Generate Test Data'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestDataGenerator;