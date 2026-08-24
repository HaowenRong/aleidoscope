import '../styles/albumHeader.css'

export default function MetadataBar({ dataPoints = [], dataPointsBottom = [] }) {

  if (dataPoints.length === 0) return null;

  return (
    <div className='metadata-bar'>
      <div className='row'>
        {dataPoints.map((point, i) => (
          <div className='data-point' key={point.title ?? i}>
            <div className='label'>{point.title}</div>
            <div className='data'>{point.data}</div>
          </div>
        ))}
      </div>

      {dataPointsBottom.length > 0 && (
        <div className='row'>
          {dataPointsBottom.map((point, i) => (
            <div className='data-point bottom' key={point.title ?? i}>
              <div className='label'>{point.title}</div>
              <div className='data'>{point.data}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}