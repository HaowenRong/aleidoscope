import TimelineInfo from './timelineInfo'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/timeline.css'
import { getImageUrl } from '@/app/api/supabase'

export default async function Timeline({ albumName, albumDesc, albumCover, 
                                         albumDate, numPhotos, urlName,
                                         alignment='left' }) {
  const align = alignment === 'right' ? 'right' : ''

  const albumCoverUrl = getImageUrl(albumCover)

  return (
    <Link href={`/album/${urlName}`} className={`timeline-frame ${align}`}>
      <div className='image-section'>
        {albumCover && (
          <Image
            src     = {albumCoverUrl}
            alt     = {albumCoverUrl}
            width   = {1000}
            height  = {1000}
            style   = {{ borderRadius: '5px' }}
            loading = 'eager'
          />
        )}
      </div>
      <div className='dot' />
      <TimelineInfo
        title         = {albumName}
        desc          = {albumDesc}
        date          = {albumDate}
        numPhotos     = {numPhotos}
        textAlignment = {align}
      />
    </Link>
  )
}
