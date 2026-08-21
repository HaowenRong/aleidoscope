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

  const [year, month, day] = albumDate.replace(/\b0(\d)/g, '$1').split('-');
  const [albumNameFirst, ...rest] = albumName.split(' ');
  const albumNameRest = rest.join(" ");

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
              <h1 className='title'>{albumNameFirst}</h1>
              <h1 className='title-side'>{albumNameRest}</h1>
              <div className='footer'>
                <p className='desc'>{albumDesc}</p>
                <p className='date'>{year}.{month}.{day}</p>
              </div>
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
