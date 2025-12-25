"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to login after success
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
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
        <div className="absolute -left-[10%] top-[20%] h-72 w-72 rounded-full bg-[#00ffa3]/5 blur-[100px]" />
        <div className="absolute -right-[10%] bottom-[20%] h-72 w-72 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Join ApniSec for enterprise-grade security
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-500 transition-all focus:border-[#00ffa3] focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-500 transition-all focus:border-[#00ffa3] focus:outline-none"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-500 transition-all focus:border-[#00ffa3] focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#00ffa3] p-3 font-bold text-black shadow-lg transition-all hover:bg-[#00ffa3]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#00ffa3] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}