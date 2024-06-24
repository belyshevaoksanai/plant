import Form from '@/components/locations/edit-form';
import { fetchLocationById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [location] = await Promise.all([
        fetchLocationById(id),
    ]);

    if (!location) {
        notFound();
    }

    return (
        <main>
            <Form location={location} />
        </main>
    );
}