"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute -right-[10%] bottom-[20%] h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your security dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-3 font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
            Register for access
          </Link>
        </div>
      </div>
    </div>
  );
}