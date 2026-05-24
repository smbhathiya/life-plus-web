import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import Hero from "@/components/hero"
import Calculators from "@/components/calculators"
import Habits from "@/components/habits"
import Nutrition from "@/components/nutrition"

export default function Page() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Calculators />
      <Habits />
      <Nutrition />
      {/* More sections coming soon */}
    </main>
  )
}
