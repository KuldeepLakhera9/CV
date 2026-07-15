import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cv.kuldeeplakhera.me'),
  title: 'Kuldeep Lakhera | Full Stack Developer & Backend Engineer',
  description: 'Portfolio & CV of Kuldeep Lakhera, a MERN and Full Stack Developer Intern at Nexoraa Tech specializing in building scalable applications, backend systems, and automated deployment pipelines.',
  openGraph: { 
    title: 'Kuldeep Lakhera | Portfolio & CV', 
    description: 'Full Stack Developer · Backend Engineering · Cloud & DevOps', 
    type: 'website',
    url: 'https://cv.kuldeeplakhera.me',
    siteName: 'Kuldeep Lakhera Portfolio',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = document.cookie.match(/(^|;)\\s*cv-theme\\s*=\\s*([^;]+)/);
                var isDark = theme ? theme[2] === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
