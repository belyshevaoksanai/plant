import { Table } from "@/components/plants/table";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="w-full">
            <Suspense fallback={(<div>Loading...</div>)}>
                <Table />
            </Suspense>
        </div>
    )
}