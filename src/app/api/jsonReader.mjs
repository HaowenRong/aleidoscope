import { cache } from "react";

export const getAlbums = cache(async () => {
  const response = await fetch('http://localhost:3000/media/albums.json');
  const albumJson = response.json();

  return albumJson;
})

export async function lookupAlbum(album) {
  const albumsJson = await getAlbums()
  const albums = albumsJson['albums']

  for (var i in albums) {
    const albumName = albums[i]['albumName']

    if (album == albumName) {
      return albums[i]
    }
  }

  return null
}