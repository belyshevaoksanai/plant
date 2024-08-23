import { fetchLocations } from "@/lib/data";
import { DeleteLocation, EditLocation } from "./buttons";
import { Table as DataTable } from '../table';
import { ILocation } from "@/lib/definitions";

const config = [
    {
        header: "Название",
        id: "name"
    }, {
        header: "Действия",
        id: 'action',
        getCell: (row: ILocation) => {
            return (
                <>
                    <DeleteLocation id={row.id} />
                    <EditLocation id={row.id} />
                </>
            )
        }
    }
]

export async function Table() {
    const locations = await fetchLocations();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">
                    <DataTable
                        config={config}
                        data={locations}
                    />
                </div>
            </div>
        </div>
    )
}