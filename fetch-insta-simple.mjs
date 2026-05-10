import https from 'https';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getInstagramPhotos() {
  try {
    console.log('Attempting to fetch Section8Studios Instagram profile...');
    
    // Try to fetch the Instagram profile page
    const html = await fetchUrl('https://www.instagram.com/section8studioss/');
    
    // Extract image URLs from the HTML
    const imageRegex = /"display_url":"([^"]+)"/g;
    const matches = [...html.matchAll(imageRegex)];
    
    console.log(`Found ${matches.length} images`);
    
    const downloadDir = '/home/ubuntu/instagram_photos';
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }
    
    for (let i = 0; i < Math.min(matches.length, 6); i++) {
      const imageUrl = matches[i][1].replace(/\\\//g, '/');
      console.log(`Downloading image ${i + 1}: ${imageUrl.substring(0, 50)}...`);
      
      const imageData = await fetchUrl(imageUrl);
      const filename = `${downloadDir}/section8_${i + 1}.jpg`;
      fs.writeFileSync(filename, imageData, 'binary');
      console.log(`✓ Saved: ${filename}`);
    }
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getInstagramPhotos();
