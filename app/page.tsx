import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Calculators from "@/components/calculators"
import Habits from "@/components/habits"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Calculators />
      <Habits />
      {/* More sections coming soon */}
    </main>
  )
}
