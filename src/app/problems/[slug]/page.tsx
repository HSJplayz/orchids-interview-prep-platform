"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Send,
  Lightbulb,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  ChevronDown,
  Check,
  X,
  Clock,
  MemoryStick,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { mockProblems, topicLabels, companyLabels } from "@/lib/mock-data";
import { Language } from "@/lib/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const languageOptions: { value: Language; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export default function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const problem = mockProblems.find((p) => p.slug === slug);
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(problem?.starterCode.python || "");
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
          <Link href="/problems">
            <Button>Back to Problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(problem.starterCode[newLanguage]);
  };

  const revealHint = (index: number) => {
    if (!hintsRevealed.includes(index)) {
      setHintsRevealed([...hintsRevealed, index]);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTestResults([
      { passed: true, output: "Test case 1 passed" },
      { passed: true, output: "Test case 2 passed" },
      { passed: Math.random() > 0.3, output: Math.random() > 0.3 ? "Test case 3 passed" : "Wrong answer" },
    ]);
    setIsRunning(false);
  };

  const submitCode = async () => {
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTestResults([
      { passed: true, output: "All test cases passed!" },
    ]);
    setIsRunning(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <Link href="/problems">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Problems
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{problem.id}.</span>
            <h1 className="font-semibold">{problem.title}</h1>
            <Badge
              variant="secondary"
              className={`${
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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{problem.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsDown className="h-4 w-4" />
            <span>{problem.dislikes}</span>
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="h-full flex flex-col bg-background">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 h-auto py-0">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="hints"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-3"
                >
                  Hints
                </TabsTrigger>
                <TabsTrigger
                  value="solution"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 pt-3"
                >
                  Solution
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto">
                <TabsContent value="description" className="p-6 m-0 h-full">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {problem.description}
                    </div>

                    <div className="mt-8 space-y-6">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-4">
                          <div className="font-medium mb-2">Example {index + 1}:</div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Input: </span>
                              <code className="bg-muted px-1.5 py-0.5 rounded">{example.input}</code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Output: </span>
                              <code className="bg-muted px-1.5 py-0.5 rounded">{example.output}</code>
                            </div>
                            {example.explanation && (
                              <div className="text-muted-foreground">
                                <span>Explanation: </span>
                                {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <div className="font-medium mb-3">Constraints:</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index}>
                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {problem.topics.map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topicLabels[topic]}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {problem.companies.map((company) => (
                        <Badge key={company} variant="secondary" className="text-xs">
                          {companyLabels[company]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hints" className="p-6 m-0">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-6">
                      Click to reveal hints one at a time. Try to solve the problem before looking at hints!
                    </p>
                    {problem.hints.map((hint, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-border overflow-hidden"
                      >
                        {hintsRevealed.includes(index) ? (
                          <div className="p-4 bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="h-4 w-4 text-amber-500" />
                              <span className="font-medium text-sm">Hint {index + 1}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{hint}</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => revealHint(index)}
                            className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">Hint {index + 1}</span>
                              </div>
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="p-6 m-0">
                  {showSolution ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Explanation</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {problem.solutionExplanation}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Solution Code</h3>
                          <Select
                            value={language}
                            onValueChange={(v) => setLanguage(v as Language)}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {languageOptions.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language={language === "cpp" ? "cpp" : language}
                            style={oneDark}
                            customStyle={{
                              margin: 0,
                              padding: "1rem",
                              fontSize: "0.875rem",
                              borderRadius: "0.5rem",
                            }}
                          >
                            {problem.solution[language]}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Solution Hidden</h3>
                      <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                        Try solving the problem first! The solution will be available after you submit
                        or if you choose to reveal it.
                      </p>
                      <Button onClick={() => setShowSolution(true)} variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Reveal Solution
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55} minSize={40}>
          <div className="h-full flex flex-col bg-card">
            <div className="border-b border-border px-4 py-2 flex items-center justify-between">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-36 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="border-t border-border">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm">Test Cases</h3>
                  {testResults && (
                    <div className="flex items-center gap-2 text-sm">
                      {testResults.every((r) => r.passed) ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">All tests passed!</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-red-500">Some tests failed</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {testResults && (
                  <div className="space-y-2 mb-4 max-h-32 overflow-auto">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`text-sm px-3 py-2 rounded-lg ${
                          result.passed
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {result.output}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={submitCode}
                    disabled={isRunning}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isRunning ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
