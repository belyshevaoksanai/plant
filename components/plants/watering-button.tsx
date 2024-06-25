'use client';

import { updatePlantWateringDate } from "@/lib/actions";
import { Button } from "../button";

export function WateringButton({ id }: {
    id: string
}) {
    return (
        <Button onClick={() => {
            const currentDate = new Date();
            let date = '';
            date += currentDate.getFullYear() + '-';
            date += currentDate.getMonth() < 10 ? '0' : '';
            date += currentDate.getMonth() + '-';
            date += currentDate.getDate() < 10 ? '0' : '';
            date += currentDate.getDate();
            updatePlantWateringDate(id, date);
        }}>Полить</Button>
    )
}
