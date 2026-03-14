import { put } from '@vercel/blob';
import { extname } from 'path';

export async function uploadToBlob(
  buffer: Buffer,
  folder: string,
  originalName: string,
): Promise<string> {
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filename = `${folder}/${unique}${extname(originalName)}`;
  const blob = await put(filename, buffer, { access: 'public' });
  return blob.url;
}
