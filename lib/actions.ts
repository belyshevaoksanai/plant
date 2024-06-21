'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


export type State = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Введите имя',
    })
});

const CreatePlant = FormSchema.omit({ id: true });

export async function createPlant(prevState: State, formData: FormData) {

    const validatedFields = CreatePlant.safeParse({
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
        INSERT INTO plants (name)
        VALUES (${name})
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
    const { name } = UpdatePlant.parse({
        name: formData.get('name')
    });

    try {
        await sql`
          UPDATE plants
          SET name = ${name}
          WHERE id = ${id}
        `;

    } catch (e) {
        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }
    revalidatePath('/plants');
    redirect('/plants');
}

