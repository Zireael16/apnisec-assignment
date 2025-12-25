import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApniSec - #1 Cyber Security & VAPT Services",
  description: "Elevate your security posture with ApniSec. Trusted by 100+ organizations for Cloud Security and Vulnerability Assessments.",
};

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ffa3] selection:text-black font-sans">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-[#00ffa3] to-emerald-600"></div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide text-white">
                apni sec
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">
                Security as a Service
              </span>
            </div>
          </div>

          {/* Nav Links (Hidden on Mobile for simplicity) */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#" className="text-sm font-medium text-[#00ffa3]">
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              vCISO
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Cloud Security
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              VAPT
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white hover:text-[#00ffa3]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded border border-[#00ffa3] px-4 py-2 text-sm font-medium text-[#00ffa3] transition-colors hover:bg-[#00ffa3] hover:text-black"
            >
              Secure Now
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        {/* Grid Background Effect */}
        <div className="bg-grid-white absolute inset-0 opacity-20" />
        {/* Radial Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-5xl font-light leading-tight tracking-tight text-white md:text-7xl">
            Defend Against <span className="text-[#00ffa3]">Cyber Threats</span>
            <br />
            Before They Strike
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Elevate Your Security Posture With Advanced Security Solutions And
            In-Depth Vulnerability Assessments, Aligned With The Trusted
            Frameworks Of OWASP, NIST, SANS, CERT, And NIC.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative overflow-hidden rounded border border-[#00ffa3] px-8 py-3 text-[#00ffa3] transition-all hover:bg-[#00ffa3]/10">
              <span className="relative z-10 font-medium">Download Free Report</span>
            </button>
            <button className="rounded bg-[#00ffa3] px-8 py-3 font-bold text-black shadow-[0_0_20px_rgba(0,255,163,0.4)] transition-transform hover:scale-105">
              Get Quote
            </button>
          </div>

          {/* Trusted By Logos (Simulated) */}
          <div className="mt-20">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
              100+ Organizations Secured
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0">
               {/* Just text placeholders for now to keep it clean */}
               {['Flipkart', 'Atlassian', 'Licious', 'Mastercard', 'Government of India'].map((logo) => (
                  <span key={logo} className="text-xl font-bold text-white/40">{logo}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Our <span className="text-[#00ffa3]">Services</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Comprehensive security solutions for your digital infrastructure
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Cloud Security",
                desc: "Secure your AWS, Azure, and Google Cloud infrastructure with real-time monitoring.",
                icon: "☁️",
              },
              {
                title: "Reteam Assessment",
                desc: "Simulate real-world cyber attacks to find vulnerabilities before hackers do.",
                icon: "🛡️",
              },
              {
                title: "VAPT",
                desc: "Vulnerability Assessment and Penetration Testing for web and mobile apps.",
                icon: "🔍",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group rounded-xl border border-white/10 bg-[#111] p-8 transition-all hover:border-[#00ffa3]/50 hover:bg-[#151515]"
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#00ffa3]">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 bg-[#00ffa3] rounded"></div>
                <span className="text-xl font-bold">apni sec</span>
              </div>
              <p className="max-w-xs text-sm text-gray-500">
                Leading the way in cybersecurity solutions. protecting your digital assets 24/7.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="mb-4 font-bold text-white">Company</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-bold text-white">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-gray-600">
            © 2025 ApniSec. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}