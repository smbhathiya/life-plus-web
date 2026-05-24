"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps {
  badge: string
  title: string
  highlight: string
  subtitle: string
  titleFirst?: boolean   // if true: title comes before highlight
}

export default function SectionHeader({ badge, title, highlight, subtitle, titleFirst }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 border-0 mb-4 px-4 py-1.5 text-sm font-semibold">
          {badge}
        </Badge>
      </motion.div>

      <h2
        className="text-4xl sm:text-5xl font-bold text-[#1c1917] mb-4"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {titleFirst ? (
          <>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline"
            >
              {title}{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-text"
            >
              {highlight}
            </motion.span>
          </>
        ) : (
          <>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-text"
            >
              {highlight}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline"
            >
              {" "}{title}
            </motion.span>
          </>
        )}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-stone-500 max-w-xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
