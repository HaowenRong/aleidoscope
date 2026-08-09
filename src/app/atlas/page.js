'use client'
import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/atlas.css'
import dynamic from 'next/dynamic';
import ImageBoard from '@/components/ImageBoard';
import { getFolderImages, getAllAlbumData } from '@/app/api/supabase';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p className='loading-map'>Loading map…</p>,
})

const albumsData = await getAllAlbumData()

export default function Atlas() {

  return (
    <main className='main'>
      <div className='atlas-container'>
        <div className='atlas'>
          <Map images={albumsData}/>
        </div>
        <div className='atlas-sidebar'>
          
        </div>
      </div>
    </main>
  )
}