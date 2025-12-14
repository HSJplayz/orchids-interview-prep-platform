"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Bookmark,
  CheckCircle2,
  Circle,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockProblems, topicLabels, companyLabels } from "@/lib/mock-data";
import { Difficulty, Topic, Company } from "@/lib/types";

const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];
const topicOptions = Object.keys(topicLabels) as Topic[];
const companyOptions = Object.keys(companyLabels) as Company[];

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [sortBy, setSortBy] = useState<"id" | "title" | "difficulty" | "acceptance">("id");

  const filteredProblems = useMemo(() => {
    let result = [...mockProblems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.id.includes(query)
      );
    }

    if (selectedDifficulty !== "all") {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedTopics.length > 0) {
      result = result.filter((p) =>
        selectedTopics.some((t) => p.topics.includes(t))
      );
    }

    if (selectedCompanies.length > 0) {
      result = result.filter((p) =>
        selectedCompanies.some((c) => p.companies.includes(c))
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "difficulty":
          const diffOrder = { easy: 0, medium: 1, hard: 2 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "acceptance":
          return b.acceptance - a.acceptance;
        default:
          return parseInt(a.id) - parseInt(b.id);
      }
    });

    return result;
  }, [searchQuery, selectedDifficulty, selectedTopics, selectedCompanies, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
    setSelectedTopics([]);
    setSelectedCompanies([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDifficulty !== "all" ||
    selectedTopics.length > 0 ||
    selectedCompanies.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Problems</h1>
          <p className="text-muted-foreground">
            Practice data structures and algorithms to ace your technical interviews
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems by title or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedDifficulty}
              onValueChange={(value) => setSelectedDifficulty(value as Difficulty | "all")}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Topics
                  {selectedTopics.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {selectedTopics.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-80 overflow-auto">
                {topicOptions.map((topic) => (
                  <DropdownMenuCheckboxItem
                    key={topic}
                    checked={selectedTopics.includes(topic)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTopics([...selectedTopics, topic]);
                      } else {
                        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
                      }
                    }}
                  >
                    {topicLabels[topic]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Companies
                  {selectedCompanies.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {selectedCompanies.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 max-h-80 overflow-auto">
                {companyOptions.map((company) => (
                  <DropdownMenuCheckboxItem
                    key={company}
                    checked={selectedCompanies.includes(company)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCompanies([...selectedCompanies, company]);
                      } else {
                        setSelectedCompanies(selectedCompanies.filter((c) => c !== company));
                      }
                    }}
                  >
                    {companyLabels[company]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Number</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="acceptance">Acceptance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedDifficulty !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDifficulty}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedDifficulty("all")}
                  />
                </Badge>
              )}
              {selectedTopics.map((topic) => (
                <Badge key={topic} variant="secondary" className="gap-1">
                  {topicLabels[topic]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedTopics(selectedTopics.filter((t) => t !== topic))}
                  />
                </Badge>
              ))}
              {selectedCompanies.map((company) => (
                <Badge key={company} variant="secondary" className="gap-1">
                  {companyLabels[company]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCompanies(selectedCompanies.filter((c) => c !== company))}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-xs">
                <RotateCcw className="h-3 w-3" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border overflow-hidden bg-card">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground border-b">
            <div className="col-span-1 hidden sm:block">Status</div>
            <div className="col-span-6 sm:col-span-5">Title</div>
            <div className="col-span-3 sm:col-span-2">Difficulty</div>
            <div className="col-span-3 sm:col-span-2 hidden md:block">Topics</div>
            <div className="col-span-3 sm:col-span-2 text-right">Acceptance</div>
          </div>

          <div className="divide-y divide-border">
            {filteredProblems.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No problems found matching your filters.
              </div>
            ) : (
              filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Link href={`/problems/${problem.slug}`}>
                    <div className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors items-center">
                      <div className="col-span-1 hidden sm:block">
                        <Circle className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                      <div className="col-span-6 sm:col-span-5">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground text-sm">{problem.id}.</span>
                          <span className="font-medium hover:text-primary transition-colors">
                            {problem.title}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
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
                      </div>
                      <div className="col-span-3 sm:col-span-2 hidden md:flex gap-1">
                        {problem.topics.slice(0, 2).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topicLabels[topic]}
                          </Badge>
                        ))}
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right text-sm text-muted-foreground">
                        {problem.acceptance.toFixed(1)}%
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredProblems.length} of {mockProblems.length} problems
        </div>
      </div>
    </div>
  );
}
