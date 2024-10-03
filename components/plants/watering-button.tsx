'use client';
import { useContext } from "react";

import { updatePlantWateringDate } from "@/lib/actions";

import { Button } from "../button";
import { SelectedContext } from "./context";

export function WateringButton({ id, onResetSelected }: {
    id?: string;
    onResetSelected?: () => void
}) {
    const selected = useContext(SelectedContext);

    return (
        <Button onClick={() => {
            const currentDate = new Date();
            let date = '';
            date += currentDate.getFullYear() + '-';
            date += currentDate.getMonth() < 9 ? '0' : '';
            date += (currentDate.getMonth() + 1) + '-';
            date += currentDate.getDate() < 10 ? '0' : '';
            date += currentDate.getDate();
            if (!id) {
                selected.forEach((id) => {
                    updatePlantWateringDate(id, date);
                })
                onResetSelected?.();
            } else {
                updatePlantWateringDate(id, date);
            }
        }}>Полить</Button>
    )
}
