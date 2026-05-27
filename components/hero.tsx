"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeartPulse, Sparkles, Scale, Droplets, Flame, Apple } from "lucide-react"

const features = [
  { icon: Scale,    label: "BMI Calculator"  },
  { icon: Droplets, label: "Water Intake"    },
  { icon: Flame,    label: "Calorie Counter" },
  { icon: Apple,    label: "Nutrition Guide" },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fdf2f8] via-white to-[#fce7f3]"
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.38, 0.58, 0.38] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-72 sm:w-[520px] h-72 sm:h-[520px] rounded-full bg-pink-200/60 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 11, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-64 sm:w-[420px] h-64 sm:h-[420px] rounded-full bg-rose-200/55 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 13, repeat: Infinity, delay: 6, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 left-1/3 w-56 h-56 rounded-full bg-fuchsia-100/50 blur-3xl pointer-events-none"
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ec4899 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 max-w-3xl mx-auto w-full pt-24 pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/80 text-pink-600 text-sm font-semibold mb-7 shadow-sm"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            className="flex"
          >
            <HeartPulse className="w-4 h-4" />
          </motion.span>
          Your Free Wellness Companion
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-5"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <span className="text-[#1c1917]">Live </span>
          <span className="gradient-text">Healthier</span>
          <br />
          <span className="text-[#1c1917]">Every </span>
          <span className="gradient-text">Single Day</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-base sm:text-lg text-stone-500 max-w-md leading-relaxed mb-8"
        >
          Free health calculators and lifestyle guidance to help you take
          control of your wellness — simple, accurate, always in your pocket.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto mb-10"
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
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {features.map(({ icon: Icon, label }, i) => (
            <motion.a
              key={label}
              href="#calculators"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
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
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex items-center gap-10 sm:gap-16"
        >
          {[
            { value: "3+",   label: "Health Tools" },
            { value: "6+",   label: "Daily Habits"  },
            { value: "100%", label: "Free Forever"  },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold gradient-text leading-none">{value}</span>
              <span className="text-xs text-stone-400 mt-1 font-medium">{label}</span>
            </div>
          ))}
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
