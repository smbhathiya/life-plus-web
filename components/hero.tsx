"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Heart,
  Apple,
  Dumbbell,
  Droplets,
  HeartPulse,
  Sun,
  Sparkles,
  Zap,
} from "lucide-react"

const floatingIcons = [
  { icon: Heart,      color: "#ec4899", top: "15%",  left:  "8%",  delay: 0,   size: 28 },
  { icon: Apple,      color: "#be185d", top: "25%",  right: "10%", delay: 0.5, size: 32 },
  { icon: Dumbbell,   color: "#f472b6", bottom:"30%",left:  "5%",  delay: 1,   size: 26 },
  { icon: Droplets,   color: "#ec4899", top: "60%",  right: "8%",  delay: 1.5, size: 30 },
  { icon: HeartPulse, color: "#be185d", top: "10%",  right: "25%", delay: 0.8, size: 24 },
  { icon: Sun,        color: "#f9a8d4", bottom:"20%",right: "20%", delay: 1.2, size: 28 },
  { icon: Sparkles,   color: "#ec4899", bottom:"40%",left:  "15%", delay: 0.3, size: 22 },
  { icon: Zap,        color: "#be185d", top: "40%",  left:  "3%",  delay: 1.8, size: 20 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background photo */}
      <Image src="/images/hero-bg.jpg" fill alt="" className="object-cover" priority />
      {/* Pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8]/88 via-[#fce7f3]/80 to-[#fdf2f8]/85" />

      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pink-200/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-rose-300/25 blur-3xl pointer-events-none" />

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, color, top, left, right, bottom, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none hidden sm:flex"
          style={{ top, left, right, bottom }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: delay + 0.8, duration: 0.5, ease: "backOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center shadow-lg"
          >
            <Icon style={{ color, width: size, height: size }} />
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-16">

        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-6"
          >
            <HeartPulse className="w-3.5 h-3.5" />
            Your Wellness Companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1c1917] leading-tight mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Live Better{" "}
            <span className="gradient-text">Every Day</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Simple tools and healthy lifestyle guidance to help you improve your
            daily life and well-being — one habit at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#calculators"
              className="animate-glow px-8 py-3.5 rounded-full gradient-bg text-white font-semibold text-base shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              Explore Tools
            </a>
            <a
              href="#habits"
              className="px-8 py-3.5 rounded-full border-2 border-[#ec4899] text-[#ec4899] font-semibold text-base hover:bg-pink-50 hover:scale-105 transition-all duration-200"
            >
              Learn Healthy Habits
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-stone-500"
          >
            {[
              { value: "3+",    label: "Health Tools" },
              { value: "6+",    label: "Daily Habits" },
              { value: "100%",  label: "Free"         },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold gradient-text">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            <Image
              src="/images/hero-illustration.png"
              width={480}
              height={480}
              alt="Healthy lifestyle"
              className="w-full rounded-3xl object-cover shadow-2xl"
              priority
            />

            {/* Floating card 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" fill="#ec4899" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Heart Health</p>
                <p className="font-semibold text-sm text-[#1c1917]">Excellent</p>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <Droplets className="w-5 h-5" style={{ color: "#be185d" }} fill="#be185d" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Daily Water</p>
                <p className="font-semibold text-sm text-[#1c1917]">2.5L / day</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400"
      >
        <span className="text-xs">Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-[#ec4899] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
