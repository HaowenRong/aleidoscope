'use client'

import '../styles/layout.css'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function NavigationBtn({icon, href}) {

  return (
    <Link
      href={href}
      className='navigationBtn'
    >
      <Icon icon={icon} className='icon'  />
      <span>View on map </span>
    </Link>
  )
}