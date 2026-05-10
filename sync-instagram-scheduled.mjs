/**
 * Scheduled task to sync Instagram photos daily
 * This runs as a separate Manus scheduled task
 * Endpoint: POST $SCHEDULED_TASK_ENDPOINT_BASE/api/scheduled/instagram-sync
 */

import https from 'https';

async function triggerInstagramSync() {
  return new Promise((resolve, reject) => {
    const endpoint = process.env.SCHEDULED_TASK_ENDPOINT_BASE;
    const cookie = process.env.SCHEDULED_TASK_COOKIE;

    if (!endpoint || !cookie) {
      console.error('Missing SCHEDULED_TASK_ENDPOINT_BASE or SCHEDULED_TASK_COOKIE');
      reject(new Error('Missing environment variables'));
      return;
    }

    const url = new URL('/api/scheduled/instagram-sync', endpoint);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `app_session_id=${cookie}`,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[Instagram Sync] Response status: ${res.statusCode}`);
        console.log(`[Instagram Sync] Response: ${data}`);
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.error('[Instagram Sync] Request error:', error);
      reject(error);
    });

    req.write(JSON.stringify({ action: 'sync' }));
    req.end();
  });
}

// Main execution
triggerInstagramSync()
  .then((result) => {
    console.log('[Instagram Sync] Task completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('[Instagram Sync] Task failed:', error);
    process.exit(1);
  });
