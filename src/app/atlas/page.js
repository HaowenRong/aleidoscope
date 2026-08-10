'use client'
import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/atlas.css'
import dynamic from 'next/dynamic';
import ImageBoard from '@/components/ImageBoard';
import { getAllGroups } from '../api/supabase';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p className='loading-map'>Loading map…</p>,
})

const groupsData = await getAllGroups()

export default function Atlas() {

  return (
    <main className='main'>
      <div className='atlas-container'>
        <div className='atlas'>
          <Map markerData={groupsData} />
        </div>
        <div className='atlas-sidebar'>
          
        </div>
      </div>
    </main>
  )
}