import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePlant } from '@/lib/actions';

export function CreatePlant() {
  return (
    <Link
      href="/plants/create"
      className="flex h-10 items-center rounded-lg bg-green text-white px-4 text-sm font-medium transition-colors hover:bg-green-dark"
    >
      <span>Добавить растение</span>{' '}
      <PlusIcon className="h-5" />
    </Link>
  );
}

export function DeletePlant({ id }: { id: string }) {
  const deletePlantWithId = deletePlant.bind(null, id);

  return (
    <form action={deletePlantWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function EditPlant({ id }: { id: string }) {
  return (
    <Link
      href={`/plants/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}