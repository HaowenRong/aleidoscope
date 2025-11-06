import { cache } from "react";

export const getAlbums = cache(async () => {
  const response = await fetch('http://localhost:3000/media/albums.json');

  if (!response.ok) {
    return null
  }

  const albumJson = await response.json();

  return albumJson;
})

export async function lookupAlbum(album) {
  const albumsJson = await getAlbums()
  const albums = albumsJson['albums']

  return albums.find(a => a.albumName === album) ?? null;
}