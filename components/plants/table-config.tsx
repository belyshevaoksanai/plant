import { useContext } from "react";
import { IPlant } from "@/lib/definitions";

import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";
import { ITable } from "../table";
import { Checkbox } from "../checkbox";
import { SelectedContext } from "./context";

// Чекбокс, который берет свое значение из контекста
function PlantCheckbox({plant}: {plant: IPlant}) {
    const { selected, onChangeCheckbox } = useContext(SelectedContext);
    return (
        <Checkbox
            onChange={() => onChangeCheckbox(plant)}
            checked={selected.includes(plant.id)}
        />
    )
}

// Конфиги для таблицы Plant
export const tableConfig: ITable<IPlant>['config'] = [
    {
        header: '',
        id: 'selector',
        getCell: (plant) => <PlantCheckbox plant={plant} />,
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
        header: <WateringButton />,
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