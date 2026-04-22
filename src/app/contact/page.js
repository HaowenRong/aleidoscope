'use client'
import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/about.css'
import Image from 'next/image'
import { getImageUrl } from '../api/supabase'

export default function About() {

  const imageHeaderUrl = getImageUrl('public/contact-header.jpg')

  return (
    <main className='main'>
      <div className='content'>
        <div className='image-header'>
          {imageHeaderUrl && (
            <Image
              src     = {imageHeaderUrl}
              alt     = {'imageAlt'}
              width   = {1000}
              height  = {1000}
              style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
            />
          )}
        </div>
        
        <div className='about-card'>
          <h1 className='about-title'>Contact</h1>
          <p className='about-desc'>
            
          </p>
        </div>
      </div>
    </main>
  )
}