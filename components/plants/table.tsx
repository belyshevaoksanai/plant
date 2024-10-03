import { fetchPlants } from "@/lib/data";

import { WithCheckboxTable } from "./with-checkbox-table";

export async function Table() {
    const plants = await fetchPlants();
    
    return (<WithCheckboxTable plants={plants}/>)
}
