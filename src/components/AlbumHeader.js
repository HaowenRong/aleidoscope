import '../styles/albumHeader.css'
import Thumbnail from './Thumbnail'
import MetadataBar from './MetadataBar'

export default function AlbumHeader({ title, desc, dataPoints, thumbnail,  }) {

  return (
    <div className={'album-header'}>
      <div className='album-info'>
        <h1 className={'title'}>{title}</h1>
        <p className={'desc'}>{desc}</p>
        <MetadataBar
          dataPoints={dataPoints}
        />
      </div>

      <Thumbnail thumbnail={thumbnail} />
    </div>
  )
}
