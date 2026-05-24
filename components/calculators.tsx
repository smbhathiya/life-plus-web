"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scale, Droplets, Flame } from "lucide-react"
import SectionHeader from "@/components/section-header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* ─── BMI Calculator ─────────────────────────────────── */
function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<{
    bmi: number; category: string; suggestion: string; color: string
  } | null>(null)

  function calculate() {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return
    const bmi = w / (h * h)
    let category = "", suggestion = "", color = ""
    if (bmi < 18.5) {
      category = "Underweight"
      suggestion = "Consider a nutrient-rich diet and consult a nutritionist to reach a healthy weight."
      color = "#f472b6"
    } else if (bmi < 25) {
      category = "Normal weight"
      suggestion = "Great job! Maintain your current habits with balanced meals and regular exercise."
      color = "#be185d"
    } else if (bmi < 30) {
      category = "Overweight"
      suggestion = "Try adding 30 min of daily walking and reduce processed foods."
      color = "#ec4899"
    } else {
      category = "Obese"
      suggestion = "Consider consulting a healthcare provider for a personalised weight management plan."
      color = "#9d174d"
    }
    setResult({ bmi: Math.round(bmi * 10) / 10, category, suggestion, color })
  }

  const bmiPercent = result ? Math.min((result.bmi / 40) * 100, 100) : 0

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Height (cm)</Label>
          <Input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
          <Input
            type="number"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
          />
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-md border-0"
      >
        Calculate BMI
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-bold" style={{ color: result.color }}>{result.bmi}</span>
            <Badge
              className="text-white border-0"
              style={{ background: result.color }}
            >
              {result.category}
            </Badge>
          </div>
          <div className="h-2 w-full rounded-full bg-pink-50 mb-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bmiPercent}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full"
              style={{ background: result.color }}
            />
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">{result.suggestion}</p>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Water Intake Calculator ────────────────────────── */
function WaterCalculator() {
  const [weight, setWeight]     = useState("")
  const [activity, setActivity] = useState("moderate")
  const [result, setResult]     = useState<number | null>(null)

  const multiplier: Record<string, number> = {
    low: 30, moderate: 35, high: 40, athlete: 45,
  }

  function calculate() {
    const w = parseFloat(weight)
    if (!w || w <= 0) return
    setResult(Math.round((w * multiplier[activity]) / 100) / 10)
  }

  const glasses = result ? Math.round((result * 1000) / 250) : 0

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
        <Input
          type="number"
          placeholder="e.g. 70"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Activity Level</Label>
        <Select value={activity} onValueChange={setActivity}>
          <SelectTrigger className="border-pink-100 bg-pink-50/60 focus:ring-pink-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (mostly sitting)</SelectItem>
            <SelectItem value="moderate">Moderate (light exercise)</SelectItem>
            <SelectItem value="high">High (daily workout)</SelectItem>
            <SelectItem value="athlete">Athlete (intense training)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={calculate}
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-md border-0"
      >
        Calculate Water Intake
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm text-center"
        >
          <p className="text-4xl font-bold gradient-text mb-1">{result}L</p>
          <p className="text-xs text-stone-400 mb-3">recommended daily intake</p>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {Array.from({ length: Math.min(glasses, 12) }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-xl"
              >
                💧
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-2">≈ {glasses} glasses of 250 ml each</p>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Calorie Calculator ─────────────────────────────── */
function CalorieCalculator() {
  const [age, setAge]           = useState("")
  const [gender, setGender]     = useState("male")
  const [height, setHeight]     = useState("")
  const [weight, setWeight]     = useState("")
  const [activity, setActivity] = useState("1.55")
  const [result, setResult]     = useState<{ bmr: number; tdee: number } | null>(null)

  function calculate() {
    const a = parseFloat(age), h = parseFloat(height)
    const w = parseFloat(weight), act = parseFloat(activity)
    if (!a || !h || !w) return
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161
    setResult({ bmr: Math.round(bmr), tdee: Math.round(bmr * act) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Age</Label>
          <Input
            type="number"
            placeholder="e.g. 25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="border-pink-100 bg-pink-50/60 focus:ring-pink-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Height (cm)</Label>
          <Input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
          <Input
            type="number"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Activity Level</Label>
        <Select value={activity} onValueChange={setActivity}>
          <SelectTrigger className="border-pink-100 bg-pink-50/60 focus:ring-pink-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
            <SelectItem value="1.375">Lightly active (1–3 days/week)</SelectItem>
            <SelectItem value="1.55">Moderately active (3–5 days/week)</SelectItem>
            <SelectItem value="1.725">Very active (6–7 days/week)</SelectItem>
            <SelectItem value="1.9">Extra active (physical job + exercise)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={calculate}
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-md border-0"
      >
        Calculate Calories
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-pink-50">
              <p className="text-2xl font-bold text-[#ec4899]">{result.bmr}</p>
              <p className="text-xs text-stone-500 mt-0.5">BMR (cal/day)</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-[#fdf2f8]">
              <p className="text-2xl font-bold text-[#be185d]">{result.tdee}</p>
              <p className="text-xs text-stone-500 mt-0.5">Daily Need (cal)</p>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 leading-relaxed">
            To lose weight, eat ~{result.tdee - 500} cal/day. To gain, eat ~{result.tdee + 300} cal/day.
          </p>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Section ────────────────────────────────────────── */
const cards = [
  {
    id: "bmi",
    title: "BMI Calculator",
    subtitle: "Know your body mass index",
    icon: Scale,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    component: <BMICalculator />,
  },
  {
    id: "water",
    title: "Water Intake",
    subtitle: "Daily hydration goal",
    icon: Droplets,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    component: <WaterCalculator />,
  },
  {
    id: "calories",
    title: "Calorie Calculator",
    subtitle: "Estimate your daily calories",
    icon: Flame,
    iconBg: "bg-fuchsia-100",
    iconColor: "text-fuchsia-500",
    component: <CalorieCalculator />,
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const cardAnim  = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Calculators() {
  return (
    <section id="calculators" className="section-light py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Health Tools"
          title="Your Personal"
          highlight="Health Tools"
          subtitle="Quick, accurate calculators to understand your body and set healthy goals."
          titleFirst
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map(({ id, title, subtitle, icon: Icon, iconBg, iconColor, component }) => (
            <motion.div
              key={id}
              variants={cardAnim}
              whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(236,72,153,0.15)" }}
              whileTap={{ scale: 0.99 }}
              className="bg-white rounded-3xl p-6 shadow-md border border-pink-50 flex flex-col gap-5 transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1c1917] text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                    {title}
                  </h3>
                  <p className="text-xs text-stone-400">{subtitle}</p>
                </div>
              </div>
              <div className="h-px bg-pink-50" />
              {component}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
