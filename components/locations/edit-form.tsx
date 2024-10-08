'use client';

import Link from 'next/link';
import { Button } from '@/components/button';
import { updateLocation } from '@/lib/actions';
import { ILocation } from '@/lib/definitions';

export default function EditLocationForm({
  location
}: {
  location: ILocation;
}) {
  const updateLocationWithId = updateLocation.bind(null, location.id);

  return (
    <form action={updateLocationWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Название
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <input
                id="name"
                name="name"
                placeholder="Введите название"
                className="peer block w-full rounded-md border p-2 text-sm outline-2"
                aria-describedby="name-error"
                defaultValue={location.name}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/locations"
          className="flex h-10 items-center rounded-lg bg-green text-white px-4 text-sm font-medium transition-colors"
        >
          Отмена
        </Link>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
