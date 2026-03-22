
export default function HighlightInfo({ title, desc, date, numPhotos }) {

  return (
    <div className={'info-section }'}>
      <div className={'album-data'}>
        <p className='data'>{date}</p>
        <p className='separator'>·</p>
        <p className='data'>{numPhotos} Photos</p>
      </div>

      <h1 className={'title'}>{title}</h1>

      <p className={'desc'}>{desc}</p>
    </div>
  )
}
