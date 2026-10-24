'use client'

import '../styles/layout.css'
import '../styles/albumViews.css'
import { Icon } from '@iconify/react'

export default function ViewSwitcher({ view, viewOptions, setView,
                                       sort, sortOptions, setSort }) {

  return (
    <div className='view-switcher'>
      <select
        className = 'sort-button'
        title     = 'Sort Albums'
        value     = {sort}
        onChange  = {e => setSort(e.target.value)}
      >
        {sortOptions.map(sortOption => (
          <option
            key={sortOption.value}
            value={sortOption.value}
            title={sortOption.value}
          >
            {sortOption.title}
          </option>
        ))}
      </select>
      <div className='separator-line' />
      <div className='views-container'>
        {viewOptions.map(viewOption => (
          <button
            key          = {viewOption.value}
            type         = 'button'
            title        = {viewOption.title}
            className    = {`button ${view === viewOption.value ? 'active' : ''}`}
            aria-pressed = {view === viewOption.value}
            onClick      = {() => setView(viewOption.value)}
          >
            <Icon icon={viewOption.icon} />
          </button>
        ))}
      </div>
      
    </div>
  )
}