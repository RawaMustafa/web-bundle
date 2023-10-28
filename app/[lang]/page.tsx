"use client"
import { useParams } from 'next/navigation'
import { DarkMode } from '../tools/DarkMode'
import { useTranslation } from '../i18n/client'

export default function Home() {
  const { lang } = useParams()
  const { t } = useTranslation(lang, 't', "Home")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DarkMode />
      {t("Home.home")}
    </main>
  )
}
