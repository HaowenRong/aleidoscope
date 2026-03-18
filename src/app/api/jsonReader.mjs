import { cache } from 'react';
import { readFile } from 'fs/promises';
import path from 'path';

export const getAlbums = cache(async () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'media', 'albums.json');
    const fileContents = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
});

export async function lookupAlbum(album) {
  const albumsJson = await getAlbums();
  const albums = albumsJson?.['albums'];
  return albums?.find((a) => a.albumName === album) ?? null;
}