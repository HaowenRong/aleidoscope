'use client'

import Link from 'next/link'
import { useState } from 'react'
import '../styles/layout.css'

export default function NaviBar() {
  const [open, setOpen] = useState(false)


  return (
    <nav className={`navi ${open ? 'open' : ''}`}>
      <ul className='navi-list'>
        <li>
          <Link href='/photo-stream' className='button'>
            <span className='label'>Highlights</span>
          </Link>
        </li>
        <li>
          <Link href='/albums' className='button'>
            <span className='label'>Albums</span>
          </Link>
        </li>
        <li>
          <Link href='/about' className='button'>
            <span className='label'>About</span>
          </Link>
        </li>
      </ul>

      <button className='hamburg-icon' onClick={() => setOpen(!open)}>
        <span>{open ? '✕' : '☰'}</span>
      </button>
    </nav>
  )
}
