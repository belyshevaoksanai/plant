'use client'

import React from 'react';
import { IPlant } from "@/lib/definitions";

import { DeletePlant, EditPlant } from "./buttons";
import { WateringButton } from "./watering-button";
import { Checkbox } from "../checkbox";
import { Table as DataTable, ITable } from '../table';
import { useContext, useState } from "react";

function PlantCheckbox({plant, onChange}: {plant: IPlant, onChange: (_p: IPlant) => void}) {
    const selected = useContext(SelectedContext);
    return (
        <Checkbox
            onChange={() => onChange(plant)}
            checked={selected.includes(plant.id)}
        />
    )
}

const tableConfig = (onChange: (_plant: IPlant) => void, onResetSelected: () => void): ITable<IPlant>['config'] => [
    {
        header: '',
        id: 'selector',
        getCell: (plant) => <PlantCheckbox onChange={onChange} plant={plant} />,
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
        header: <WateringButton onResetSelected={onResetSelected} />,
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

    const handleResetSelected = () => {
        setSelected([]);
    }

    return (
        <SelectedContext.Provider value={selected}>
            <div className="mt-6 flow-root">
                <div className="inline-block min-w-full align-middle">
                    <DataTable
                        data={plants}
                        config={tableConfig(handleChangeCheckbox, handleResetSelected)}
                        height="h-80"
                    />
                </div>
            </div>
        </SelectedContext.Provider>
    )
}
