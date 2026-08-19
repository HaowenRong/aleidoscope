'use client'
import '../styles/atlas.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { photoMarker } from './photoMarker';
import MarkerClusterGroup from 'react-leaflet-cluster';

function Map({ markerData, selectGroups, focus }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return
  }, [])

  useEffect(() => {
    setTimeout(() => {
      mapRef.current.invalidateSize()
    }, 200)
  }, [focus])

  const flyTo = useCallback((lat, long, zoom = 10, duration = 1.5) => {
    setTimeout(() => {
      mapRef.current.flyTo([lat, long], zoom, {
        duration: duration,
      })
    }, 200)
  }, [])

  const calcGroupCenter = useCallback((groups) => {
    const bounds = L.latLngBounds(groups.map(m => [m.lat, m.long]))
    const center = bounds.getCenter()
    const zoom   = mapRef.current.getBoundsZoom(bounds.pad(0.2), false)

    return {
      center: center,
      zoom:   zoom
    }
  }, [])

  const markers = useMemo(() => {
    return markerData.map((group) => ({
      group,
      icon: photoMarker({
        coverPhoto: `public/${group.album_url_name}/${group.url_name}/${group.cover_photo}`,
      }),
    }))
  }, [markerData])

  return (
    <MapContainer
      ref       = {mapRef}
      center    = {[35.0, 100.0]}
      zoom      = {3}
      style     = {{ width: '100%', height: '100%' }}
      minZoom   = {3}
      maxZoom   = {18}
      maxBounds = {[
        [-85, -Infinity],
        [85,   Infinity],
      ]}
      maxBoundsViscosity={1.0}
      worldCopyJump={true}
      zoomControl={false}
    >
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
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
              <div class='cluster' style='
                position: relative;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                border: 2px solid white;
              '>
                <img src='${firstImage}' style='width: 100%; height: 100%; object-fit: cover; display: block;' />
                <div style='
                  position: absolute;
                  bottom: 0; left: 0; right: 0;
                  color: white;
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
                  text-shadow: 0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6);
                  padding: 4px 0;
                '>${count}</div>
              </div>
            `,
            iconSize: [120, 120],
          })
        }}
        zoomToBoundsOnClick={false}
        eventHandlers={{
          clusterclick: (e) => {
            e.originalEvent?.stopPropagation()
            e.originalEvent?.stopImmediatePropagation()
            const clickedCluster = e.layer
            const childMarkers   = clickedCluster.getAllChildMarkers()
            const groups         = childMarkers.map(m => m.groupData)
            selectGroups(groups)

            const groupCenter = calcGroupCenter(groups)
            flyTo(groupCenter.center.lat, groupCenter.center.lng, groupCenter.zoom)
          }
        }}
      >
        {markers.map(({ group, icon }) => (
          <Marker
            key={group.id}
            position={[group.lat, group.long]}
            icon={icon}
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation()
                e.originalEvent?.stopImmediatePropagation()
                flyTo(group.lat, group.long)
                selectGroups([group])
              }
            }}
            ref={(marker) => {
              if (marker) marker.groupData = group
            }}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default memo(Map)
