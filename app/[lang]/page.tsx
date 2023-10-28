"use client"

import { useParams } from "next/navigation"
import { useTranslation } from "../i18n/client"
import { DarkMode } from "../tools/DarkMode"

export default function Home() {
  const { lang } = useParams()
  const { t } = useTranslation(lang, 't', "home")
  return (
    <main className="flex min-h-screen flex-col items-center gap-96 p-24">
      <DarkMode />
      <div className="text-6xl">{t('Home.home')}</div>
    </main>
  )
}
