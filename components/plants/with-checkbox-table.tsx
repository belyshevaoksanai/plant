'use client'

import { IPlant } from "@/lib/definitions";

import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";
import { Checkbox } from "../checkbox";
import { Table as DataTable, ITable } from '../table';
import { useState } from "react";

const tableConfig = (onChange: (_plant: IPlant) => void): ITable<IPlant>['config'] => [
    {
        header: '',
        id: 'selector',
        getCell: (row) => <Checkbox onChange={() => onChange(row)} />,
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

import { createContext } from 'react';

export const SelectedContext = createContext<string[]>([]);

export function WithCheckboxTable({ plants }: { plants: IPlant[] }) {
    const [selected, setSelected] = useState<string[]>([]);

    const handleChangeCheckbox = (plant: IPlant) => {
        if (selected.includes(plant.id)) {
            setSelected(s => s.filter((id) => id !== plant.id))
        } else {
            setSelected(s => [...s, plant.id])
        }
    }

    return (
        <SelectedContext.Provider value={selected}>
            <div className="mt-6 flow-root">
                <div className="inline-block min-w-full align-middle">
                    <DataTable
                        data={plants}
                        config={tableConfig(handleChangeCheckbox)}
                        height="h-80"
                    />
                </div>
            </div>
        </SelectedContext.Provider>
    )
}
