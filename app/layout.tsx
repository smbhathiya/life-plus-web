import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Life Plus — Live Better Every Day",
  description:
    "Simple tools and healthy lifestyle guidance to help you improve your daily life and well-being. BMI calculator, water intake, calorie calculator, nutrition tips, fitness guide, and more.",
  keywords: [
    "healthy lifestyle",
    "bmi calculator",
    "wellness website",
    "healthy habits",
    "nutrition tips",
    "fitness tips",
    "healthy living",
    "water intake calculator",
    "calorie calculator",
    "mental wellness",
  ],
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, poppins.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
