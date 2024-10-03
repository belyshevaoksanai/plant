import { fetchPlants } from "@/lib/data";

import { WithCheckboxTable } from "./with-checkbox-table";


// Table - серверный компонент, получает данные таблицы Plant
export async function Table() {
    const plants = await fetchPlants();
    
    return (<WithCheckboxTable plants={plants}/>)
}
