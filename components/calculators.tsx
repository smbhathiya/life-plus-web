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

/* ─── Shared gender toggle ───────────────────────────── */
function GenderToggle({
  value,
  onChange,
}: {
  value: "male" | "female"
  onChange: (v: "male" | "female") => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-stone-500">Gender</Label>
      <div className="grid grid-cols-2 gap-2">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
              value === g
                ? "gradient-bg text-white border-transparent shadow-md"
                : "bg-pink-50/60 border-pink-100 text-stone-500 hover:bg-pink-100/60 active:scale-95"
            }`}
          >
            {g === "male" ? "♂  Male" : "♀  Female"}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── BMI Calculator ─────────────────────────────────── */
function BMICalculator() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<{
    bmi: number
    category: string
    suggestion: string
    color: string
    minHealthy: number
    maxHealthy: number
    pct: number
  } | null>(null)

  function calculate() {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return

    const bmi = w / (h * h)
    let category = "", suggestion = "", color = ""

    if (bmi < 18.5) {
      category = "Underweight"
      suggestion = "Increase calorie-dense, nutritious foods. A dietitian can help you reach a healthy weight safely."
      color = "#3b82f6"
    } else if (bmi < 25) {
      category = "Normal Weight"
      suggestion = "Great work! Keep it up with balanced meals, regular movement, and quality sleep."
      color = "#16a34a"
    } else if (bmi < 30) {
      category = "Overweight"
      suggestion = "Aim for 30 min of daily walking and cut back on ultra-processed foods — small steps add up."
      color = "#f59e0b"
    } else {
      category = "Obese"
      suggestion = "Speak with a healthcare provider to build a safe, personalised weight-management plan."
      color = "#ef4444"
    }

    // Healthy weight range for this height
    const minHealthy = Math.round(18.5 * h * h * 10) / 10
    const maxHealthy = Math.round(24.9 * h * h * 10) / 10

    // Map BMI 10–40 → 0–100 %
    const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100)

    setResult({ bmi: Math.round(bmi * 10) / 10, category, suggestion, color, minHealthy, maxHealthy, pct })
  }

  const genderNote =
    gender === "female"
      ? "Women naturally carry more essential body fat than men at the same BMI — this is normal and healthy."
      : "Men generally have less body fat than women at the same BMI value."

  return (
    <div className="flex flex-col gap-4">
      <GenderToggle value={gender} onChange={setGender} />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Height (cm)</Label>
          <Input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
          <Input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
          />
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 transition-all shadow-md border-0 h-12 text-base"
      >
        Calculate BMI
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold leading-none" style={{ color: result.color }}>
                {result.bmi}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">BMI score</p>
            </div>
            <Badge
              className="text-white border-0 text-sm px-3 py-1"
              style={{ background: result.color }}
            >
              {result.category}
            </Badge>
          </div>

          {/* Gradient scale bar */}
          <div className="space-y-1">
            <div
              className="relative h-3 w-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #93c5fd 0%, #4ade80 27%, #facc15 55%, #f97316 73%, #ef4444 100%)",
              }}
            >
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: `${result.pct}%` }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 shadow-md z-10"
                style={{ borderColor: result.color }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-stone-400 px-0.5 select-none">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50/70 px-3 py-2 text-xs text-stone-600">
            <span className="font-semibold text-stone-700">Healthy weight range for your height: </span>
            {result.minHealthy} – {result.maxHealthy} kg
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">{result.suggestion}</p>
          <p className="text-[10px] text-stone-400 italic leading-relaxed">{genderNote}</p>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Water Intake Calculator ────────────────────────── */
function WaterCalculator() {
  const [gender, setGender]     = useState<"male" | "female">("male")
  const [weight, setWeight]     = useState("")
  const [activity, setActivity] = useState("moderate")
  const [result, setResult]     = useState<{ liters: number; glasses: number } | null>(null)

  function calculate() {
    const w = parseFloat(weight)
    if (!w || w <= 0) return

    // Base rate (ml/kg): men 35, women 31 — from EFSA/IoM adjusted guidelines
    const baseRate = gender === "male" ? 35 : 31
    const activityDelta: Record<string, number> = {
      low: -5, moderate: 0, high: 5, athlete: 10,
    }
    const rate   = baseRate + activityDelta[activity]
    const ml     = w * rate
    const liters = Math.round(ml / 100) / 10
    const glasses = Math.round((liters * 1000) / 250)
    setResult({ liters, glasses })
  }

  const baseLabel = gender === "male" ? "35 ml/kg (male baseline)" : "31 ml/kg (female baseline)"

  return (
    <div className="flex flex-col gap-4">
      <GenderToggle value={gender} onChange={setGender} />

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
        <Input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 70"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Activity Level</Label>
        <Select value={activity} onValueChange={setActivity}>
          <SelectTrigger className="border-pink-100 bg-pink-50/60 focus:ring-pink-300 h-11">
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
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 transition-all shadow-md border-0 h-12 text-base"
      >
        Calculate Water Intake
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm text-center space-y-3"
        >
          <div>
            <p className="text-4xl font-bold gradient-text leading-none">{result.liters}L</p>
            <p className="text-xs text-stone-400 mt-1">recommended daily intake</p>
          </div>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {Array.from({ length: Math.min(result.glasses, 12) }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="text-xl"
              >
                💧
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-stone-500">≈ {result.glasses} glasses of 250 ml each</p>
          <p className="text-[10px] text-stone-400 italic">
            Based on {baseLabel}, adjusted for your activity level.
          </p>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Calorie Calculator ─────────────────────────────── */
function CalorieCalculator() {
  const [gender, setGender]     = useState<"male" | "female">("male")
  const [age, setAge]           = useState("")
  const [height, setHeight]     = useState("")
  const [weight, setWeight]     = useState("")
  const [activity, setActivity] = useState("1.55")
  const [goal, setGoal]         = useState<"lose" | "maintain" | "gain">("maintain")
  const [result, setResult]     = useState<{
    bmr: number; tdee: number; target: number
    protein: number; carbs: number; fat: number
  } | null>(null)

  function calculate() {
    const a = parseFloat(age), h = parseFloat(height)
    const w = parseFloat(weight), act = parseFloat(activity)
    if (!a || !h || !w || a <= 0 || h <= 0 || w <= 0) return

    // Mifflin-St Jeor — most validated equation for general population
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161

    const tdee = Math.round(bmr * act)

    const target = Math.round(
      goal === "lose"    ? tdee - 500 :
      goal === "gain"    ? tdee + 300 : tdee
    )

    // Macros: protein 1.8–2.0 g/kg, fat 25% of target, carbs fill the rest
    const proteinG = Math.round(goal === "lose" ? w * 1.8 : w * 2.0)
    const fatG     = Math.max(30, Math.round((target * 0.25) / 9))
    const carbG    = Math.max(0, Math.round((target - proteinG * 4 - fatG * 9) / 4))

    setResult({ bmr: Math.round(bmr), tdee, target, protein: proteinG, fat: fatG, carbs: carbG })
  }

  const goalMeta = {
    lose:     { label: "Weight Loss Target", note: "500 kcal deficit → ~0.5 kg/week loss" },
    maintain: { label: "Maintenance Calories", note: "Matches your daily energy expenditure" },
    gain:     { label: "Muscle Gain Target",  note: "300 kcal surplus for lean muscle growth" },
  }

  return (
    <div className="flex flex-col gap-4">
      <GenderToggle value={gender} onChange={setGender} />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Age (years)</Label>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="e.g. 25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-stone-500">Height (cm)</Label>
          <Input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
          />
        </div>
        <div className="space-y-1.5 col-span-2">
          <Label className="text-xs font-semibold text-stone-500">Weight (kg)</Label>
          <Input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-pink-100 bg-pink-50/60 focus-visible:ring-pink-300 placeholder:text-stone-300 h-11"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Activity Level</Label>
        <Select value={activity} onValueChange={setActivity}>
          <SelectTrigger className="border-pink-100 bg-pink-50/60 focus:ring-pink-300 h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1.2">Sedentary (desk job, no exercise)</SelectItem>
            <SelectItem value="1.375">Lightly active (1–3 days/week)</SelectItem>
            <SelectItem value="1.55">Moderately active (3–5 days/week)</SelectItem>
            <SelectItem value="1.725">Very active (6–7 days/week)</SelectItem>
            <SelectItem value="1.9">Extra active (physical job + training)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Goal selector */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-stone-500">Goal</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["lose", "maintain", "gain"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-all active:scale-95 ${
                goal === g
                  ? "gradient-bg text-white border-transparent shadow-md"
                  : "bg-pink-50/60 border-pink-100 text-stone-500 hover:bg-pink-100/60"
              }`}
            >
              {g === "lose" ? "Lose ↓" : g === "maintain" ? "Maintain" : "Gain ↑"}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full gradient-bg text-white font-semibold hover:opacity-90 transition-all shadow-md border-0 h-12 text-base"
      >
        Calculate Calories
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-pink-100 p-4 shadow-sm space-y-3"
        >
          {/* Target callout */}
          <div className="rounded-xl gradient-bg p-3 text-center">
            <p className="text-3xl font-bold text-white leading-none">{result.target}</p>
            <p className="text-xs text-pink-100 mt-1">{goalMeta[goal].label}</p>
            <p className="text-[10px] text-pink-200 mt-0.5">{goalMeta[goal].note}</p>
          </div>

          {/* BMR + TDEE */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2.5 rounded-xl bg-pink-50">
              <p className="text-xl font-bold text-[#ec4899]">{result.bmr}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">BMR (base rate)</p>
            </div>
            <div className="text-center p-2.5 rounded-xl bg-[#fdf2f8]">
              <p className="text-xl font-bold text-[#be185d]">{result.tdee}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Maintenance</p>
            </div>
          </div>

          {/* Macros */}
          <div>
            <p className="text-xs font-semibold text-stone-500 mb-2">Suggested Daily Macros</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Protein", value: result.protein, unit: "g", color: "#ec4899", cal: result.protein * 4 },
                { label: "Carbs",   value: result.carbs,   unit: "g", color: "#be185d", cal: result.carbs * 4   },
                { label: "Fat",     value: result.fat,     unit: "g", color: "#f472b6", cal: result.fat * 9     },
              ].map(({ label, value, unit, color, cal }) => (
                <div key={label} className="text-center p-2.5 rounded-xl bg-pink-50/70">
                  <p className="text-lg font-bold leading-none" style={{ color }}>
                    {value}{unit}
                  </p>
                  <p className="text-[9px] text-stone-500 mt-0.5">{label}</p>
                  <p className="text-[9px] text-stone-400">{cal} kcal</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-stone-400 italic leading-relaxed">
            Formula: Mifflin-St Jeor. Macros: ~{goal === "lose" ? "1.8" : "2.0"}g/kg protein, 25% fat, remaining carbs.
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
    <section id="calculators" className="section-light py-14 sm:py-24">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {cards.map(({ id, title, subtitle, icon: Icon, iconBg, iconColor, component }) => (
            <motion.div
              key={id}
              variants={cardAnim}
              whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(236,72,153,0.12)" }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-pink-50 flex flex-col gap-5 transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <h3
                    className="font-bold text-[#1c1917] text-base"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
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
