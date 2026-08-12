'use client'
import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/atlas.css'
import dynamic from 'next/dynamic';
import GroupBoard from '@/components/GroupBoard';
import { useState } from 'react';
import { getAllGroups } from '../api/supabase';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p className='loading-map'>Loading map…</p>,
})

const groupsData = await getAllGroups()

export default function Atlas() {
  const [groups, setGroups] = useState([])

  return (
    <main className='main'>
      <div className='atlas-container'>
        <div className='atlas'>
          <Map markerData={groupsData} selectGroups={setGroups} />
        </div>
        <div className='atlas-sidebar'>
          <GroupBoard groups={groups}  />
        </div>
      </div>
    </main>
  )
}