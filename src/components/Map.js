'use client'
import '../styles/atlas.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { useRef, useEffect, useState, useMemo, memo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, AttributionControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { photoMarker } from './photoMarker';
import MarkerClusterGroup from 'react-leaflet-cluster';

function MapInstanceCapture({ mapRef, onReady }) {
  const map = useMap()

  useEffect(() => {
    mapRef.current = map
    onReady()
  }, [map, mapRef, onReady])
}

function Map({ markerData, selectedGroups, selectGroups }) {
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef(null)

  // fly to location of selected groups on groups change
  useEffect(() => {
    if (selectedGroups.length < 1) return

    const groupCenter = calcGroupCenter(selectedGroups)
    flyTo(groupCenter.center.lat, groupCenter.center.lng, groupCenter.zoom)
  }, [selectedGroups])

  // resize map on container resize
  useEffect(() => {
    if (!mapReady) return
    
    const container = mapRef.current?.getContainer?.()
    if (!container) return

    const observer = new ResizeObserver(() => {
      mapRef.current?.invalidateSize()
    })
    observer.observe(container)

    return () => observer.disconnect()
  }, [mapReady])

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
        coverPhoto: `public/${group.album_url_name}/${group.url_name}/_marker.jpg`,
      }),
    }))
  }, [markerData])

  return (
    <MapContainer
      center    = {[35.0, 100.0]}
      zoom      = {3}
      style     = {{ width: '100%', height: '100%', zIndex: 0 }}
      minZoom   = {3}
      maxZoom   = {18}
      maxBounds = {[
        [-85, -Infinity],
        [85,   Infinity],
      ]}
      maxBoundsViscosity={1.0}
      worldCopyJump={true}
      zoomControl={false}
      attributionControl={false}
    >
      <MapInstanceCapture mapRef={mapRef} onReady={() => setMapReady(true)} />
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />
      <AttributionControl position="topright" />
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
