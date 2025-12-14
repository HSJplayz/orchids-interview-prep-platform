"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Zap, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AmbientBackground } from "@/components/ambient-background";
import { LoginCharacter } from "@/components/login-character";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [characterState, setCharacterState] = useState<"idle" | "typing" | "hiding" | "torch" | "success" | "error">("idle");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (showPassword) {
      setCharacterState("torch");
    } else if (hasError) {
      setCharacterState("error");
    } else if (password.length > 0 || email.length > 0) {
      setCharacterState("typing");
    } else {
      setCharacterState("idle");
    }
  }, [showPassword, password, email, hasError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setHasError(true);
      setCharacterState("error");
      setTimeout(() => setHasError(false), 2000);
      return;
    }
    
    setCharacterState("success");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <AmbientBackground paused={isInputFocused} />
      
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-accent/20 relative overflow-hidden items-center justify-center"
        animate={{
          backgroundColor: showPassword
            ? "rgba(15, 23, 42, 0.95)"
            : "rgba(248, 250, 252, 0.5)",
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <AnimatePresence>
          {showPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/50 to-slate-900"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 20%, rgba(15, 23, 42, 0.9) 60%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2.5 mb-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Code<span className="text-primary">Prep</span>
              </span>
            </Link>

            <div className="flex flex-col items-center mb-8">
              <LoginCharacter state={characterState} />
            </div>

            <motion.h1
              className="text-4xl font-bold mb-4"
              animate={{
                color: showPassword ? "#F1F5F9" : "#0F172A",
              }}
              transition={{ duration: 0.3 }}
            >
              Level up your
              <br />
              <span className="gradient-text">coding skills</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-md"
              animate={{
                color: showPassword ? "#CBD5E1" : "#64748B",
              }}
              transition={{ duration: 0.3 }}
            >
              Practice data structures and algorithms with our curated collection of interview
              questions from top tech companies.
            </motion.p>

            <div className="mt-12 space-y-4">
              {["500+ curated problems", "Company-specific preparation", "Track your progress"].map(
                (text, i) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <motion.span
                      animate={{
                        color: showPassword ? "#F1F5F9" : "#0F172A",
                      }}
                    >
                      {text}
                    </motion.span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Code<span className="text-primary">Prep</span>
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to continue your practice</p>
          </div>

          <div className="space-y-4 mb-6">
            <Button
              variant="outline"
              className="w-full gap-2 button-ripple hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              size="lg"
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 button-ripple hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              size="lg"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              className="space-y-2"
              animate={hasError && !email ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              animate={hasError && !password ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </motion.button>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 button-ripple shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
