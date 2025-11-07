import '../styles/pictureFrame.css'
import '../styles/photoStream.css'
import '../styles/album.css'
import '../styles/board.css'

export default function AlbumHeader({ title, desc, date, numPhotos, textAlignment='left', underline=false}) {
  let underlined = 'no-underline'

  if (underline === true) {
    underlined = 'underlined'
  }

  return (
    <div className={`info-section ${underlined}`}>
      <h1 className={`title ${textAlignment}`}>
        {title}
      </h1>
      <div className={`album-data ${textAlignment}`}>
        <p className='data'>
          {date}
        </p>

        <div className='separator' />
        
        <p className='data'>
          {numPhotos} Photos
        </p>
      </div>
      <p className={`desc ${textAlignment}`}>
        {desc}
      </p>
    </div>
  )
}
