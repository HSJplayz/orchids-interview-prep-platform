"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  Target,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaderboard } from "@/lib/mock-data";

const extendedLeaderboard = [
  ...mockLeaderboard,
  ...Array.from({ length: 15 }, (_, i) => ({
    rank: i + 6,
    user: {
      id: `${i + 8}`,
      email: `user${i + 8}@example.com`,
      name: [
        "Frank Miller",
        "Grace Lee",
        "Henry Wilson",
        "Ivy Chen",
        "Jack Brown",
        "Karen White",
        "Leo Martinez",
        "Mia Taylor",
        "Noah Anderson",
        "Olivia Thomas",
        "Peter Jackson",
        "Quinn Roberts",
        "Ryan Garcia",
        "Sophia Johnson",
        "Tyler Williams",
      ][i],
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=100&h=100&fit=crop`,
      role: "user" as const,
      createdAt: new Date(),
      streak: Math.floor(Math.random() * 30),
      totalSolved: 200 - i * 10,
      easySolved: 80 - i * 4,
      mediumSolved: 90 - i * 4,
      hardSolved: 30 - i * 2,
    },
    score: 2000 - i * 100,
    problemsSolved: 200 - i * 10,
    streak: Math.floor(Math.random() * 30),
  })),
];

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState("all-time");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-600" />;
    return null;
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30";
    if (rank === 2) return "bg-gradient-to-r from-slate-400/20 to-gray-400/20 border-slate-400/30";
    if (rank === 3) return "bg-gradient-to-r from-orange-600/20 to-amber-600/20 border-orange-600/30";
    return "bg-card border-border/50";
  };

  const top3 = extendedLeaderboard.slice(0, 3);
  const rest = extendedLeaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            See how you rank against other developers. Climb the ladder by solving more problems!
          </p>
        </div>

        <Tabs defaultValue="all-time" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[top3[1], top3[0], top3[2]].map((entry, displayIndex) => {
            const isFirst = displayIndex === 1;
            return (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: displayIndex * 0.1 }}
                className={`${isFirst ? "md:-mt-8" : ""}`}
              >
                <Card className={`text-center border ${getRankBackground(entry.rank)} overflow-hidden`}>
                  <CardContent className="pt-8 pb-6">
                    <div className="relative inline-block mb-4">
                      <Avatar className={`${isFirst ? "h-24 w-24" : "h-20 w-20"} border-4 border-background`}>
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback className="text-xl">
                          {entry.user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                          entry.rank === 1
                            ? "bg-amber-500 text-white"
                            : entry.rank === 2
                            ? "bg-slate-400 text-white"
                            : "bg-orange-600 text-white"
                        }`}
                      >
                        {entry.rank}
                      </div>
                    </div>

                    <div className="mb-1 flex items-center justify-center gap-2">
                      {getRankIcon(entry.rank)}
                      <h3 className="font-semibold text-lg">{entry.user.name}</h3>
                    </div>

                    <div className="text-3xl font-bold text-primary mb-2">{entry.score}</div>
                    <div className="text-sm text-muted-foreground">points</div>

                    <div className="mt-4 flex justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{entry.problemsSolved} solved</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        <span>{entry.streak} streak</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="border-border/50">
          <CardHeader className="border-b border-border/50">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">User</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-2 text-center hidden sm:block">Solved</div>
              <div className="col-span-2 text-center hidden sm:block">Streak</div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {rest.map((entry, index) => (
                <motion.div
                  key={entry.user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors items-center"
                >
                  <div className="col-span-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {entry.rank}
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback>
                        {entry.user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{entry.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.user.totalSolved} problems
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-semibold text-primary">{entry.score}</span>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <div className="flex items-center justify-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{entry.problemsSolved}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <div className="flex items-center justify-center gap-1">
                      <Flame className="h-4 w-4 text-amber-500" />
                      <span>{entry.streak}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 inline-block">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={mockLeaderboard[0].user.avatar} />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Your Ranking</div>
                  <div className="font-bold text-2xl">#42</div>
                </div>
                <div className="pl-4 border-l border-border">
                  <div className="text-sm text-muted-foreground">Your Score</div>
                  <div className="font-bold text-2xl text-primary">1,270</div>
                </div>
                <div className="pl-4 border-l border-border">
                  <div className="flex items-center gap-1 text-green-500">
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+5 ranks this week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
