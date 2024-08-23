import { fetchPlants } from "@/lib/data";
import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";
import { Checkbox } from "../checkbox";
import { Table as DataTable } from '../table';
import { IPlant } from "@/lib/definitions";

const tableConfig = [
    {
        header: '',
        id: 'selector',
        getCell: () => <Checkbox />
    }, {
        header: 'Название',
        id: 'name'
    }, {
        header: 'Дата полива',
        id: 'watering_date',
    }, {
        header: 'Действия',
        id: 'actions',
        getCell: (row: IPlant) => {
            const { watering_date, days_between_watering } = row;

            const msInDay = 24 * 60 * 60 * 1000;
            const wateringDate = new Date(watering_date).getTime() + days_between_watering * msInDay;
            const curDate = new Date().getTime();

            return (
                <>
                    {
                        wateringDate <= curDate && <WateringButton id={row.id} />
                    }
                    <DeletePlant id={row.id} />
                    <EditPlant id={row.id} />
                </>
            )
        }
    }
]

export async function Table() {
    const plants = await fetchPlants();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">
                    <DataTable
                        data={plants}
                        config={tableConfig}
                    />
                </div>
            </div>
        </div>
    )
}