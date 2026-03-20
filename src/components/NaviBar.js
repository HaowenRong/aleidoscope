'use client'

import Link from 'next/link'
import '../styles/layout.css'

import { useState, useEffect, useRef } from 'react'

export default function NaviBar() {
  const [open, setOpen] = useState(false)

  const naviRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (naviRef.current && !naviRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav ref={naviRef} className={`navi ${open ? 'open' : ''}`}>
      <ul className='navi-list'>
        <li>
          <Link href='/photo-stream' className='button' onClick={() => setOpen(false)}>
            <span className='label'>Highlights</span>
          </Link>
        </li>
        <li>
          <Link href='/albums' className='button' onClick={() => setOpen(false)}>
            <span className='label'>Albums</span>
          </Link>
        </li>
        <li>
          <Link href='/about' className='button' onClick={() => setOpen(false)}>
            <span className='label'>About</span>
          </Link>
        </li>
      </ul>

      <button className='hamburg-icon' onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
