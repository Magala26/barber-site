import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  await connection.execute(
    'INSERT INTO gallery_images (title, description, imageUrl, imageKey) VALUES (?, ?, ?, ?)',
    [
      'Section 8 Studios - Premium Fade',
      'Professional fade haircut showcasing expert barber technique and precision styling',
      '/assets/gallery-premium-fade-placeholder.svg',
      'gallery-premium-fade-placeholder.svg'
    ]
  );
  console.log('✓ Image added to gallery successfully!');
} catch (error) {
  console.error('Error adding image:', error.message);
} finally {
  await connection.end();
}
