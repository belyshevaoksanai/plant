const { db } = require('@vercel/postgres');
const {
  plants
} = require('../lib/placeholder-data.js');

async function seedPlants(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "plants" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS plants (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "plants" table`);

    // Insert data into the "plants" table
    const insertedPlants = await Promise.all(
      plants.map(async (user) => {
        return client.sql`
        INSERT INTO plants (id, name)
        VALUES (${user.id}, ${user.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPlants.length} plants`);

    return {
      createTable,
      plants: insertedPlants,
    };
  } catch (error) {
    console.error('Error seeding plants:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPlants(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
