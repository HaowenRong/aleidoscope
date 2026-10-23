'use client'

import '../styles/layout.css'
import '../styles/timeline.css'
import { Icon } from '@iconify/react'

export default function ViewSwitcher({ view, setView, setSort }) {

  const options = [
    { value: 'timeline', title: 'Timeline View', icon: 'mingcute:timeline-fill'},
    { value: 'grid',     title: 'Grid View',     icon: 'mingcute:grid-fill'    }
  ]

  return (
    <div className='view-switcher'>
      {options.map(option => (
        <button
          key          = {option.value}
          type         = 'button'
          title        = 'Grid view'
          className    = {`button ${view === option.value ? 'active' : ''}`}
          aria-pressed = {view === option.value}
          onClick      = {() => setView(option.value)}
        >
          <Icon icon={option.icon} />
        </button>
      ))}
    </div>
  )
}