import '../styles/globals.css'
import '../styles/layout.css'
import '../styles/timeline.css'
import Banner from '@/components/Banner';
import Timeline from '@/components/TimelineCard';
import { getAlbums, getBanners } from './api/supabase';

export default async function Root() {

  const albumData    = await getAlbums()
  const bannerImages = await getBanners()

  return (
    <main className='main'>
      <Banner images={bannerImages} />
      <div className='content timelineContent'>
        <div className='timeline' />
        {albumData.map((album, i) => (
          <Timeline
            key        = {i}
            albumName  = {album.title}
            albumDesc  = {album.description}
            albumCover = {`public/${album.url_name}/${album.cover_photo}`}
            albumDate  = {album.date}
            numPhotos  = {album.photo_count}
            urlName    = {album.url_name}
            alignment  = {i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </main>
  );
}