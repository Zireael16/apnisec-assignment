"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Issue {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("CLOUD_SECURITY");

  const router = useRouter();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch("/api/issues");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: desc, type }),
    });
    setShowModal(false);
    setTitle("");
    setDesc("");
    fetchIssues();
  };

  // --- Delete Issue ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this issue?")) return;
    await fetch(`/api/issues?id=${id}`, { method: "DELETE" });
    fetchIssues();
  };

  // --- Toggle Status ---
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "OPEN" ? "CLOSED" : "OPEN";
    await fetch(`/api/issues?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchIssues();
  };

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] text-[#00ffa3]">
        Loading Secure Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ffa3] selection:text-black">
      {/* --- UPDATED NAVBAR --- */}
      <nav className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-[#00ffa3]"></div>
            <span className="text-xl font-bold tracking-wide">Dashboard</span>
          </div>

          {/* Center: Navigation Links (Added) */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/demo" className="hover:text-white transition-colors">vCISO</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Cloud Security</Link>
            <Link href="/demo" className="hover:text-white transition-colors">VAPT</Link>
          </div>

          {/* Right Side: Profile & Logout */}
          <div className="flex items-center gap-6">
            <Link
              href="/profile"
              className="text-sm font-medium text-gray-400 hover:text-[#00ffa3] transition-colors"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Security Issues</h1>
            <p className="mt-1 text-gray-400">
              Manage your vulnerability assessments
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded bg-[#00ffa3] px-6 py-2.5 font-bold text-black shadow-[0_0_15px_rgba(0,255,163,0.4)] transition-transform hover:scale-105"
          >
            + Report New Issue
          </button>
        </div>

        {issues.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0a0a0a]">
            <p className="text-gray-500">No issues reported yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#111] p-6 transition-all hover:border-[#00ffa3]/50"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                        issue.type === "CLOUD_SECURITY"
                          ? "bg-blue-500/10 text-blue-400"
                          : issue.type === "VAPT"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {issue.type.replace("_", " ")}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        issue.status === "OPEN"
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-[#00ffa3]">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {issue.description}
                  </p>
                </div>

                {/* --- ACTION BUTTONS --- */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-gray-600 font-mono">
                    ID: {issue.id.slice(0, 8)}...
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(issue.id, issue.status)}
                      className={`rounded px-3 py-1 text-xs font-bold transition-colors ${
                        issue.status === "OPEN"
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      }`}
                    >
                      {issue.status === "OPEN" ? "Close Issue" : "Re-open"}
                    </button>

                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="rounded bg-white/5 px-3 py-1 text-xs font-bold text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- CREATE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Report Security Issue
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border border-white/10 bg-[#050505] p-3 text-white focus:border-[#00ffa3] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">
                  Issue Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded border border-white/10 bg-[#050505] p-3 text-white focus:border-[#00ffa3] focus:outline-none"
                >
                  <option value="CLOUD_SECURITY">Cloud Security</option>
                  <option value="VAPT">VAPT</option>
                  <option value="RETEAM_ASSESSMENT">Reteam Assessment</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="h-32 w-full rounded border border-white/10 bg-[#050505] p-3 text-white focus:border-[#00ffa3] focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded border border-white/10 py-3 font-medium text-gray-400 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded bg-[#00ffa3] py-3 font-bold text-black hover:bg-[#00ffa3]/90"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}