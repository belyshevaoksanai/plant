import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  IPlant
} from './definitions';


export async function fetchPlants() {
  noStore();

  try {
    const data = await sql<IPlant>`SELECT * FROM plants`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}


export async function fetchPlantById(id: string) {
  noStore();

  try {
    const data = await sql<IPlant>`
      SELECT
        plants.id,
        plants.name
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
