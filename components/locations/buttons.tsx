import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteLocation } from '@/lib/actions';

export function CreateLocation() {
  return (
    <Link
      href="/locations/create"
      className="flex h-10 items-center rounded-lg bg-green text-white px-4 text-sm font-medium transition-colors hover:bg-green-dark"
    >
      <span className="hidden md:block">Добавить локацию</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteLocation({ id }: { id: string }) {
  const deleteLocationWithId = deleteLocation.bind(null, id);

  return (
    <form action={deleteLocationWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function EditLocation({ id }: { id: string }) {
  return (
    <Link
      href={`/locations/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}