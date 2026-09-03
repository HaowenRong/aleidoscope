'use client'
import '../styles/globals.css'
import '../styles/layout.css'
import '../styles/atlas.css'
import dynamic from 'next/dynamic';
import GroupBoard from '@/components/GroupBoard';
import { useState, useEffect, useCallback } from 'react';
import { getAllGroups, getAlbum } from '@/app/api/supabase';
import MetadataBar from '@/components/MetadataBar';
import { useSearchParams } from 'next/navigation';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p className='loading-map'>Loading map…</p>,
})

export default function AtlasPageContent() {
  const [allGroups,      setAllGroups]      = useState([]) // holds all the groups
  const [selectedGroups, setSelectedGroups] = useState([]) // tracks the selected groups
  const [selectedImages, setSelectedImages] = useState([]) // tracks the count of images selected
  const [focus,          setFocus]          = useState('atlas') // tracks which section is in focus

  // load all the groups
  useEffect(() => {
    getAllGroups()
      .then(groups => setAllGroups(groups))
      .catch(err => {
        console.error('Failed to load groups:', err)
      })

    return
  }, [])

  // get the album from params (if any)
  const params = useSearchParams()
  const albumUrl = params.get('album')

  useEffect(() => {
    if (!albumUrl) return

    getAlbum(albumUrl)
      .then(album => setSelectedGroups(album.groups))
      .catch(err => {
        console.error('Failed to load album:', err)
      })

  }, [albumUrl])

  useEffect(() => {
    const totalImages = selectedGroups.reduce((sum, obj) => sum + obj.images.length, 0)
    setSelectedImages(totalImages)
  }, [selectedGroups])

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
          <Map markerData={allGroups} selectedGroups={selectedGroups} selectGroups={selectAndFocus} focus={focus} />
        </div>
        <div
          className={`atlas-sidebar ${focus === 'atlas-sidebar' ? 'expand' : 'compress'}`}
          tabIndex='0'
          onClick={() => setFocus('atlas-sidebar')}
        >
          {selectedGroups.length === 0 ? (
            <div className='tooltip'>
              <h3 className='text'>Select a marker or cluster from the map to view its contents.</h3>
            </div>
          ) : (
            <MetadataBar dataPoints={[
                { title: 'Groups', data: selectedGroups.length },
                { title: 'Photos', data: selectedImages }
              ]}
            />
          )}
          <GroupBoard groups={selectedGroups}  />
        </div>
      </div>
    </main>
  )
}