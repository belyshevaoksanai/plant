'use client';

import {
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/button';
import { updatePlant } from '@/lib/actions';
import { IPlant } from '@/lib/definitions';

export default function EditInvoiceForm({
  plant
}: {
  plant: IPlant;
}) {
  const updatePlantWithId = updatePlant.bind(null, plant.id);

  return (
    <form action={updatePlantWithId}>
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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={plant.name}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/plants"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
