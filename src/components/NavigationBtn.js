'use client'

import '../styles/layout.css'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function NavigationBtn({icon=null, href, text}) {

  return (
    <Link
      href={href}
      className='navigationBtn'
    >
      {icon && (
        <Icon icon={icon} className='icon'  />
      )}
      <span>{text}</span>
    </Link>
  )
}