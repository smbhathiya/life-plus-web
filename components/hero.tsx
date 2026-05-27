"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import {
  HeartPulse, Sparkles, Scale, Droplets, Flame, Apple, Heart,
} from "lucide-react"

const features = [
  { icon: Scale,    label: "BMI Calculator"  },
  { icon: Droplets, label: "Water Intake"    },
  { icon: Flame,    label: "Calorie Counter" },
  { icon: Apple,    label: "Nutrition Guide" },
]

/* Per-word blur + slide animation — replaces old rotateX approach */
function AnimatedHeading() {
  const line1 = ["Live", "Healthier"]
  const line2 = ["Every", "Single", "Day"]

  return (
    <h1
      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-5"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <span className="block">
        {line1.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.62, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block mr-2 sm:mr-3 ${i === 1 ? "gradient-text" : "text-[#1c1917]"}`}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block">
        {line2.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.62, delay: 0.34 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block mr-2 sm:mr-3 ${i === 2 ? "gradient-text" : "text-[#1c1917]"}`}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background image + gradient overlay */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          fill
          alt=""
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8]/92 via-[#fce7f3]/86 to-white/90" />
      </motion.div>

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-pink-200/50 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-64 sm:w-[400px] h-64 sm:h-[400px] rounded-full bg-rose-200/45 blur-3xl pointer-events-none"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.016] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ec4899 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main content — two-column on md+, stacked / centered on mobile */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col md:flex-row items-center gap-12 lg:gap-20"
      >
        {/* ── Text column ── */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/80 text-pink-600 text-sm font-semibold mb-6 shadow-sm"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              className="flex"
            >
              <HeartPulse className="w-4 h-4" />
            </motion.span>
            Your Free Wellness Companion
          </motion.div>

          <AnimatedHeading />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-stone-500 max-w-md leading-relaxed mb-8"
          >
            Free health calculators and lifestyle guidance to help you take
            control of your wellness — simple, accurate, always in your pocket.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto mb-10 justify-center md:justify-start"
          >
            <motion.a
              href="#calculators"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="animate-glow text-center px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-base shadow-lg"
            >
              Try Health Tools →
            </motion.a>
            <motion.a
              href="#habits"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-center px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-pink-200 text-[#ec4899] font-bold text-base hover:bg-pink-50 transition-colors shadow-sm"
            >
              Healthy Habits
            </motion.a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.82 }}
            className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start"
          >
            {features.map(({ icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href="#calculators"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.88 + i * 0.07 }}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 border border-pink-100 text-stone-600 text-xs font-medium shadow-sm cursor-pointer"
              >
                <Icon className="w-3 h-3 text-pink-500" />
                {label}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-10 sm:gap-14 justify-center md:justify-start"
          >
            {[
              { value: "3+",   label: "Health Tools" },
              { value: "6+",   label: "Daily Habits"  },
              { value: "100%", label: "Free Forever"  },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center md:items-start">
                <span className="text-2xl sm:text-3xl font-bold gradient-text leading-none">{value}</span>
                <span className="text-xs text-stone-400 mt-1 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Illustration column — hidden on mobile, shown md+ ── */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-1 justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm lg:max-w-md">

            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.28, 0.52, 0.28] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-6 rounded-3xl gradient-bg blur-2xl opacity-30 pointer-events-none"
            />

            {/* Floating illustration */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
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

            {/* Floating card — Heart Health */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -left-5"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-pink-500" fill="#ec4899" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 leading-none mb-0.5">Heart Health</p>
                  <p className="font-bold text-sm text-[#1c1917]">Excellent</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating card — Daily Water */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -right-4"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                className="glass-card rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4" style={{ color: "#be185d" }} fill="#be185d" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 leading-none mb-0.5">Daily Water</p>
                  <p className="font-bold text-sm text-[#1c1917]">2.5L / day</p>
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-stone-400"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-[#ec4899] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
