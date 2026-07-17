import '../styles/globals.css'
import '../styles/layout.css'
import '../styles/timeline.css'
import Banner from '@/components/Banner';
import Timeline from '@/components/timelineCard';
import { getAllAlbumData, getFolderImages } from './api/supabase';

export default async function Root() {

  const bannerImages = await getFolderImages('banner', 'name')
  const albumData    = await getAllAlbumData()

  return (
    <main className='main'>
      <Banner images={ bannerImages } />
      <div className='content timelineContent'>
        <div className='timeline' />
        {albumData.map((album, i) => (
          <Timeline
            key        = {i}
            albumName  = {album.title}
            albumDesc  = {album.description}
            albumCover = {`public/${album.url_name}/${album.cover_photo}`}
            albumDate  = {album.date}
            urlName    = {album.url_name}
            alignment  = {i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </main>
  );
}