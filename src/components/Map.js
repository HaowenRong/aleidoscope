'use client'
import '../styles/atlas.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { photoMarker } from './photoMarker';
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function Map({ markerData }) {
  const mapRef = useRef(null)

  const handleMarkerClick = (album) => {
    mapRef.current.flyTo([album.lat, album.long], 8, {
      duration: 1.5,
    })
  }

  return (
    <MapContainer
      ref       = {mapRef}
      center    = {[35.0, 100.0]}
      zoom      = {3}
      style     = {{ width: '100%', height: '100%' }}
      minZoom   = {2}
      maxZoom   = {18}
      maxBounds = {[
        [-85, -Infinity],
        [85,   Infinity],
      ]}
      maxBoundsViscosity={1.0}
      worldCopyJump={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />
      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={(cluster) => {
          const count      = cluster.getChildCount()
          const markers    = cluster.getAllChildMarkers()
          const firstImage = markers[0].options.icon.options.iconUrl

          return L.divIcon({
            className: 'icon-cluster',
            html: `
              <div class='cluster' style="
                position: relative;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                border: 2px solid white;
              ">
                <img src="${firstImage}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                <div style="
                  position: absolute;
                  bottom: 0; left: 0; right: 0;
                  color: white;
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
                  text-shadow: 0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6);
                  padding: 4px 0;
                ">${count}</div>
              </div>
            `,
            iconSize: [120, 120],
          })
        }}
      >
        {markerData.map((group) => {
          const customIcon = photoMarker({
            coverPhoto: `public/${group.album_url_name}/${group.title}/${group.cover_photo}`,
          })

          return (
            <Marker
              key={group.id}
              position={[group.lat, group.long]}
              icon={customIcon}
              eventHandlers={{ click: () => handleMarkerClick(group) }}
            />
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}