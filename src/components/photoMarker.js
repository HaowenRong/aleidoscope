import L from 'leaflet';
import { getImageUrl } from '@/app/api/supabase';

import '../styles/atlas.css'

export function photoMarker({ coverPhoto, size = 100 }) {
  const iconUrl = getImageUrl(coverPhoto)

  return new L.DivIcon({
    className: 'marker-icon',
    html: `
      <div class='marker' style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        overflow: hidden;
        background: white;
      ">
        <img src="${iconUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    `,
    iconUrl,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}