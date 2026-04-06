'use client'

import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/about.css'
import Image from 'next/image'
import { getImageUrl } from '@/app/api/supabase'

export default function About() {

  const imageHeaderUrl = getImageUrl('public/about-header.jpg')

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
              loading = 'lazy'
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          )}
        </div>

        <div className='about-card'>
          <h1 className='about-title'>Who am I?</h1>
          <p className='about-desc'>
            I’m Alex, a photography hobbyist who loves exploring the world and taking some photos along the way. I mainly take photos of landscapes and scenery but I’ll take pictures of anything I find interesting. I’m currently using a Sony a6400 with its kit lens, along with some polarising and star filters, and hope to experiment with more gear in the future!
          </p>
        </div>
        

        <div className='about-card'>
          <h1 className='about-title'>What is this?</h1>
          <p className='about-desc'>
            I decided to create this site as I felt that other platforms for sharing photography were too restrictive, with things such as limited aspect ratios, heavy image compression, and generally unfavourable policies. Creating my own site gives me much more freedom over how I share my photography and allows me to express myself better.
          </p>
        </div>

        <div className='about-card'>
          <h1 className='about-title'>Technical stuff</h1>
          <p className='about-desc'>
            This site was developed using Next.js and hosted on Vercel, with images stored on Supabase database. More details can found in the <a target='_blank' href='https://github.com/HaowenRong/aleidoscope'>GitHub repository</a>.
          </p>
        </div>

        <div className='about-card'>
          <h1 className='about-title'>Design</h1>
          <p className='about-desc'>
            For this site I wanted to keep it simple and let the pictures speak for themselves while also featuring some commentary. So the design and layout ended up being quite simple while functional, with most of the space being occupied by images.
          </p>
          <br></br>
          <p className='about-desc'>
            I also wanted to make sure that the site was comfortable to navigate. As mobile devices are so prevalent (probably the primary device this site will be viewed on) and still getting bigger, I wanted to ensure that all navigation was within the thumb zone. So on mobile displays the navigation is moved to bottom, which is a design pattern that I hope becomes more common.
          </p>
        </div>

      </div>
    </main>
  );
}
