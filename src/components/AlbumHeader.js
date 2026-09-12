import '../styles/albumHeader.css'
import Thumbnail from './Thumbnail'
import MetadataBar from './MetadataBar'
import NavigationBtn from './NavigationBtn'

export default function AlbumHeader({ title, desc, album, dataPoints, thumbnail }) {

  return (
    <div className={'album-header'}>
      <div className='album-info'>
        <h1 className={'title'}>{title}</h1>
        <p className={'desc'}>{desc}</p>
        <MetadataBar
          dataPoints={dataPoints}
        />
        <NavigationBtn icon='solar:earth-bold' href={{ pathname: '/atlas', query: { album: album } }} text='View on map'  />
      </div>

      <Thumbnail thumbnail={thumbnail} />
    </div>
  )
}
