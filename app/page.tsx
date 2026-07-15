'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { resumeData as d } from '@/lib/data'
import { ThemeToggle } from '@/components/theme-toggle'
import { CopyEmail } from '@/components/copy-email'
import { Reveal } from '@/components/reveal'
import { 
  GithubIcon, 
  LinkedinIcon, 
  GlobeIcon, 
  MailIcon, 
  PhoneIcon, 
  DownloadIcon, 
  ExternalLinkIcon,
  GraduationCapIcon,
  AwardIcon,
  BriefcaseIcon,
  CalendarIcon
} from '@/components/icons'

function Section({ id, eyebrow, title, children }: { id: string, eyebrow: string, title: string, children: React.ReactNode }) { 
  return (
    <section id={id} className="section">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}

const External = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a className="external" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
    {children} <ExternalLinkIcon size={13} />
  </a>
)

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Home() {
  const p = d.profile
  const [activeProject, setActiveProject] = useState<typeof d.projects[number] | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])
  
  return (
    <main>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" />
      
      {/* Decorative Atmosphere Blobs */}
      <div className="bg-grid" />
      <div className="glow-blob glow-1" />
      <div className="glow-blob glow-2" />

      <a className="skip-link" href="#content">Skip to content</a>
      
      <header className="topbar">
        <a href="#top" className="wordmark">KL<span>.</span></a>
        <nav aria-label="Primary">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </header>

      <div id="top" className="shell">
        <section className="hero">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.p variants={staggerItem} className="eyebrow">
              Curriculum vitae / {p.location}
            </motion.p>
            <motion.h1 
              variants={staggerItem} 
              className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--ink)] via-[var(--accent)] to-[#06b6d4] leading-tight"
            >
              {p.name}
            </motion.h1>
            <motion.p variants={staggerItem} className="hero-title">
              {p.title}
            </motion.p>
            <motion.p variants={staggerItem} className="hero-copy">
              Building clear, dependable digital products—from thoughtful interfaces to the systems that make them run.
            </motion.p>
            <motion.div variants={staggerItem} className="hero-actions">
              <a className="button primary" href="/resume.pdf" download>
                <DownloadIcon size={16} /> Download résumé
              </a>
              <a className="button secondary" href="#contact">
                Contact me <span>→</span>
              </a>
            </motion.div>
          </motion.div>
          
          <Reveal className="hero-aside" delay={0.6}>
            <div className="profile-photo-container">
              <img src="/profile.png" alt={p.name} className="profile-photo" />
            </div>
            <div className="availability">
              <span /> Open to opportunities
            </div>
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>{p.location}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Full-stack systems</dd>
              </div>
              <div>
                <dt>Portfolio</dt>
                <dd>
                  <a href={p.portfolio} target="_blank" rel="noreferrer">
                    <GlobeIcon size={14} className="inline mr-1 text-[var(--accent)]" /> 
                    {p.portfolio.replace('https://', '')}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </section>

        <div id="content">
          <Section id="summary" eyebrow="01 / Profile" title="A practical builder with an eye for the whole system.">
            <Reveal>
              <p className="lead">{d.summary}</p>
            </Reveal>
          </Section>

          <Section id="experience" eyebrow="02 / Experience" title="Where I’ve contributed.">
            <div className="timeline">
              {d.experience.map((job, idx) => (
                <Reveal key={job.role} className="timeline-item" delay={idx * 0.1}>
                  <div className="timeline-dot" />
                  <div className="timeline-date">
                    <CalendarIcon size={13} className="text-[var(--accent)]" />
                    {job.duration}
                  </div>
                  <article>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="inline-flex items-center gap-2">
                          <BriefcaseIcon size={18} className="text-[var(--muted)]" />
                          {job.role}
                        </h3>
                        <p className="company">{job.company}</p>
                      </div>
                    </div>
                    <TagList tags={job.tech} />
                    <div className="detail-grid">
                      <div>
                        <p className="mini-label">Responsibilities</p>
                        <Bullets items={job.responsibilities} />
                      </div>
                      <div>
                        <p className="mini-label">Impact</p>
                        <Bullets items={job.achievements} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="projects" eyebrow="03 / Selected work" title="Projects worth a closer look.">
            <div className="project-grid">
              {d.projects.map((project, i) => (
                <Reveal key={project.name} delay={i * 0.08}>
                  <article 
                    className="project-card cursor-pointer" 
                    onClick={() => setActiveProject(project)}
                    onMouseMove={handleMouseMove}
                  >
                    <div className={`project-image bg-gradient-to-br ${project.accent}`}>
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        />
                      ) : (
                        <>
                          <span>0{i + 1}</span>
                          <div className="project-orbit" />
                          <div className="project-image-graphic">
                            <div className="flex justify-between items-center w-full mb-1">
                              <div className="graphic-circle" />
                              <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--line)]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--line)]" />
                              </div>
                            </div>
                            <div className="graphic-bar" />
                            <div className="graphic-line w-full" />
                            <div className="graphic-line w-[90%]" />
                            <div className="graphic-line w-[75%]" />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="project-body">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <TagList tags={project.tech} />
                      <Bullets items={project.highlights} />
                      <div className="project-links" onClick={(e) => e.stopPropagation()}>
                        <External href={project.live}>View live</External>
                        <External href={project.github}>GitHub</External>
                        <span 
                          onClick={() => setActiveProject(project)} 
                          className="external cursor-pointer inline-flex items-center gap-1 text-[var(--accent)] font-semibold"
                        >
                          Details <span>→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="skills" eyebrow="04 / Toolkit" title="Technologies I work with.">
            <div className="skills-grid">
              {Object.entries(d.skills).map(([category, skills], categoryIdx) => (
                <Reveal key={category} delay={categoryIdx * 0.08}>
                  <div className="skill-group" key={category} onMouseMove={handleMouseMove}>
                    <h3>{category}</h3>
                    <TagList tags={skills} />
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <section className="split-section">
            <Section id="education" eyebrow="05 / Education" title="Academic foundation.">
              <Reveal>
                <article className="plain-card">
                  <h3 className="flex items-center gap-2">
                    <GraduationCapIcon size={20} className="text-[var(--accent)]" />
                    {d.education.college}
                  </h3>
                  <p className="font-semibold text-[var(--ink)] mt-1">{d.education.degree}</p>
                  <p>{d.education.cgpa} · {d.education.graduation}</p>
                  <TagList tags={d.education.coursework} />
                </article>
              </Reveal>
            </Section>
            
            <Section id="certifications" eyebrow="06 / Credentials" title="Learning in public.">
              <Reveal>
                <ul className="simple-list">
                  {d.certifications.map(x => (
                    <li key={x}>
                      <span className="flex items-center gap-2 text-[var(--ink)] font-medium">
                        <AwardIcon size={16} className="text-[var(--accent)]" />
                        {x}
                      </span>
                      <span>→</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </Section>
          </section>

          <Section id="achievements" eyebrow="07 / Highlights" title="A track record in motion.">
            <div className="achievement-grid">
              {d.achievements.map((x, i) => (
                <Reveal key={x}>
                  <article className="achievement">
                    <span>0{i + 1}</span>
                    <p>{x}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="journey" eyebrow="08 / Growth" title="The tech timeline.">
            <Reveal>
              <ol className="tech-timeline">
                {d.timeline.map(t => (
                  <li key={t.year}>
                    <span>{t.year}</span>
                    <p>{t.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Section>

          <Section id="looking" eyebrow="09 / Next role" title="What I’m looking for.">
            <Reveal>
              <p className="lead short">{d.lookingFor}</p>
            </Reveal>
          </Section>

          <Section id="metrics" eyebrow="10 / At a glance" title="Résumé metrics.">
            <div className="metric-grid">
              {d.metrics.map(m => (
                <Reveal key={m.label}>
                  <div className="metric">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="contact" eyebrow="11 / Contact" title="Let’s make something useful.">
            <Reveal>
              <div className="contact-card">
                <div>
                  <p>For opportunities, conversations, or collaborations, the best place to start is an email.</p>
                  <a className="contact-email flex items-center gap-2 hover:underline" href={`mailto:${p.email}`}>
                    <MailIcon size={20} className="text-[var(--accent)]" />
                    {p.email}
                  </a>
                  <a className="contact-phone flex items-center gap-2" href={`tel:${p.phone.replace(/\s/g, '')}`}>
                    <PhoneIcon size={14} className="text-[var(--muted)]" />
                    {p.phone}
                  </a>
                  <CopyEmail email={p.email} />
                </div>
                
                <div className="contact-links">
                  <External href={p.linkedin}>
                    <LinkedinIcon size={14} className="inline mr-1" /> LinkedIn
                  </External>
                  <External href={p.github}>
                    <GithubIcon size={14} className="inline mr-1" /> GitHub
                  </External>
                  <External href={p.portfolio}>
                    <GlobeIcon size={14} className="inline mr-1" /> Portfolio
                  </External>
                  <a className="button primary" href="/resume.pdf" download>
                    <DownloadIcon size={16} /> Download résumé
                  </a>
                </div>
                
                <div className="qr">
                  <QRCodeSVG value={p.portfolio} size={88} bgColor="transparent" fgColor="currentColor" />
                  <span>Scan for portfolio</span>
                </div>
              </div>
            </Reveal>
          </Section>
        </div>

        <footer>
          <span>Designed and developed by {p.name}.</span>
          <span>Built with Next.js, Tailwind CSS & Framer Motion.</span>
          <span>Last updated: {d.lastUpdated}</span>
        </footer>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
            <motion.div 
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
            >
              <button 
                className="modal-close" 
                onClick={() => setActiveProject(null)}
                aria-label="Close modal"
              >
                <span>&times;</span>
              </button>

              <div className={`modal-image bg-gradient-to-br ${activeProject.accent}`}>
                {activeProject.image && (
                  <img src={activeProject.image} alt={activeProject.name} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="modal-body">
                <span className="eyebrow">Case Study</span>
                <h2>{activeProject.name}</h2>
                <div className="tags">
                  {activeProject.tech.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                
                <p className="modal-description">{activeProject.longDescription}</p>

                <div className="modal-details-grid">
                  <div>
                    <p className="mini-label">Key Highlights & Architecture</p>
                    <ul className="bullets">
                      {activeProject.highlights.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-links">
                  <a className="button primary" href={activeProject.live} target="_blank" rel="noreferrer">
                    View Live Project <ExternalLinkIcon size={14} className="ml-1" />
                  </a>
                  <a className="button secondary" href={activeProject.github} target="_blank" rel="noreferrer">
                    <GithubIcon size={16} /> GitHub Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

function TagList({ tags }: { tags: readonly string[] }) { 
  return (
    <div className="tags">
      {tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  ) 
}

function Bullets({ items }: { items: readonly string[] }) { 
  return (
    <ul className="bullets">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) 
}
