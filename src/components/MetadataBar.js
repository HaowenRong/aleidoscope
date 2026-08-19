import '../styles/albumHeader.css'

export default function MetadataBar({ dataPoints = [] }) {

  if (dataPoints.length === 0) return null;

  return (
    <div className="metadata-bar">
      {dataPoints.map((point, i) => (
        <div className="data-point" key={point.title ?? i}>
          <div className="label">{point.title}</div>
          <div className="data">{point.data}</div>
        </div>
      ))}
    </div>
  )
}