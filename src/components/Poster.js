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
            alt     = {albumName ?? 'Album cover'}
            fill
            sizes   = '(max-width: 768px) 100vw, 33vw'
            style   = {{ objectFit: 'cover', borderRadius: '5px'}}
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