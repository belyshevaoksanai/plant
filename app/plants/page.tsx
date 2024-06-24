import { CreatePlant } from "@/components/plants/buttons";
import { Table } from "@/components/plants/table";
import { Suspense } from "react";

export default function Page() {
    return (
        <>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <h1 className="font-semibold text-2xl">Список растений</h1>
                <CreatePlant />
            </div>
            <div className="w-full">
                <Suspense fallback={(<div>Loading...</div>)}>
                    <Table />
                </Suspense>
            </div>
        </>
    )
}