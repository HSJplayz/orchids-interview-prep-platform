"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Award,
  Star,
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

const activityData = Array.from({ length: 12 }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    const rand = Math.random();
    return rand > 0.7 ? 0 : rand > 0.4 ? Math.floor(rand * 5) + 1 : Math.floor(rand * 10) + 5;
  })
);

const getActivityColor = (count: number) => {
  if (count === 0) return "bg-slate-100";
  if (count < 3) return "bg-emerald-200";
  if (count < 7) return "bg-emerald-400";
  return "bg-emerald-600";
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const totalProblems = 500;
  const easyTotal = 200;
  const mediumTotal = 200;
  const hardTotal = 100;

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground text-lg">Track your progress and keep up the momentum 🚀</p>
          </div>
          <Link href="/problems">
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-500/30 button-ripple h-11 px-6">
              <Code2 className="h-5 w-5" />
              Practice Now
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 card-hover bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-100">
                    <Target className="h-6 w-6 text-indigo-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold bg-indigo-50 text-indigo-700 border-indigo-200">
                    {((user.totalSolved / totalProblems) * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-slate-900">{user.totalSolved}</div>
                <div className="text-sm text-muted-foreground font-medium">Problems Solved</div>
                <Progress
                  value={(user.totalSolved / totalProblems) * 100}
                  className="mt-4 h-2 bg-slate-100"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-200 card-hover bg-gradient-to-br from-amber-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <Flame className="h-6 w-6 text-amber-600 animate-pulse-subtle" />
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs font-semibold">
                    On Fire! 🔥
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-slate-900">{user.streak}</div>
                <div className="text-sm text-muted-foreground font-medium">Day Streak</div>
                <div className="mt-4 flex gap-1.5">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                      className={`h-2 flex-1 rounded-full ${
                        i < user.streak % 7 ? "bg-amber-500" : "bg-slate-200"
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
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 card-hover bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1 text-slate-900">78%</div>
                <div className="text-sm text-muted-foreground font-medium">Acceptance Rate</div>
                <div className="mt-4 text-sm text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +5% from last week
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 card-hover bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1 text-slate-900">#42</div>
                <div className="text-sm text-muted-foreground font-medium">Global Ranking</div>
                <div className="mt-4 text-sm text-purple-600 font-medium flex items-center gap-1">
                  <Award className="h-4 w-4" />
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
            transition={{ duration: 0.3, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Progress by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-7">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-slate-900">Easy</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {user.easySolved} / {easyTotal}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-3 w-full rounded-full bg-emerald-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.easySolved / easyTotal) * 100}%` }}
                          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-amber-500" />
                        <span className="text-sm font-semibold text-slate-900">Medium</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {user.mediumSolved} / {mediumTotal}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-3 w-full rounded-full bg-amber-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.mediumSolved / mediumTotal) * 100}%` }}
                          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-red-500" />
                        <span className="text-sm font-semibold text-slate-900">Hard</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {user.hardSolved} / {hardTotal}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-3 w-full rounded-full bg-red-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.hardSolved / hardTotal) * 100}%` }}
                          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Card className="border border-indigo-200/60 shadow-sm bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 font-semibold text-slate-900">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    Daily Challenge
                  </CardTitle>
                  <Badge variant="outline" className="text-xs font-medium border-indigo-200 text-indigo-700">
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
                        className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {mockDailyChallenge.problem.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            mockDailyChallenge.problem.difficulty === "easy"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : mockDailyChallenge.problem.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {mockDailyChallenge.problem.difficulty.charAt(0).toUpperCase() +
                            mockDailyChallenge.problem.difficulty.slice(1)}
                        </Badge>
                        {mockDailyChallenge.problem.topics.slice(0, 1).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs font-medium border-slate-200">
                            {topicLabels[topic]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link href={`/problems/${mockDailyChallenge.problem.slug}`}>
                      <Button className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-500/20 button-ripple">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="mb-8"
        >
          <Card className="border border-slate-200/60 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Activity Heatmap
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Your coding activity over the past 12 weeks</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-2">
                <div className="inline-flex flex-col gap-1.5">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, dayIndex) => (
                    <div key={day} className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground w-8">{day}</span>
                      <div className="flex gap-1.5">
                        {activityData.map((week, weekIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + (weekIndex * 7 + dayIndex) * 0.01 }}
                            className={`w-3 h-3 rounded-sm ${getActivityColor(
                              week[dayIndex]
                            )} hover:ring-2 hover:ring-indigo-300 transition-all cursor-pointer`}
                            title={`${week[dayIndex]} problems solved`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-slate-100" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-200" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-600" />
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <Card className="border border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Topic Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {topicProgress.map((item, index) => (
                    <motion.div
                      key={item.topic}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{topicLabels[item.topic]}</span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {item.solved} / {item.total}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.solved / item.total) * 100}%` }}
                          transition={{ delay: 1 + index * 0.05, duration: 0.6, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <Card className="border border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs hover:text-indigo-600">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.05 }}
                    >
                      <Link
                        href={`/problems/${activity.problem.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all duration-150 group"
                      >
                        <div className="flex items-center gap-3">
                          {activity.status === "solved" ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-amber-500" />
                          )}
                          <div>
                            <div className="font-medium text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {activity.problem.title}
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.date}</div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${
                            activity.problem.difficulty === "easy"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : activity.problem.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {activity.problem.difficulty.charAt(0).toUpperCase() +
                            activity.problem.difficulty.slice(1)}
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-6"
        >
          <Card className="border border-slate-200/60 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2 font-semibold text-slate-900">
                  <Bookmark className="h-5 w-5 text-indigo-600" />
                  Bookmarked Problems
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs hover:text-indigo-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {bookmarkedProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                  >
                    <Link href={`/problems/${problem.slug}`}>
                      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all duration-150 group">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-sm font-semibold text-indigo-700">
                            {problem.id}
                          </div>
                          <span className="font-medium text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {problem.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              problem.difficulty === "easy"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : problem.difficulty === "medium"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }`}
                          >
                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}