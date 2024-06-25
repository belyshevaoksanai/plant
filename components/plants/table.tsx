import { fetchPlants } from "@/lib/data";
import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";

export async function Table() {
    const plants = await fetchPlants();

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
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Дата полива
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Локация
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Действия</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {plants?.map((plant) => {
                                return (
                                    <tr
                                        key={plant.id}
                                        className="w-full  border border-green"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <p>{plant.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <p>{plant.watering_date}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <p>{plant.location}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <WateringButton id={plant.id} />
                                                <DeletePlant id={plant.id} />
                                                <EditPlant id={plant.id} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}