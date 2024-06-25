const { db } = require('@vercel/postgres');
const {
  plants,
  locations
} = require('../lib/placeholder-data.js');

async function seedPlants(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "plants" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS plants (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location_id UUID NOT NULL,
        watering_date VARCHAR(10) NOT NULL
      );
    `;

    console.log(`Created "plants" table`);

    // Insert data into the "plants" table
    const insertedPlants = await Promise.all(
      plants.map(async (plant) => {
        return client.sql`
        INSERT INTO plants (id, name, location_id, watering_date)
        VALUES (${plant.id}, ${plant.name}, ${plant.location_id}, ${plant.watering_date})
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

async function seedLocations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "locations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS locations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "locations" table`);

    // Insert data into the "locations" table
    const insertedLocations = await Promise.all(
      locations.map(async (location) => {
        return client.sql`
        INSERT INTO locations (id, name)
        VALUES (${location.id}, ${location.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedLocations.length} locations`);

    return {
      createTable,
      locations: insertedLocations,
    };
  } catch (error) {
    console.error('Error seeding locations:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedLocations(client);
  await seedPlants(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
