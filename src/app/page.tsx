"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Zap,
  Trophy,
  Target,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProblems, mockLeaderboard, topicLabels } from "@/lib/mock-data";

const stats = [
  { label: "Problems", value: "500+", icon: Code2 },
  { label: "Users", value: "50K+", icon: Users },
  { label: "Companies", value: "100+", icon: Building2 },
  { label: "Success Rate", value: "89%", icon: TrendingUp },
];

const features = [
  {
    icon: Target,
    title: "Topic-Focused Practice",
    description: "Master arrays, trees, graphs, dynamic programming, and more with curated problem sets.",
  },
  {
    icon: Zap,
    title: "Company-Specific Prep",
    description: "Practice questions frequently asked at Google, Amazon, Meta, and other top companies.",
  },
  {
    icon: BookOpen,
    title: "Step-by-Step Hints",
    description: "Get progressive hints to guide your thinking without spoiling the solution.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description: "Visualize your improvement with detailed analytics and streak tracking.",
  },
];

const companies = ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Netflix"];

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Now with AI-powered hints
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Master Data Structures
              <br />
              <span className="gradient-text">Ace Your Interviews</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10">
              Practice interview questions from top tech companies. Build problem-solving skills 
              with our curated collection of data structure and algorithm challenges.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/problems">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base px-8">
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose CodePrep?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to prepare for technical interviews at top tech companies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Popular Problems
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start with these frequently asked interview questions
            </p>
          </motion.div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {mockProblems.slice(0, 5).map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/problems/${problem.slug}`}>
                  <div className="group p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                        {problem.id}
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {problem.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
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
                          {problem.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topicLabels[topic]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium">{problem.acceptance.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Acceptance</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/problems">
              <Button variant="outline" size="lg" className="gap-2">
                View All Problems
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Practice for Top Companies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our problems are tagged with companies that have asked them in interviews
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-8 py-4 rounded-xl bg-card border border-border/50 text-lg font-medium hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Leaderboard
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how you stack up against other developers
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {mockLeaderboard.slice(0, 5).map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl mb-3 ${
                  index === 0
                    ? "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
                    : index === 1
                    ? "bg-gradient-to-r from-slate-400/10 to-gray-400/10 border border-slate-400/20"
                    : index === 2
                    ? "bg-gradient-to-r from-orange-600/10 to-amber-600/10 border border-orange-600/20"
                    : "bg-card border border-border/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                    index === 0
                      ? "bg-amber-500 text-white"
                      : index === 1
                      ? "bg-slate-400 text-white"
                      : index === 2
                      ? "bg-orange-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{entry.user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.problemsSolved} problems solved
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{entry.score}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/leaderboard">
              <Button variant="outline" size="lg" className="gap-2">
                View Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Preparing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of developers who have landed their dream jobs at top tech companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/problems">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  Browse Problems
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Code<span className="text-primary">Prep</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/problems" className="hover:text-foreground transition-colors">
                Problems
              </Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                Leaderboard
              </Link>
              <Link href="/admin" className="hover:text-foreground transition-colors">
                Admin
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 CodePrep. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
