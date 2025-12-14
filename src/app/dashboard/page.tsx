"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame,
  Target,
  Trophy,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Bookmark,
  RotateCcw,
  Code2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProblems, mockUsers, mockDailyChallenge, topicLabels } from "@/lib/mock-data";

const user = mockUsers[0];

const recentActivity = [
  { problem: mockProblems[0], status: "solved", date: "2 hours ago" },
  { problem: mockProblems[3], status: "attempted", date: "Yesterday" },
  { problem: mockProblems[1], status: "solved", date: "2 days ago" },
  { problem: mockProblems[7], status: "attempted", date: "3 days ago" },
  { problem: mockProblems[2], status: "solved", date: "4 days ago" },
];

const bookmarkedProblems = mockProblems.slice(4, 8);

const topicProgress = [
  { topic: "arrays", solved: 45, total: 80 },
  { topic: "strings", solved: 32, total: 60 },
  { topic: "trees", solved: 18, total: 45 },
  { topic: "dynamic-programming", solved: 12, total: 50 },
  { topic: "graphs", solved: 8, total: 40 },
  { topic: "linked-lists", solved: 15, total: 25 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const totalProblems = 500;
  const easyTotal = 200;
  const mediumTotal = 200;
  const hardTotal = 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Track your progress and keep up the momentum</p>
          </div>
          <Link href="/problems">
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Code2 className="h-4 w-4" />
              Practice Now
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {((user.totalSolved / totalProblems) * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{user.totalSolved}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
                <Progress
                  value={(user.totalSolved / totalProblems) * 100}
                  className="mt-3 h-1.5"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-border/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/20">
                    <Flame className="h-5 w-5 text-amber-500" />
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs">
                    On Fire!
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{user.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
                <div className="mt-3 flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < user.streak % 7 ? "bg-amber-500" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-green-500/10">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">78%</div>
                <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                <div className="mt-3 text-xs text-green-600 dark:text-green-400">
                  +5% from last week
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10">
                    <Trophy className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">#42</div>
                <div className="text-sm text-muted-foreground">Global Ranking</div>
                <div className="mt-3 text-xs text-purple-600 dark:text-purple-400">
                  Top 5% of users
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Progress by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium">Easy</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {user.easySolved} / {easyTotal}
                      </span>
                    </div>
                    <Progress
                      value={(user.easySolved / easyTotal) * 100}
                      className="h-2 bg-green-500/20"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <span className="text-sm font-medium">Medium</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {user.mediumSolved} / {mediumTotal}
                      </span>
                    </div>
                    <Progress
                      value={(user.mediumSolved / mediumTotal) * 100}
                      className="h-2 bg-amber-500/20"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-sm font-medium">Hard</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {user.hardSolved} / {hardTotal}
                      </span>
                    </div>
                    <Progress
                      value={(user.hardSolved / hardTotal) * 100}
                      className="h-2 bg-red-500/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Daily Challenge
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {mockDailyChallenge.problem && (
                  <div className="space-y-4">
                    <div>
                      <Link
                        href={`/problems/${mockDailyChallenge.problem.slug}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {mockDailyChallenge.problem.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            mockDailyChallenge.problem.difficulty === "easy"
                              ? "bg-difficulty-easy text-green-600 dark:text-green-400"
                              : mockDailyChallenge.problem.difficulty === "medium"
                              ? "bg-difficulty-medium text-amber-600 dark:text-amber-400"
                              : "bg-difficulty-hard text-red-600 dark:text-red-400"
                          }`}
                        >
                          {mockDailyChallenge.problem.difficulty.charAt(0).toUpperCase() +
                            mockDailyChallenge.problem.difficulty.slice(1)}
                        </Badge>
                        {mockDailyChallenge.problem.topics.slice(0, 1).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topicLabels[topic]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link href={`/problems/${mockDailyChallenge.problem.slug}`}>
                      <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                        Solve Challenge
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Topic Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicProgress.map((item) => (
                    <div key={item.topic}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{topicLabels[item.topic]}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.solved} / {item.total}
                        </span>
                      </div>
                      <Progress
                        value={(item.solved / item.total) * 100}
                        className="h-1.5"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <Link
                      key={index}
                      href={`/problems/${activity.problem.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {activity.status === "solved" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-amber-500" />
                        )}
                        <div>
                          <div className="font-medium text-sm">{activity.problem.title}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          activity.problem.difficulty === "easy"
                            ? "bg-difficulty-easy text-green-600 dark:text-green-400"
                            : activity.problem.difficulty === "medium"
                            ? "bg-difficulty-medium text-amber-600 dark:text-amber-400"
                            : "bg-difficulty-hard text-red-600 dark:text-red-400"
                        }`}
                      >
                        {activity.problem.difficulty.charAt(0).toUpperCase() +
                          activity.problem.difficulty.slice(1)}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mt-6"
        >
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Bookmarked Problems
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {bookmarkedProblems.map((problem) => (
                  <Link key={problem.id} href={`/problems/${problem.slug}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                          {problem.id}
                        </div>
                        <span className="font-medium text-sm">{problem.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            problem.difficulty === "easy"
                              ? "bg-difficulty-easy text-green-600 dark:text-green-400"
                              : problem.difficulty === "medium"
                              ? "bg-difficulty-medium text-amber-600 dark:text-amber-400"
                              : "bg-difficulty-hard text-red-600 dark:text-red-400"
                          }`}
                        >
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
