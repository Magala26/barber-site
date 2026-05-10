import https from 'https';
import { storagePut } from '../storage';
import * as db from '../db';

interface InstagramPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: number;
}

/**
 * Fetch photos from Instagram using public API (no authentication required)
 * Falls back to using Instagram's public graph API
 */
export async function fetchInstagramPhotos(username: string): Promise<InstagramPhoto[]> {
  try {
    console.log(`[Instagram Sync] Fetching photos from @${username}...`);
    
    // Use Instagram's public API endpoint
    const url = `https://www.instagram.com/${username}/?__a=1`;
    
    const photos: InstagramPhoto[] = await new Promise((resolve, reject) => {
      https.get(url, { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const edges = json?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];
            
            const results = edges
              .filter((edge: any) => edge.node?.display_url)
              .slice(0, 12)
              .map((edge: any) => ({
                id: edge.node.id,
                url: edge.node.display_url,
                caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                timestamp: edge.node.taken_at_timestamp || Date.now() / 1000,
              }));
            
            resolve(results);
          } catch (e) {
            reject(new Error('Failed to parse Instagram response'));
          }
        });
      }).on('error', reject);
    });
    
    console.log(`[Instagram Sync] Found ${photos.length} photos`);
    return photos;
  } catch (error) {
    console.error('[Instagram Sync] Error fetching photos:', error);
    return [];
  }
}

/**
 * Download image from URL and upload to storage
 */
async function downloadAndUploadImage(imageUrl: string, title: string): Promise<{ key: string; url: string } | null> {
  try {
    const imageData = await new Promise<Buffer>((resolve, reject) => {
      https.get(imageUrl, { timeout: 10000 }, (res) => {
        const chunks: Buffer[] = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    });

    // Upload to storage
    const result = await storagePut(
      `instagram/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
      imageData,
      'image/jpeg'
    );

    return result;
  } catch (error) {
    console.error('[Instagram Sync] Error downloading image:', error);
    return null;
  }
}

/**
 * Sync Instagram photos to gallery
 */
export async function syncInstagramPhotos(username: string = 'section8studioss'): Promise<number> {
  try {
    console.log(`[Instagram Sync] Starting sync for @${username}...`);
    
    // Fetch photos from Instagram
    const photos = await fetchInstagramPhotos(username);
    
    if (photos.length === 0) {
      console.log('[Instagram Sync] No photos found');
      return 0;
    }

    let addedCount = 0;

    // Process each photo
    for (const photo of photos) {
      try {
        // Download and upload image
        const uploadResult = await downloadAndUploadImage(photo.url, photo.caption);
        
        if (!uploadResult) {
          console.log(`[Instagram Sync] Failed to upload image for post ${photo.id}`);
          continue;
        }

        // Extract title from caption (first 100 chars)
        const title = photo.caption.split('\n')[0].substring(0, 100) || `Section8Studios - ${new Date(photo.timestamp * 1000).toLocaleDateString()}`;
        const description = photo.caption.substring(0, 200);

        // Add to gallery
        await db.createGalleryImage({
          title,
          description,
          imageUrl: uploadResult.url,
          imageKey: uploadResult.key,
          displayOrder: Date.now(),
          isActive: true,
        });

        console.log(`[Instagram Sync] Added: ${title}`);
        addedCount++;
      } catch (error) {
        console.error(`[Instagram Sync] Error processing photo ${photo.id}:`, error);
      }
    }

    console.log(`[Instagram Sync] Sync complete. Added ${addedCount} photos.`);
    return addedCount;
  } catch (error) {
    console.error('[Instagram Sync] Sync failed:', error);
    return 0;
  }
}
