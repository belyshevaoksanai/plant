import { fetchPlants } from "@/lib/data";
import { IPlant } from "@/lib/definitions";

import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";
import { Checkbox } from "../checkbox";
import { Table as DataTable, ITable } from '../table';

const tableConfig: ITable<IPlant>['config'] = [
    {
        header: '',
        id: 'selector',
        getCell: () => <Checkbox />,
        align: 'center' as const
    }, {
        header: 'Название',
        id: 'name',
        align: 'center' as const
    }, {
        header: 'Дата полива',
        id: 'watering_date',
        align: 'center' as const
    }, {
        header: 'Действия',
        id: 'actions',
        getCell: (row: IPlant) => {
            const { watering_date, days_between_watering } = row;

            const msInDay = 24 * 60 * 60 * 1000;
            const wateringDate = new Date(watering_date).getTime() + days_between_watering * msInDay;
            const curDate = new Date().getTime();

            return (
                <div className="flex gap-3 justify-end">
                    {
                        wateringDate <= curDate && <WateringButton id={row.id} />
                    }
                    <DeletePlant id={row.id} />
                    <EditPlant id={row.id} />
                </div>
            )
        }
    }
]

export async function Table() {
    const plants = await fetchPlants();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                    <DataTable
                        data={plants}
                        config={tableConfig}
                        height="h-80"
                    />
            </div>
        </div>
    )
}
