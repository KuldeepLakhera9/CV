'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon } from '@/components/icons'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.cookie = `cv-theme=${next ? 'dark' : 'light'};path=/;max-age=31536000;SameSite=Lax`
  }

  return (
    <button 
      className="icon-button theme-toggle-btn flex items-center justify-center overflow-hidden" 
      onClick={toggle} 
      aria-label="Toggle color theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'dark' : 'light'}
          initial={{ y: -10, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
          aria-hidden
        >
          {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
