import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import AlbumsView from '@/components/AlbumViews';
import { getAlbums, getBanners } from './api/supabase';

export default async function Root() {

  const [albums, banners] = await Promise.all([getAlbums(), getBanners()])

  return (
    <main className='main'>
      <Banner banners={banners} />
      <div className='content'>
        <AlbumsView albums={albums}  />
      </div>
    </main>
  )
}