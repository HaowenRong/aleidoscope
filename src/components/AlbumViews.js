'use client'

import '../styles/globals.css'
import '../styles/timeline.css'
import '../styles/albumViews.css'
import TimelineCard from '@/components/TimelineCard';
import ViewSwitcher from '@/components/ViewSwitcher';
import Poster from '@/components/Poster';
import { useState, useMemo } from 'react';

export default function AlbumsView({ albums, defaultView = 'grid', defaultSort = 'newest' }) {
  // views
  const [view, setView] = useState(defaultView)

  // update cookie for view
  function changeView(newView) {
    setView(newView)
    document.cookie = `view=${newView}; path=/; max-age=2592000`
  }

  // sorts
  const viewOptions = [
    { value: 'timeline', title: 'Timeline View', icon: 'mingcute:timeline-fill'},
    { value: 'grid',     title: 'Grid View',     icon: 'mingcute:grid-fill'    }
  ]

  const [sort, setSort] = useState(defaultSort)

  // update cookie for sort
  function changeSort(newSort) {
    setSort(newSort)
    document.cookie = `sort=${newSort}; path=/; max-age=2592000`
  }
  
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
        <ViewSwitcher 
          view={view} viewOptions={viewOptions} setView={changeView}
          sort={sort} sortOptions={sortOptions} setSort={changeSort}
        />
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