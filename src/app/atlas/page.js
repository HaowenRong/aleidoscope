'use client'
import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/atlas.css'
import dynamic from 'next/dynamic';
import GroupBoard from '@/components/GroupBoard';
import { useState, useEffect, useCallback } from 'react';
import { getAllGroups } from '../api/supabase';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p className='loading-map'>Loading map…</p>,
})

export default function Atlas() {
  const [allGroups,      setAllGroups]      = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [focus,          setFocus]          = useState('atlas')

  useEffect(() => {
    getAllGroups().then(setAllGroups)
  }, [])

  const selectAndFocus = useCallback((groups) => {
    setSelectedGroups(groups)
    if (groups.length < 2) {
      setFocus('atlas-sidebar')
    }
  }, [])

  return (
    <main className='main'>
      <div className='atlas-container'>
        <div 
          className={`atlas ${focus === 'atlas' ? 'expand' : 'compress'}`}
          tabIndex='0'
          onClick={() => setFocus('atlas')}
        >
          <Map markerData={allGroups} selectGroups={selectAndFocus} focus={focus} />
        </div>
        <div
          className={`atlas-sidebar ${focus === 'atlas-sidebar' ? 'expand' : 'compress'}`}
          tabIndex='0'
          onClick={() => setFocus('atlas-sidebar')}
        >
          {selectedGroups.length === 0 ? (
            <p>Select a marker or cluster from the map to view its contents.</p>
          ) : (
            <br></br>
          )}
          <GroupBoard groups={selectedGroups}  />
        </div>
      </div>
    </main>
  )
}