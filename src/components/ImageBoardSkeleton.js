import '../styles/loadingSkeletons.css'

export default function ImageBoardSkeleton({}) {
  return (
    <div className='groupBoardLoadingContainer'>
      <h1 className='title'></h1>
      <p className='desc'></p>
      <div className='imageBoard'>
        <div className='card' />
        <div className='card' />
        <div className='card' />
      </div>
    </div>
  )
}
