"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileQuestion,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Check,
  X,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockProblems, mockUsers, topicLabels, companyLabels } from "@/lib/mock-data";
import { Difficulty, Topic, Company } from "@/lib/types";

const stats = [
  { label: "Total Problems", value: "500", change: "+12", trend: "up", icon: FileQuestion },
  { label: "Active Users", value: "12,450", change: "+8%", trend: "up", icon: Users },
  { label: "Submissions Today", value: "3,241", change: "+15%", trend: "up", icon: BarChart3 },
  { label: "Pending Reviews", value: "23", change: "-5", trend: "down", icon: AlertCircle },
];

const topFailedProblems = [
  { id: "8", title: "Trapping Rain Water", failRate: 41.1 },
  { id: "10", title: "Median of Two Sorted Arrays", failRate: 36.4 },
  { id: "9", title: "Word Search II", failRate: 37.8 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    difficulty: "easy" as Difficulty,
    topics: [] as string[],
    description: "",
  });

  const filteredProblems = mockProblems.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage problems, users, and analytics</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="h-4 w-4" />
                Add Problem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Problem</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter problem title"
                    value={newProblem.title}
                    onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select
                      value={newProblem.difficulty}
                      onValueChange={(v) =>
                        setNewProblem({ ...newProblem, difficulty: v as Difficulty })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Topics</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topics" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(topicLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Problem Description</Label>
                  <Textarea
                    placeholder="Enter problem description..."
                    rows={6}
                    value={newProblem.description}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-primary to-accent"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Add Problem
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="problems" className="gap-2">
              <FileQuestion className="h-4 w-4" />
              Problems
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-primary/10">
                          <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            stat.trend === "up" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Most Failed Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topFailedProblems.map((problem) => (
                      <div
                        key={problem.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 text-sm font-medium">
                            {problem.id}
                          </div>
                          <span className="font-medium text-sm">{problem.title}</span>
                        </div>
                        <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                          {problem.failRate}% fail rate
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">New problem approved</div>
                        <div className="text-xs text-muted-foreground">Two Sum II was approved</div>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">New user registered</div>
                        <div className="text-xs text-muted-foreground">john@example.com joined</div>
                      </div>
                      <span className="text-xs text-muted-foreground">4h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Problem flagged</div>
                        <div className="text-xs text-muted-foreground">
                          Users reported incorrect test case
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">6h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="problems">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">All Problems</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Topics</TableHead>
                      <TableHead className="text-right">Acceptance</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProblems.map((problem) => (
                      <TableRow key={problem.id}>
                        <TableCell className="font-medium">{problem.id}</TableCell>
                        <TableCell>{problem.title}</TableCell>
                        <TableCell>
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
                            {problem.difficulty.charAt(0).toUpperCase() +
                              problem.difficulty.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {problem.topics.slice(0, 2).map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topicLabels[topic]}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {problem.acceptance.toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">All Users</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-10 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Problems Solved</TableHead>
                      <TableHead className="text-right">Streak</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.role === "admin" ? "default" : "secondary"}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{user.totalSolved}</TableCell>
                        <TableCell className="text-right">{user.streak}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Submissions by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Easy</span>
                        <span className="text-sm text-muted-foreground">45,230</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-green-500 w-[65%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Medium</span>
                        <span className="text-sm text-muted-foreground">32,150</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-amber-500 w-[45%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Hard</span>
                        <span className="text-sm text-muted-foreground">12,890</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-red-500 w-[25%]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Most Attempted Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { topic: "Arrays", count: 28450, percent: 85 },
                      { topic: "Strings", count: 21230, percent: 70 },
                      { topic: "Trees", count: 15670, percent: 55 },
                      { topic: "Dynamic Programming", count: 12340, percent: 45 },
                      { topic: "Graphs", count: 9870, percent: 35 },
                    ].map((item) => (
                      <div key={item.topic}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{item.topic}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.count.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
