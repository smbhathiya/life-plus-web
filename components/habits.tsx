"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Droplets,
  Moon,
  Footprints,
  Salad,
  CandyOff,
  MonitorOff,
  CheckCircle2,
} from "lucide-react"

const habits = [
  {
    icon: Droplets,
    title: "Drink More Water",
    description: "Aim for 8 glasses a day. Staying hydrated boosts energy, focus, and skin health.",
    tip: "Keep a water bottle on your desk",
    color: "#ec4899",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    border: "border-pink-100",
  },
  {
    icon: Moon,
    title: "Sleep 7–8 Hours",
    description: "Quality sleep repairs your body, sharpens your mind, and regulates your mood.",
    tip: "Set a consistent sleep schedule",
    color: "#be185d",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    border: "border-rose-100",
  },
  {
    icon: Footprints,
    title: "Walk Daily",
    description: "Even a 20-minute walk improves cardiovascular health and reduces stress levels.",
    tip: "Walk after lunch or dinner",
    color: "#ec4899",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    border: "border-pink-100",
  },
  {
    icon: Salad,
    title: "Eat Vegetables",
    description: "Fill half your plate with colourful vegetables to get essential vitamins and fibre.",
    tip: "Add one more veggie to every meal",
    color: "#be185d",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    border: "border-rose-100",
  },
  {
    icon: CandyOff,
    title: "Reduce Sugar",
    description: "Cutting added sugars lowers the risk of diabetes, heart disease, and weight gain.",
    tip: "Choose fruit over processed sweets",
    color: "#ec4899",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    border: "border-pink-100",
  },
  {
    icon: MonitorOff,
    title: "Limit Screen Time",
    description: "Less screen time before bed improves sleep quality and reduces eye strain.",
    tip: "No screens 1 hour before sleep",
    color: "#be185d",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    border: "border-rose-100",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function Habits() {
  return (
    <section id="habits" className="section-blush py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 border-0 mb-4 px-4 py-1.5 text-sm font-semibold">
            Daily Habits
          </Badge>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#1c1917] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Small Habits,{" "}
            <span className="gradient-text">Big Changes</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-lg">
            Tiny daily actions compound into life-changing results. Start with just one.
          </p>
        </motion.div>

        {/* Habit cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {habits.map(({ icon: Icon, title, description, tip, color, bg, iconBg, border }) => (
            <motion.div key={title} variants={item}>
              <Card
                className={`group border ${border} ${bg} shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden`}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  {/* Icon + title row */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </motion.div>
                    <h3
                      className="font-bold text-[#1c1917] text-base leading-tight"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-500 leading-relaxed">{description}</p>

                  {/* Tip pill */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 border border-white/80 text-xs font-medium"
                    style={{ color }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {tip}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 rounded-3xl gradient-bg p-8 sm:p-12 text-center text-white shadow-xl"
        >
          <h3
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Consistency beats perfection
          </h3>
          <p className="text-pink-100 max-w-md mx-auto text-base">
            You don&apos;t need to change everything at once. Pick one habit, stick with it for
            21 days, then add the next.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
