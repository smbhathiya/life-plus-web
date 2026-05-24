"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeader from "@/components/section-header"
import {
  Droplets, Moon, Footprints, Salad,
  CandyOff, MonitorOff, CheckCircle2,
} from "lucide-react"

const habits = [
  {
    icon: Droplets,  title: "Drink More Water",
    description: "Aim for 8 glasses a day. Staying hydrated boosts energy, focus, and skin health.",
    tip: "Keep a water bottle on your desk",
    color: "#ec4899", bg: "bg-pink-50", iconBg: "bg-pink-100", border: "border-pink-100",
  },
  {
    icon: Moon,      title: "Sleep 7–8 Hours",
    description: "Quality sleep repairs your body, sharpens your mind, and regulates your mood.",
    tip: "Set a consistent sleep schedule",
    color: "#be185d", bg: "bg-rose-50", iconBg: "bg-rose-100", border: "border-rose-100",
  },
  {
    icon: Footprints, title: "Walk Daily",
    description: "Even a 20-minute walk improves cardiovascular health and reduces stress levels.",
    tip: "Walk after lunch or dinner",
    color: "#ec4899", bg: "bg-pink-50", iconBg: "bg-pink-100", border: "border-pink-100",
  },
  {
    icon: Salad,     title: "Eat Vegetables",
    description: "Fill half your plate with colourful vegetables to get essential vitamins and fibre.",
    tip: "Add one more veggie to every meal",
    color: "#be185d", bg: "bg-rose-50", iconBg: "bg-rose-100", border: "border-rose-100",
  },
  {
    icon: CandyOff,  title: "Reduce Sugar",
    description: "Cutting added sugars lowers the risk of diabetes, heart disease, and weight gain.",
    tip: "Choose fruit over processed sweets",
    color: "#ec4899", bg: "bg-pink-50", iconBg: "bg-pink-100", border: "border-pink-100",
  },
  {
    icon: MonitorOff, title: "Limit Screen Time",
    description: "Less screen time before bed improves sleep quality and reduces eye strain.",
    tip: "No screens 1 hour before sleep",
    color: "#be185d", bg: "bg-rose-50", iconBg: "bg-rose-100", border: "border-rose-100",
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45 } },
}

export default function Habits() {
  return (
    <section id="habits" className="section-blush py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Daily Habits"
          title="Big Changes"
          highlight="Small Habits,"
          subtitle="Tiny daily actions compound into life-changing results. Start with just one."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {habits.map(({ icon: Icon, title, description, tip, color, bg, iconBg, border }, idx) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(236,72,153,0.13)",
              }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Card className={`border ${border} ${bg} shadow-sm rounded-2xl overflow-hidden h-full`}>
                <CardContent className="p-6 flex flex-col gap-4">

                  {/* Number + icon row */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </motion.div>
                    <span
                      className="text-5xl font-black opacity-10 select-none"
                      style={{ color, fontFamily: "var(--font-poppins)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-[#1c1917] text-base leading-tight"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {title}
                  </h3>

                  <p className="text-sm text-stone-500 leading-relaxed flex-1">{description}</p>

                  {/* Tip pill */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-white text-xs font-medium"
                    style={{ color }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {tip}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 rounded-3xl gradient-bg p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden"
        >
          {/* Decorative blobs inside banner */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/20 blur-2xl pointer-events-none"
          />
          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Consistency beats perfection
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-pink-100 max-w-md mx-auto text-base"
            >
              You don&apos;t need to change everything at once. Pick one habit, stick with it for
              21 days, then add the next.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
