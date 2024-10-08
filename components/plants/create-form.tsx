'use client';

import Link from 'next/link';
import { Button } from '@/components/button';
import { createPlant } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { ILocation } from '@/lib/definitions';

export default function Form({ locations }: { locations: ILocation[] }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createPlant, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
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
              />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
              />
            </div>
          </div>
          <div id="days_between_watering-error" aria-live="polite" aria-atomic="true">
            {state.errors?.days_between_watering &&
              state.errors.days_between_watering.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
              />
            </div>
          </div>
          <div id="watering_date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.watering_date &&
              state.errors.watering_date.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Location */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Локация
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="location"
                name="location_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="location-error"
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
          <div id="location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location_id &&
              state.errors.location_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
        <Button type="submit">Создать</Button>
      </div>
    </form>
  );
}
