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
