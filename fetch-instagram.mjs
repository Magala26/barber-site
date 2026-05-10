import Instagram from 'instagram-web-api';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ig = new Instagram();

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function fetchInstagramPhotos() {
  try {
    console.log('Fetching photos from @section8studioss...');
    
    // Login (using guest mode for public data)
    await ig.login({ username: 'guest', password: 'guest' });
    
    // Get user info
    const user = await ig.getUserByUsername('section8studioss');
    console.log(`Found user: ${user.username}`);
    
    // Get user's posts
    const posts = await ig.getUserPosts({ userId: user.id, first: 12 });
    console.log(`Found ${posts.edges.length} posts`);
    
    const downloadDir = '/home/ubuntu/instagram_photos';
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }
    
    const photos = [];
    for (let i = 0; i < Math.min(posts.edges.length, 6); i++) {
      const post = posts.edges[i].node;
      if (post.display_url) {
        const filename = `${downloadDir}/section8_${i + 1}.jpg`;
        console.log(`Downloading photo ${i + 1}...`);
        await downloadImage(post.display_url, filename);
        photos.push({
          title: post.edge_media_to_caption.edges[0]?.node?.text || `Section8Studios Photo ${i + 1}`,
          description: post.edge_media_to_caption.edges[0]?.node?.text?.substring(0, 100) || 'Premium barbershop service',
          filename: filename,
        });
      }
    }
    
    console.log(`Downloaded ${photos.length} photos`);
    return photos;
  } catch (error) {
    console.error('Error fetching Instagram photos:', error.message);
    throw error;
  }
}

fetchInstagramPhotos().catch(console.error);
