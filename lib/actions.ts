'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


export type State = {
    errors?: {
        name?: string[];
        watering_date?: string;
        location_id?: string;
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    location_id: z.string({
        invalid_type_error: 'Выберите локацию',
    }),
    name: z.string({
        invalid_type_error: 'Введите имя',
    }),
    watering_date: z.string({
        invalid_type_error: 'Введите дату',
    }),
});

const CreatePlant = FormSchema.omit({ id: true });

export async function createPlant(prevState: State, formData: FormData) {

    const validatedFields = CreatePlant.safeParse({
        name: formData.get('name'),
        location_id: formData.get('location_id'),
        watering_date: formData.get('watering_date')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Ошибка создания',
        };
    }

    const { name, location_id, watering_date } = validatedFields.data;

    try {
        await sql`
        INSERT INTO plants (name, location_id, watering_date)
        VALUES (${name}, ${location_id}, ${watering_date})
        `;

    } catch (e) {
        return {
            message: 'Database Error: ошибка создания записи.',
        };
    }

    revalidatePath('/plants');
    redirect('/plants');
}

export async function deletePlant(id: string) {
    try {
        await sql`DELETE FROM plants WHERE id = ${id}`;
        revalidatePath('/plants');
        return { message: 'Deleted Plant' };
    } catch (e) {
        return {
            message: 'Database Error: Ошибка удаления.',
        };
    }
}

const UpdatePlant = FormSchema.omit({ id: true });

export async function updatePlant(id: string, formData: FormData) {
    const { name, location_id, watering_date } = UpdatePlant.parse({
        name: formData.get('name'),
        location_id: formData.get('location_id'),
        watering_date: formData.get('watering_date'),
    });

    try {
        await sql`
          UPDATE plants
          SET name = ${name}, location_id = ${location_id}, watering_date = ${watering_date}
          WHERE id = ${id}
        `;

    } catch (e) {
        return {
            message: 'Database Error: Failed to Update Plant.',
        };
    }
    revalidatePath('/plants');
    redirect('/plants');
}

export async function updatePlantWateringDate(id: string, date: string) {
    try {
        await sql`
          UPDATE plants
          SET watering_date = ${date}
          WHERE id = ${id}
        `;

    } catch (e) {
        return {
            message: 'Database Error: Failed to Update Plant.',
        };
    }
    revalidatePath('/plants');
}

export type LocationState = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

const LocationFormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Введите имя',
    })
});

const CreateLocation = LocationFormSchema.omit({ id: true });

export async function createLocation(prevState: State, formData: FormData) {

    const validatedFields = CreateLocation.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Ошибка создания',
        };
    }

    const { name } = validatedFields.data;

    try {
        await sql`
        INSERT INTO locations (name)
        VALUES (${name})
        `;

    } catch (e) {
        return {
            message: 'Database Error: ошибка создания записи.',
        };
    }

    revalidatePath('/locations');
    redirect('/locations');
}

export async function deleteLocation(id: string) {
    try {
        await sql`DELETE FROM locations WHERE id = ${id}`;
        revalidatePath('/locations');
        return { message: 'Deleted Location' };
    } catch (e) {
        return {
            message: 'Database Error: Ошибка удаления.',
        };
    }
}

const UpdateLocation = LocationFormSchema.omit({ id: true });

export async function updateLocation(id: string, formData: FormData) {
    const { name } = UpdateLocation.parse({
        name: formData.get('name')
    });

    try {
        await sql`
          UPDATE locations
          SET name = ${name}
          WHERE id = ${id}
        `;

    } catch (e) {
        return {
            message: 'Database Error: Failed to Update Location.',
        };
    }
    revalidatePath('/locations');
    redirect('/locations');
}