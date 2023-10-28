import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RentEsem',
  description: 'testing',
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: string },
}) {


  return (
    <html dir={lang === 'en' ? 'ltr' : 'rtl'} lang={lang}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
