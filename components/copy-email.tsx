'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyIcon, CheckIcon } from '@/components/icons'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      onClick={copy} 
      className="copy-email-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 text-xs font-semibold mt-3" 
      aria-label="Copy email address"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'copied' : 'copy'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.12 }}
          className="flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <CheckIcon size={12} className="text-[var(--accent)]" />
              <span>Email copied!</span>
            </>
          ) : (
            <>
              <CopyIcon size={12} />
              <span>Copy email</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
