'use client'

import '../styles/globals.css'
import '../styles/timeline.css'
import '../styles/albumViews.css'
import TimelineCard from '@/components/TimelineCard';
import ViewSwitcher from '@/components/ViewSwitcher';
import Poster from '@/components/Poster';
import { useState, useMemo } from 'react';

export default function AlbumsView({ albums }) {
  const [view, setView] = useState('grid')

  const viewOptions = [
    { value: 'timeline', title: 'Timeline View', icon: 'mingcute:timeline-fill'},
    { value: 'grid',     title: 'Grid View',     icon: 'mingcute:grid-fill'    }
  ]

  const [sort, setSort] = useState('newest')
  
  const sortOptions = [
    { value: 'newest', title: 'Newest First'},
    { value: 'oldest', title: 'Oldest First'},
    { value: 'title',  title: 'Title (A-Z)'},
    { value: 'photos', title: 'Most Photos'}
  ]

  const sorts = {
    newest: (a, b) => b.date .localeCompare(a.date),
    oldest: (a, b) => a.date .localeCompare(b.date),
    title:  (a, b) => a.title.localeCompare(b.title),
    photos: (a, b) => b.photo_count - a.photo_count,
  }

  const sortedAlbums = useMemo(
    () => [...albums].sort(sorts[sort]),
    [albums, sort]
  )

  return (
    <div>
      <div className='options-section'>
        <ViewSwitcher view={view} viewOptions={viewOptions} setView={setView} sortOptions={sortOptions} setSort={setSort}  />
      </div>
      {view === 'grid' ? (
        <div className='grid-view'>
          {sortedAlbums.map((album, i) => (
            <Poster
              key        = {i}
              albumName  = {album.title}
              albumDesc  = {album.caption}
              albumCover = {`public/${album.url_name}/${album.cover_photo}`}
              albumDate  = {album.date}
              numPhotos  = {album.photo_count}
              urlName    = {album.url_name}
            />
          ))}
        </div>
      ) : (
        <div className='timeline-view'>
          {sortedAlbums.map((album, i) => (
            <TimelineCard
              key        = {i}
              albumName  = {album.title}
              albumDesc  = {album.caption}
              albumCover = {`public/${album.url_name}/${album.cover_photo}`}
              albumDate  = {album.date}
              numPhotos  = {album.photo_count}
              urlName    = {album.url_name}
              alignment  = {i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
          <div className='timeline' />
        </div>
      )}
    </div>
  )
}