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

  const [sort, setSort] = useState('newest')

  return (
    <div>
      <div className='options-section'>
        <ViewSwitcher view={view} setView={setView} setSort={setSort}  />
      </div>
      {view === 'grid' ? (
        <div className='grid-view'>
          {albums.map((album, i) => (
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
          {albums.map((album, i) => (
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