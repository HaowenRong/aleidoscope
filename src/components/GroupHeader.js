import '../styles/albumHeader.css'

export default function GroupHeader({ title, desc }) {

  return (
    <div className='group-header'>
      <h1 className='title'>{title}</h1>
      <p className='desc'>{desc}</p>
    </div>
  )
}
