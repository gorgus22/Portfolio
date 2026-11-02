import type { MediaItem } from '../data/projects';

// Estrae l'ID di un file Google Drive da un link di condivisione
export function getDriveId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Link di anteprima incorporabile per il lettore Drive
export function getDriveEmbedUrl(url: string | undefined): string {
  const id = getDriveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url || '';
}

// Estrae l'ID di un video YouTube (youtu.be, watch?v=, embed/, shorts/)
export function getYoutubeId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// Miniatura per un media: thumb manuale > YouTube > frame generato da Drive
export function getThumbnailUrl(item: MediaItem, width = 800): string | null {
  if (item.thumb) return item.thumb;
  if (item.type === 'youtube') {
    const id = getYoutubeId(item.url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  }
  if (item.type === 'drive' || item.type === 'image') {
    const id = getDriveId(item.url);
    if (id) return `https://lh3.googleusercontent.com/d/${id}=w${width}`;
    return item.type === 'image' ? item.url : null;
  }
  return null;
}

// Link di embed per post e reel Instagram (le storie/highlight non sono incorporabili)
export function getInstagramEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
}
