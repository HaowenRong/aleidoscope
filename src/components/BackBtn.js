'use client'

import '../styles/layout.css'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button className='backBtn' onClick={() => router.back()}>
      🡐
    </button>
  )
}