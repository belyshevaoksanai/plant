import { fetchLocations } from "@/lib/data";
import { DeleteLocation, EditLocation } from "./buttons";

export async function Table() {
    const locations = await fetchLocations();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr className="border border-green">
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Название
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Действия</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {locations?.map((location) => (
                                <tr
                                    key={location.id}
                                    className="w-full  border border-green"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{location.name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <DeleteLocation id={location.id} />
                                            <EditLocation id={location.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}