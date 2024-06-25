import Form from "@/components/plants/create-form";
import { fetchLocations } from "@/lib/data";

export default async function Page() {
    const locations = await fetchLocations();

    return (
        <main>
            <Form locations={locations} />
        </main>
    )
}