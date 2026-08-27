import '../styles/imageBoard.css'
import Image from 'next/image'
import { useEffect, useCallback } from 'react'

export default function LightBox({ imgArr, selected, setSelected }) {

  const prev = useCallback(() => {
    setSelected(i => (i === 0 ? 0 : i - 1))
  }, [setSelected])

  const next = useCallback(() => {
    setSelected(i => (i === imgArr.length - 1 ? imgArr.length - 1 : i + 1))
  }, [setSelected, imgArr.length])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape')     setSelected(null)
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selected])

  return (
    <div className='lightbox'>
      <div className='image-container' onClick={e => e.stopPropagation()}>
        <Image
          src={imgArr[selected].src}
          alt={`Image ${selected + 1}`}
          fill
          style={{ objectFit: 'contain' }}
        />

        <button className='lightbox-navi-btn left' onClick={ e => prev()}>‹</button>

        <div className='lightbox-navibar'>
          <div className='image-indicator'>
            <p className='count'>{selected + 1}</p>
            <p className=''>/</p>
            <p className='count'>{imgArr.length}</p>
          </div>
        </div>

        <button className='lightbox-navi-btn right' onClick={ e => next()}>›</button>

        <button className='lightbox-btn close' onClick={ e => setSelected(null)}>×</button>
      </div>
    </div>
  )
}
