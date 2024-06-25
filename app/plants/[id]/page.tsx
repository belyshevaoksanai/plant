import Form from '@/components/plants/edit-form';
import { fetchLocations, fetchPlantById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const locations = await fetchLocations();
    const [plant] = await Promise.all([
        fetchPlantById(id),
    ]);

    if (!plant) {
        notFound();
    }

    return (
        <main>
            <Form plant={plant} locations={locations} />
        </main>
    );
}