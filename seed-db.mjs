import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function seedDatabase() {
  let connection;
  try {
    // Parse the DATABASE_URL
    const url = new URL(DATABASE_URL);
    const config = {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      port: url.port || 3306,
      ssl: { rejectUnauthorized: false },
    };

    connection = await mysql.createConnection(config);
    console.log('✓ Connected to database');

    // Seed services
    const services = [
      { name: 'Classic Haircut', description: 'Traditional haircut with precision styling', price: '35.00', durationMinutes: 30 },
      { name: 'Fade Haircut', description: 'Modern fade with clean lines and sharp edges', price: '40.00', durationMinutes: 35 },
      { name: 'Beard Trim', description: 'Professional beard trimming and shaping', price: '25.00', durationMinutes: 20 },
      { name: 'Haircut + Beard Combo', description: 'Complete grooming package with haircut and beard trim', price: '55.00', durationMinutes: 50 },
      { name: 'Hot Towel Shave', description: 'Luxurious straight razor shave with hot towel treatment', price: '45.00', durationMinutes: 40 },
      { name: 'Hair Styling', description: 'Professional styling for special occasions', price: '30.00', durationMinutes: 25 },
    ];

    for (const service of services) {
      await connection.execute(
        'INSERT INTO services (name, description, price, durationMinutes, isActive) VALUES (?, ?, ?, ?, true)',
        [service.name, service.description, service.price, service.durationMinutes]
      );
    }
    console.log(`✓ Seeded ${services.length} services`);

    // Seed operating hours
    const operatingHours = [
      { dayOfWeek: 0, openTime: '00:00', closeTime: '00:00', isClosed: true }, // Sunday
      { dayOfWeek: 1, openTime: '09:00', closeTime: '19:00', isClosed: false }, // Monday
      { dayOfWeek: 2, openTime: '09:00', closeTime: '19:00', isClosed: false }, // Tuesday
      { dayOfWeek: 3, openTime: '09:00', closeTime: '19:00', isClosed: false }, // Wednesday
      { dayOfWeek: 4, openTime: '09:00', closeTime: '19:00', isClosed: false }, // Thursday
      { dayOfWeek: 5, openTime: '09:00', closeTime: '19:00', isClosed: false }, // Friday
      { dayOfWeek: 6, openTime: '10:00', closeTime: '18:00', isClosed: false }, // Saturday
    ];

    for (const hours of operatingHours) {
      await connection.execute(
        'INSERT INTO operatingHours (dayOfWeek, openTime, closeTime, isClosed) VALUES (?, ?, ?, ?)',
        [hours.dayOfWeek, hours.openTime, hours.closeTime, hours.isClosed]
      );
    }
    console.log(`✓ Seeded operating hours for all days`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nServices added:');
    services.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.name} - $${s.price} (${s.durationMinutes} min)`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDatabase();
