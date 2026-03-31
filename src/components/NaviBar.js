'use client'

import Link from 'next/link'
import '../styles/layout.css'

import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function NaviBar() {
  const pathname = usePathname()

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
    <div className={`header ${open ? 'open' : ''}`}>
      <div ref={naviRef} className='navi'>
        <Link href='/' className='title-block'>
          <div className='title-top'>Photo</div>
          <div className='title-bottom'>Gallery</div>
        </Link>
        
        <ul className='navi-list'>
          <li>
            <Link href='/' className={`button ${pathname === '/' ? 'active' : ''}`} onClick={() => setOpen(false)}>
              <span className='label'>Gallery</span>
            </Link>
          </li>
          <li>
            <Link href='/contact' className={`button ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setOpen(false)}>
              <span className='label'>Contact</span>
            </Link>
          </li>
          <li>
            <Link href='/about' className={`button ${pathname === '/about' ? 'active' : ''}`} onClick={() => setOpen(false)}>
              <span className='label'>About</span>
            </Link>
          </li>
        </ul>

        <button className='hamburg-icon' onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  )
}
