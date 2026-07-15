'use client'
import { motion } from 'framer-motion'
export function Reveal({ children, className = '' }: { children: React.ReactNode, className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .42, ease: 'easeOut' }}>{children}</motion.div> }
