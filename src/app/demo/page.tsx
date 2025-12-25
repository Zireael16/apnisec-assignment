import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center shadow-2xl">
        <div className="mb-6 text-6xl">🚧</div>
        
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
          Demo Mode
        </h1>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          You have clicked a feature that simulates a real-world integration (like Sales CRM, Report Generation, or External Payment Gateways). 
          <br /><br />
          In a production environment, this would redirect to the actual ApniSec corporate tools.
        </p>

        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all"
          >
            Back Home
          </Link>
          <Link 
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold transition-all"
          >
            Try Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}