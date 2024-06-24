import { CreateLocation } from "@/components/locations/buttons";
import { Table } from "@/components/locations/table";
import { Suspense } from "react";

export default function Page() {
    return (
        <>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <h1 className="font-semibold text-2xl">Список локаций</h1>
                <CreateLocation />
            </div>
            <div className="w-full">
                <Suspense fallback={(<div>Загрузка...</div>)}>
                    <Table />
                </Suspense>
            </div>
        </>
    )
}