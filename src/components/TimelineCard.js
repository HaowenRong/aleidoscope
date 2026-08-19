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

  const [year, month, day] = albumDate.split('-');

  return (
    <Link href={`/album/${urlName}`} className={`timeline-frame ${align}`}>
      <div className='timeline-card'>
        {albumCover && (
          <>
            <Image
              src     = {albumCoverUrl}
              alt     = {albumCoverUrl}
              width   = {1000}
              height  = {1000}
              style   = {{ borderRadius: '5px', width: '100%', height: 'auto', display: 'block' }}
              loading = 'eager'
            />
            <div className='overlay'>
              <h1 className='title'>{albumName}</h1>
              <p className='desc'>{albumDesc}</p>
            </div>
          </>
        )}
      </div>

      <div className='dot' />

      <div className={'info-section'}>
        <div className={'album-data'}>
          {year}.{month}.{day}
        </div>
      </div>
    </Link>
  )
}
