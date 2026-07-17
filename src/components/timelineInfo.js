
export default function TimelineInfo({ title, desc, date, numPhotos }) {

  return (
    <div className={'info-section }'}>
      <div className={'album-data'}>
        <p>{date}</p>
        <p className='separator'>·</p>
        <p>{numPhotos} Photos</p>
      </div>
      <div className='dot-mobile' />
      <h1 className={'title'}>
        {title}
      </h1>

      <p className={'desc'}>{desc}</p>
    </div>
  )
}
