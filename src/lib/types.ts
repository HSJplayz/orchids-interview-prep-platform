export type Difficulty = "easy" | "medium" | "hard";

export type Topic =
  | "arrays"
  | "strings"
  | "linked-lists"
  | "trees"
  | "graphs"
  | "dynamic-programming"
  | "greedy"
  | "recursion"
  | "bit-manipulation"
  | "sorting"
  | "searching"
  | "hash-tables"
  | "stacks"
  | "queues"
  | "heaps";

export type Company =
  | "google"
  | "amazon"
  | "microsoft"
  | "meta"
  | "apple"
  | "netflix"
  | "uber"
  | "airbnb"
  | "linkedin"
  | "twitter";

export type ProblemStatus = "solved" | "attempted" | "revisit" | "skipped" | "unsolved";

export type Language = "python" | "javascript" | "java" | "cpp";

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: Topic[];
  companies: Company[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
  starterCode: Record<Language, string>;
  solution: Record<Language, string>;
  solutionExplanation: string;
  testCases: TestCase[];
  acceptance: number;
  submissions: number;
  likes: number;
  dislikes: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  streak: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  language: Language;
  code: string;
  status: "accepted" | "wrong-answer" | "runtime-error" | "time-limit-exceeded";
  runtime?: number;
  memory?: number;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  problemId: string;
  status: ProblemStatus;
  bookmarked: boolean;
  lastAttemptedAt?: Date;
  solvedAt?: Date;
  hintsUsed: number;
}

export interface DailyChallenge {
  id: string;
  problemId: string;
  date: Date;
  problem?: Problem;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  problemsSolved: number;
  streak: number;
}