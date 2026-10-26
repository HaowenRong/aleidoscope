import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import AlbumsView from '@/components/AlbumViews';
import { getAlbums, getBanners } from './api/supabase';
import { cookies } from 'next/headers'

export default async function Root() {
  const [albums, banners] = await Promise.all([getAlbums(), getBanners()])

  const initialView = (await cookies()).get('view')?.value ?? 'grid'
  const initialSort = (await cookies()).get('sort')?.value ?? 'newest'

  return (
    <main className='main'>
      <Banner banners={banners} interval={8000} />
      <div className='content'>
        <AlbumsView albums={albums} defaultView={initialView} defaultSort={initialSort}  />
      </div>
    </main>
  )
}