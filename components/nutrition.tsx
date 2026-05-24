"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Leaf, Zap, Flame, UtensilsCrossed, CheckCircle2 } from "lucide-react"
import SectionHeader from "@/components/section-header"

/* ── Data ─────────────────────────────────────────────────── */
const categories = [
  {
    key: "fruits",
    label: "Fruits",
    icon: "🍎",
    items: [
      { emoji: "🍎", name: "Apple",      cal: "95 cal",  benefit: "Rich in fibre & antioxidants" },
      { emoji: "🍌", name: "Banana",     cal: "105 cal", benefit: "Quick energy, high in potassium" },
      { emoji: "🍇", name: "Grapes",     cal: "62 cal",  benefit: "Packed with resveratrol & vitamins" },
      { emoji: "🍊", name: "Orange",     cal: "62 cal",  benefit: "High in Vitamin C & folate" },
      { emoji: "🥝", name: "Kiwi",       cal: "61 cal",  benefit: "Boosts immunity & digestion" },
      { emoji: "🫐", name: "Blueberry",  cal: "84 cal",  benefit: "Top antioxidant, brain health" },
    ],
  },
  {
    key: "vegetables",
    label: "Vegetables",
    icon: "🥦",
    items: [
      { emoji: "🥦", name: "Broccoli",   cal: "31 cal",  benefit: "High in fibre, Vitamin C & K" },
      { emoji: "🥕", name: "Carrot",     cal: "41 cal",  benefit: "Rich in beta-carotene for eyes" },
      { emoji: "🍃", name: "Spinach",    cal: "7 cal",   benefit: "Iron, calcium & folate powerhouse" },
      { emoji: "🫑", name: "Bell Pepper",cal: "31 cal",  benefit: "Highest Vitamin C of any vegetable" },
      { emoji: "🧄", name: "Garlic",     cal: "4 cal",   benefit: "Natural antibiotic, heart health" },
      { emoji: "🥑", name: "Avocado",    cal: "160 cal", benefit: "Healthy fats, potassium & folate" },
    ],
  },
  {
    key: "proteins",
    label: "Proteins",
    icon: "🥚",
    items: [
      { emoji: "🥚", name: "Eggs",       cal: "78 cal",  benefit: "Complete protein, choline for brain" },
      { emoji: "🐟", name: "Salmon",     cal: "208 cal", benefit: "Omega-3, protein & Vitamin D" },
      { emoji: "🫘", name: "Lentils",    cal: "116 cal", benefit: "Plant protein, fibre & iron" },
      { emoji: "🥩", name: "Chicken",    cal: "165 cal", benefit: "Lean protein, B vitamins" },
      { emoji: "🥜", name: "Almonds",    cal: "164 cal", benefit: "Healthy fats, Vitamin E & magnesium" },
      { emoji: "🧀", name: "Greek Yogurt",cal:"100 cal", benefit: "Probiotics, calcium & protein" },
    ],
  },
  {
    key: "meals",
    label: "Healthy Meals",
    icon: "🥗",
    items: [
      { emoji: "🥗", name: "Green Salad",    cal: "~150 cal", benefit: "Fibre, vitamins & hydration" },
      { emoji: "🍲", name: "Veggie Soup",    cal: "~120 cal", benefit: "Low-calorie, filling & warming" },
      { emoji: "🌯", name: "Wrap",           cal: "~350 cal", benefit: "Balanced protein, carbs & veg" },
      { emoji: "🍳", name: "Egg & Veg Bowl", cal: "~280 cal", benefit: "High protein, energising breakfast" },
      { emoji: "🐟", name: "Grilled Fish",   cal: "~250 cal", benefit: "Omega-3, lean & satisfying" },
      { emoji: "🌾", name: "Oatmeal Bowl",   cal: "~150 cal", benefit: "Slow-release energy, fibre" },
    ],
  },
]

const tips = [
  { icon: Leaf,             text: "Eat a rainbow — different coloured veg provide different nutrients." },
  { icon: Zap,              text: "Eat small, frequent meals to keep your metabolism active all day." },
  { icon: Flame,            text: "Cook with olive oil instead of butter to get heart-healthy fats." },
  { icon: UtensilsCrossed,  text: "Chew slowly — it takes 20 min for your brain to feel full." },
]

/* ── Animations ───────────────────────────────────────────── */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const cardAnim  = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } } }

/* ── Food card ────────────────────────────────────────────── */
function FoodCard({ emoji, name, cal, benefit }: { emoji: string; name: string; cal: string; benefit: string }) {
  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 16px 32px rgba(236,72,153,0.12)" }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="border border-pink-50 bg-white rounded-2xl overflow-hidden cursor-pointer">
        <CardContent className="p-4 flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.35 }}
            className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center text-3xl shrink-0"
          >
            {emoji}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <h4 className="font-semibold text-[#1c1917] text-sm truncate" style={{ fontFamily: "var(--font-poppins)" }}>
                {name}
              </h4>
              <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 border-0 text-xs shrink-0">
                {cal}
              </Badge>
            </div>
            <p className="text-xs text-stone-500 leading-snug">{benefit}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────── */
export default function Nutrition() {
  return (
    <section id="nutrition" className="section-light py-14 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Nutrition Guide"
          title="Feel Better"
          highlight="Eat Healthy,"
          subtitle="What you eat shapes how you feel, think, and perform every single day."
        />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="fruits">
            <TabsList className="flex w-full overflow-x-auto mx-auto mb-8 sm:mb-10 bg-pink-50 border border-pink-100 p-1 rounded-2xl h-auto gap-1 justify-start sm:justify-center scrollbar-none">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-stone-500 data-[state=active]:gradient-bg data-[state=active]:text-white data-[state=active]:shadow-md transition-all whitespace-nowrap shrink-0"
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.key} value={cat.key}>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {cat.items.map((item) => (
                    <FoodCard key={item.name} {...item} />
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <Separator className="my-16 bg-pink-100" />

        {/* Nutrition tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#1c1917] text-center mb-10"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Nutrition <span className="gradient-text">Quick Tips</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tips.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border border-pink-50 bg-[#fdf2f8] rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <CardContent className="p-5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-pink-500" />
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meal suggestion banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 rounded-3xl overflow-hidden relative"
        >
          {/*
            IMAGE PLACEHOLDER — Nutrition banner background
            To add a real image, replace the gradient div below with:
              <Image src="/images/nutrition-banner.jpg" fill alt="" className="object-cover" />
            Place the file at: public/images/nutrition-banner.jpg
            Recommended: colourful fresh food flat-lay photo
          */}
          <div className="gradient-bg p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <h3
                className="text-2xl sm:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                A Simple Healthy Day
              </h3>
              <div className="flex flex-col gap-2 text-pink-100 text-sm">
                {[
                  { meal: "Breakfast", example: "Oatmeal + banana + green tea" },
                  { meal: "Lunch",     example: "Grilled chicken + salad + brown rice" },
                  { meal: "Snack",     example: "Greek yogurt + mixed berries" },
                  { meal: "Dinner",    example: "Salmon + steamed veg + quinoa" },
                ].map(({ meal, example }) => (
                  <div key={meal} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-200 mt-0.5 shrink-0" />
                    <span><strong className="text-white">{meal}:</strong> {example}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-8xl sm:text-9xl select-none opacity-80">🥗</div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
