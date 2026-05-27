"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Zap, Flame, UtensilsCrossed, CheckCircle2 } from "lucide-react"
import SectionHeader from "@/components/section-header"

/* ── Data ─────────────────────────────────────────────────── */
const categories = [
  {
    key:   "fruits",
    label: "Fruits",
    icon:  "🍎",
    desc:  "Natural sugars & vitamins",
    items: [
      { emoji: "🍎", name: "Apple",      cal: "95 cal",  benefit: "Rich in fibre & antioxidants"        },
      { emoji: "🍌", name: "Banana",     cal: "105 cal", benefit: "Quick energy, high in potassium"     },
      { emoji: "🍇", name: "Grapes",     cal: "62 cal",  benefit: "Packed with resveratrol & vitamins"  },
      { emoji: "🍊", name: "Orange",     cal: "62 cal",  benefit: "High in Vitamin C & folate"          },
      { emoji: "🥝", name: "Kiwi",       cal: "61 cal",  benefit: "Boosts immunity & digestion"         },
      { emoji: "🫐", name: "Blueberry",  cal: "84 cal",  benefit: "Top antioxidant, great for brain"    },
    ],
  },
  {
    key:   "vegetables",
    label: "Vegetables",
    icon:  "🥦",
    desc:  "Vitamins, fibre & minerals",
    items: [
      { emoji: "🥦", name: "Broccoli",    cal: "31 cal",  benefit: "High in fibre, Vitamin C & K"         },
      { emoji: "🥕", name: "Carrot",      cal: "41 cal",  benefit: "Rich in beta-carotene for eye health"  },
      { emoji: "🍃", name: "Spinach",     cal: "7 cal",   benefit: "Iron, calcium & folate powerhouse"     },
      { emoji: "🫑", name: "Bell Pepper", cal: "31 cal",  benefit: "Highest Vitamin C of any vegetable"    },
      { emoji: "🧄", name: "Garlic",      cal: "4 cal",   benefit: "Natural antibiotic, supports heart"    },
      { emoji: "🥑", name: "Avocado",     cal: "160 cal", benefit: "Healthy fats, potassium & folate"      },
    ],
  },
  {
    key:   "proteins",
    label: "Proteins",
    icon:  "🥚",
    desc:  "Build & repair muscles",
    items: [
      { emoji: "🥚", name: "Eggs",         cal: "78 cal",  benefit: "Complete protein, choline for brain"  },
      { emoji: "🐟", name: "Salmon",       cal: "208 cal", benefit: "Omega-3 fatty acids & Vitamin D"      },
      { emoji: "🫘", name: "Lentils",      cal: "116 cal", benefit: "Plant protein, fibre & iron"          },
      { emoji: "🥩", name: "Chicken",      cal: "165 cal", benefit: "Lean protein & B vitamins"            },
      { emoji: "🥜", name: "Almonds",      cal: "164 cal", benefit: "Healthy fats, Vitamin E & magnesium"  },
      { emoji: "🥛", name: "Greek Yogurt", cal: "100 cal", benefit: "Probiotics, calcium & protein"        },
    ],
  },
  {
    key:   "meals",
    label: "Healthy Meals",
    icon:  "🥗",
    desc:  "Balanced full-plate ideas",
    items: [
      { emoji: "🥗", name: "Green Salad",    cal: "~150 cal", benefit: "Fibre, vitamins & hydration"        },
      { emoji: "🍲", name: "Veggie Soup",    cal: "~120 cal", benefit: "Low-calorie, filling & warming"     },
      { emoji: "🌯", name: "Protein Wrap",   cal: "~350 cal", benefit: "Balanced protein, carbs & veg"      },
      { emoji: "🍳", name: "Egg & Veg Bowl", cal: "~280 cal", benefit: "High protein, energising breakfast" },
      { emoji: "🐟", name: "Grilled Fish",   cal: "~250 cal", benefit: "Omega-3, lean & satisfying"         },
      { emoji: "🌾", name: "Oatmeal Bowl",   cal: "~150 cal", benefit: "Slow-release energy, fibre"         },
    ],
  },
]

const tips = [
  { icon: Leaf,            text: "Eat a rainbow — different coloured veg provide different nutrients."  },
  { icon: Zap,             text: "Eat small, frequent meals to keep your metabolism active all day."    },
  { icon: Flame,           text: "Cook with olive oil instead of butter to get heart-healthy fats."     },
  { icon: UtensilsCrossed, text: "Chew slowly — it takes 20 min for your brain to register fullness."  },
]

/* ── Food card ────────────────────────────────────────────── */
function FoodCard({
  emoji, name, cal, benefit, index,
}: {
  emoji: string; name: string; cal: string; benefit: string; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(236,72,153,0.12)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl border border-pink-50 p-4 flex gap-3 items-center shadow-sm cursor-default"
    >
      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center text-2xl sm:text-3xl shrink-0 aspect-square min-w-[52px] min-h-[52px]">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span
            className="font-semibold text-[#1c1917] text-sm truncate"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {name}
          </span>
          <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
            {cal}
          </span>
        </div>
        <p className="text-xs text-stone-500 leading-snug">{benefit}</p>
      </div>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────── */
export default function Nutrition() {
  const [active, setActive] = useState("fruits")
  const activeCategory = categories.find((c) => c.key === active)!

  return (
    <section id="nutrition" className="section-light py-14 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Nutrition Guide"
          title="Feel Better,"
          highlight="Eat Healthy"
          subtitle="What you eat shapes how you feel, think, and perform every single day."
        />

        {/* Category selector — 2×2 on mobile, 4 cols on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center gap-1.5 py-5 px-3 rounded-2xl border-2 transition-all duration-200 ${
                active === cat.key
                  ? "gradient-bg border-transparent text-white shadow-lg"
                  : "bg-white border-pink-100 hover:border-pink-200 hover:shadow-sm"
              }`}
            >
              <span className="text-3xl leading-none">{cat.icon}</span>
              <span
                className={`font-bold text-sm ${active === cat.key ? "text-white" : "text-[#1c1917]"}`}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {cat.label}
              </span>
              <span
                className={`text-[10px] font-medium text-center leading-tight ${
                  active === cat.key ? "text-pink-100" : "text-stone-400"
                }`}
              >
                {cat.desc}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Food grid — AnimatePresence for smooth category switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {activeCategory.items.map((item, i) => (
              <FoodCard key={item.name} {...item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Quick tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#1c1917] text-center mb-8"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Nutrition <span className="gradient-text">Quick Tips</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#fdf2f8] rounded-2xl p-5 border border-pink-50 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meal plan banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 rounded-3xl overflow-hidden"
        >
          <div className="gradient-bg p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                A Simple Healthy Day
              </h3>
              <div className="flex flex-col gap-2.5 text-pink-100 text-sm">
                {[
                  { meal: "Breakfast", example: "Oatmeal + banana + green tea"          },
                  { meal: "Lunch",     example: "Grilled chicken + salad + brown rice"  },
                  { meal: "Snack",     example: "Greek yogurt + mixed berries"           },
                  { meal: "Dinner",    example: "Salmon + steamed veg + quinoa"          },
                ].map(({ meal, example }) => (
                  <div key={meal} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-200 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">{meal}:</strong> {example}
                    </span>
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
