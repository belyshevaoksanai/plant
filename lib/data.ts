import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  IPlant,
  ILocation
} from './definitions';

export async function fetchPlants() {
  noStore();

  try {
    const data = await sql<IPlant>`
      SELECT
        plants.id,
        plants.name,
        plants.location_id,
        plants.watering_date,
        locations.name AS location
      FROM plants
      JOIN locations ON plants.location_id = locations.id`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant data.');
  }
}

export async function fetchPlantById(id: string) {
  noStore();

  try {
    const data = await sql<IPlant>`
      SELECT
        plants.id,
        plants.name,
        plants.location_id,
        plants.watering_date
      FROM plants
      WHERE plants.id = ${id};
    `;

    const plants = data.rows;

    return plants[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}


export async function fetchLocations() {
  noStore();

  try {
    const data = await sql<ILocation>`SELECT * FROM locations`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch location data.');
  }
}

export async function fetchLocationById(id: string) {
  noStore();

  try {
    const data = await sql<ILocation>`
      SELECT
        locations.id,
        locations.name
      FROM locations
      WHERE locations.id = ${id};
    `;

    const locations = data.rows;

    return locations[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch location.');
  }
}
