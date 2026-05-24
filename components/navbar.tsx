"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, HeartPulse } from "lucide-react"

const navLinks = [
  { label: "Tools",     href: "#calculators" },
  { label: "Habits",    href: "#habits"      },
  { label: "Nutrition", href: "#nutrition"   },
  { label: "Fitness",   href: "#fitness"     },
  { label: "Mind",      href: "#mental"      },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#1c1917]" style={{ fontFamily: "var(--font-poppins)" }}>
              Life <span className="gradient-text">Plus</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-stone-500 hover:text-[#ec4899] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#calculators"
              className="animate-glow px-5 py-2 rounded-full gradient-bg text-white text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-md"
            >
              Explore Tools
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-3 rounded-xl text-stone-500 hover:text-[#ec4899] hover:bg-pink-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-pink-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-stone-500 hover:text-[#ec4899] py-3 transition-colors min-h-[44px] flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#calculators"
                className="mt-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold text-center hover:opacity-90 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Explore Tools
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
