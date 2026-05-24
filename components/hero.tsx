"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import {
  Heart, Apple, Dumbbell, Droplets,
  HeartPulse, Sun, Sparkles, Zap,
} from "lucide-react"

/* ── Floating icon data ─────────────────────────────────── */
const floatingIcons = [
  { icon: Heart,      color: "#ec4899", top: "15%",   left:  "8%",  delay: 0,   size: 28 },
  { icon: Apple,      color: "#be185d", top: "25%",   right: "10%", delay: 0.5, size: 32 },
  { icon: Dumbbell,   color: "#f472b6", bottom:"30%", left:  "5%",  delay: 1,   size: 26 },
  { icon: Droplets,   color: "#ec4899", top: "60%",   right: "8%",  delay: 1.5, size: 30 },
  { icon: HeartPulse, color: "#be185d", top: "10%",   right: "25%", delay: 0.8, size: 24 },
  { icon: Sun,        color: "#f9a8d4", bottom:"20%", right: "20%", delay: 1.2, size: 28 },
  { icon: Sparkles,   color: "#ec4899", bottom:"40%", left:  "15%", delay: 0.3, size: 22 },
  { icon: Zap,        color: "#be185d", top: "40%",   left:  "3%",  delay: 1.8, size: 20 },
]

/* ── Animated stat counter ──────────────────────────────── */
function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col items-center lg:items-start"
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.7 }}
        className="text-2xl font-bold gradient-text"
      >
        {value}
      </motion.span>
      <span className="text-sm text-stone-500">{label}</span>
    </motion.div>
  )
}

/* ── Word-by-word heading reveal ────────────────────────── */
function AnimatedHeading({ line1, line2 }: { line1: string; line2: string }) {
  const words1 = line1.split(" ")
  const words2 = line2.split(" ")
  const allWords = [...words1, ...words2]

  return (
    <h1
      className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1c1917] leading-tight mb-6"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <span className="block">
        {words1.map((word, i) => (
          <motion.span
            key={`l1-${i}`}
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            className="inline-block mr-3"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="gradient-text block">
        {words2.map((word, i) => (
          <motion.span
            key={`l2-${i}`}
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (words1.length + i) * 0.1, ease: "easeOut" }}
            className="inline-block mr-3"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

/* ── Main Hero ──────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  /* Parallax transforms */
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%",  "25%"])
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%",  "15%"])
  const imageY   = useTransform(scrollYProgress, [0, 1], ["0%",  "10%"])
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background with parallax ──────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" fill alt="" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8]/88 via-[#fce7f3]/80 to-[#fdf2f8]/85" />
      </motion.div>

      {/* Decorative animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-rose-300/30 blur-3xl pointer-events-none"
      />

      {/* ── Floating icons ────────────────────────────── */}
      {floatingIcons.map(({ icon: Icon, color, top, left, right, bottom, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none hidden sm:flex"
          style={{ top, left, right, bottom }}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.8, duration: 0.6, ease: "backOut" }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
            whileHover={{ scale: 1.2, opacity: 1 }}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center shadow-lg cursor-pointer"
          >
            <Icon style={{ color, width: size, height: size }} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main content ──────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-16 w-full"
      >
        {/* Text column */}
        <div className="flex-1 text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              <HeartPulse className="w-3.5 h-3.5" />
            </motion.span>
            Your Wellness Companion
          </motion.div>

          {/* Animated heading */}
          <AnimatedHeading line1="Live Better" line2="Every Day" />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg sm:text-xl text-stone-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Simple tools and healthy lifestyle guidance to help you improve your
            daily life and well-being — one habit at a time.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="#calculators"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="animate-glow px-8 py-3.5 rounded-full gradient-bg text-white font-semibold text-base shadow-lg"
            >
              Explore Tools
            </motion.a>
            <motion.a
              href="#habits"
              whileHover={{ scale: 1.06, backgroundColor: "#fdf2f8" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full border-2 border-[#ec4899] text-[#ec4899] font-semibold text-base transition-colors duration-200"
            >
              Learn Healthy Habits
            </motion.a>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-stone-500">
            {[
              { value: "3+",   label: "Health Tools" },
              { value: "6+",   label: "Daily Habits"  },
              { value: "100%", label: "Free"           },
            ].map((s, i) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Image column with parallax */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Glowing ring behind image */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-3xl gradient-bg blur-2xl opacity-30"
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Image
                src="/images/hero-illustration.png"
                width={480}
                height={480}
                alt="Healthy lifestyle"
                className="relative w-full rounded-3xl object-cover shadow-2xl"
                priority
              />
            </motion.div>

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500" fill="#ec4899" />
                </div>
                <div>
                  <p className="text-xs text-stone-400">Heart Health</p>
                  <p className="font-semibold text-sm text-[#1c1917]">Excellent</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Droplets className="w-5 h-5" style={{ color: "#be185d" }} fill="#be185d" />
                </div>
                <div>
                  <p className="text-xs text-stone-400">Daily Water</p>
                  <p className="font-semibold text-sm text-[#1c1917]">2.5L / day</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#ec4899] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
