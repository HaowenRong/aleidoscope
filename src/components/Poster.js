import Link from 'next/link'
import Image from 'next/image'
import '../styles/timeline.css'
import { getImageUrl } from '@/app/api/supabase'

export default function Poster({ albumName, albumDesc, albumCover, 
                                       albumDate, numPhotos, urlName }) {

  const albumCoverUrl = getImageUrl(albumCover)

  const [year, month, day] = albumDate.replace(/\b0(\d)/g, '$1').split('-');
  const [albumNameFirst, ...rest] = albumName.split(' ');
  const albumNameRest = rest.join(" ");

  return (
    <Link href={`/album/${urlName}`} className={'poster'}>
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
    </Link>
  )
}