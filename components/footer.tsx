"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { HeartPulse, ArrowRight, Heart } from "lucide-react"
import { FaInstagram, FaXTwitter, FaFacebook, FaYoutube } from "react-icons/fa6"

const quickLinks = [
  { label: "Health Tools",    href: "#calculators" },
  { label: "Daily Habits",    href: "#habits"      },
  { label: "Nutrition Guide", href: "#nutrition"   },
  { label: "Fitness Tips",    href: "#fitness"     },
  { label: "Mental Wellness", href: "#mental"      },
  { label: "Health Facts",    href: "#facts"       },
]

const resources = [
  { label: "BMI Calculator",     href: "#calculators" },
  { label: "Water Intake",       href: "#calculators" },
  { label: "Calorie Calculator", href: "#calculators" },
  { label: "Meal Suggestions",   href: "#nutrition"   },
  { label: "Exercise Guide",     href: "#fitness"     },
  { label: "Meditation Tips",    href: "#mental"      },
]

const socials = [
  { label: "Instagram", href: "#", color: "#ec4899", Icon: FaInstagram },
  { label: "X",         href: "#", color: "#be185d", Icon: FaXTwitter  },
  { label: "Facebook",  href: "#", color: "#ec4899", Icon: FaFacebook  },
  { label: "YouTube",   href: "#", color: "#be185d", Icon: FaYoutube   },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function Footer() {
  return (
    <footer className="bg-[#1c1917] text-white relative overflow-hidden">

      {/* Decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-pink-500 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-rose-600 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
        >
          {/* Brand column */}
          <motion.div variants={item}>
            <a href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>
                Life <span className="gradient-text">Plus</span>
              </span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your daily wellness companion. Simple tools and healthy lifestyle guidance
              to help you live better every single day.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, color, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon style={{ color }} className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={item}>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-stone-300 mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Sections
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-pink-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3 h-3 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-stone-300 mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Tools & Tips
            </h4>
            <ul className="flex flex-col gap-3">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-pink-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3 h-3 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <Separator className="bg-white/10" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Life Plus. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="inline-block text-pink-500"
            >
              ♥
            </motion.span>{" "}
            for a healthier world.
          </motion.p>
          <motion.a
            href="https://bhathiya.dev"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 text-stone-500 hover:text-pink-400 transition-colors duration-200"
          >
            <Heart className="w-3 h-3 text-pink-500" fill="#ec4899" />
            Developed by{" "}
            <span className="gradient-text font-semibold">bhathiya.dev</span>
          </motion.a>
        </div>

      </div>
    </footer>
  )
}
