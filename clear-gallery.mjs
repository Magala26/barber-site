import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
await connection.execute('DELETE FROM gallery_images');
console.log('Gallery cleared successfully');
await connection.end();
