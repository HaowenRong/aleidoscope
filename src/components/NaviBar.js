'use client'

import Link from 'next/link'
import '../styles/layout.css'

export default function NaviBar() {
  return (
    <div className='header'>
      <div className='navi-bar'>
        <h1>AAAAaaaa</h1>

        <div className='options-row'>
          <Link href='/photo-stream' className='option'>
            <h3>Highlights</h3>
          </Link>

          <Link href='/albums' className='option'>
            <h3>Albums</h3>
          </Link>

          <Link href='/about' className='option'>
            <h3>About</h3>
          </Link>
        </div>
      </div>
    </div>
    
  )
}
