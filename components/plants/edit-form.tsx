'use client';

import Link from 'next/link';
import { Button } from '@/components/button';
import { updatePlant } from '@/lib/actions';
import { ILocation, IPlant } from '@/lib/definitions';

export default function EditPlantForm({
  plant,
  locations
}: {
  plant: IPlant;
  locations: ILocation[]
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
                className="peer block w-full rounded-md border p-2 text-sm outline-2"
                aria-describedby="name-error"
                defaultValue={plant.name}
              />
            </div>
          </div>
        </div>
        {/* DaysBetweenWatering */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Количество дней между поливами
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="days_between_watering"
                name="days_between_watering"
                placeholder="Введите количество дней между поливами"
                type="number"
                className="peer block w-full rounded-md border p-2 text-sm outline-2"
                aria-describedby="days_between_watering-error"
                defaultValue={plant.days_between_watering}
              />
            </div>
          </div>
        </div>
        {/* Date */}
        <div className="mb-4">
          <label htmlFor="watering_date" className="mb-2 block text-sm font-medium">
            Дата полива
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="watering_date"
                name="watering_date"
                className="peer block w-full rounded-md border p-2 text-sm outline-2"
                aria-describedby="watering_date-error"
                type="date"
                defaultValue={plant.watering_date}
              />
            </div>
          </div>
        </div>
        {/* Location Name */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Локация
          </label>
          <div className="relative">
            <select
              id="location"
              name="location_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={plant.location_id}
            >
              <option value="" disabled>
                Выберите локацию
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/plants"
          className="flex h-10 items-center rounded-lg bg-green text-white px-4 text-sm font-medium transition-colors"
        >
          Отмена
        </Link>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
