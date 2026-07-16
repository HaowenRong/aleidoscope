import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import Highlight from '@/components/highlight';
import { getAllAlbumData, getFolderImages } from './api/supabase';

export default async function Root() {

  const bannerImages = await getFolderImages('banner', 'name')
  const albumData    = await getAllAlbumData()

  return (
    <main className='main'>
      <Banner images={ bannerImages } />
      <div className='content'>
        {albumData.map((album, i) => (
          <Highlight
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