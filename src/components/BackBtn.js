'use client'

import '../styles/layout.css'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button className='backBtn' onClick={() => router.back()}>
      <Icon icon='solar:arrow-left-linear'  />
    </button>
  )
}