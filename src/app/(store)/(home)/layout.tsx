import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default async function StoreLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
