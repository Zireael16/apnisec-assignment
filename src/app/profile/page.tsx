"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setUser(data);
      setNewName(data.name);
    } catch (err) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setIsEditing(false);
    fetchProfile(); // Refresh data
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-[#050505] text-[#00ffa3]">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xl font-bold tracking-wide hover:text-[#00ffa3] transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-900 to-[#00ffa3]/20" />
          
          <div className="px-8 pb-8">
            {/* Avatar / Initials */}
            <div className="relative -mt-12 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#111] bg-[#00ffa3] text-3xl font-bold text-black shadow-lg">
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-gray-400">{user?.email}</p>
              <div className="mt-2 inline-block rounded bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00ffa3]">
                {user?.role} Account
              </div>
            </div>

            {/* Profile Details Form */}
            <div className="space-y-6 border-t border-white/10 pt-6">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                   <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">Edit Full Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full rounded border border-white/10 bg-[#050505] p-3 text-white focus:border-[#00ffa3] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 rounded bg-[#00ffa3] py-2 font-bold text-black">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 rounded border border-white/10 py-2 text-gray-400">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                   <div className="rounded bg-[#050505] p-4">
                      <span className="block text-xs text-gray-500">User ID</span>
                      <span className="font-mono text-sm text-gray-300">{user?.id}</span>
                   </div>
                   <div className="rounded bg-[#050505] p-4">
                      <span className="block text-xs text-gray-500">Member Since</span>
                      <span className="text-sm text-gray-300">{new Date(user?.createdAt || "").toDateString()}</span>
                   </div>
                   
                   <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full rounded border border-white/10 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                   >
                    Edit Profile
                   </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}