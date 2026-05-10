import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  await connection.execute(
    'INSERT INTO gallery_images (title, description, imageUrl, imageKey) VALUES (?, ?, ?, ?)',
    [
      'Section 8 Studios - Premium Fade',
      'Professional fade haircut showcasing expert barber technique and precision styling',
      '/manus-storage/hsrcutno.2_0f2f6989.jpeg',
      'hsrcutno.2_0f2f6989.jpeg'
    ]
  );
  console.log('✓ Image added to gallery successfully!');
} catch (error) {
  console.error('Error adding image:', error.message);
} finally {
  await connection.end();
}
