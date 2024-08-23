type ITable<T> = {
    config: {
        id: Extract<keyof T, string> | string;
        header: string;
        getCell?: (row: T) => React.ReactElement;
    }[];
    data?: T[];
};

export function Table<T extends { id: string }>({ config, data }: ITable<T>) {
    return (
        <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
                <tr className="border border-green">
                    {config.map((item) => (
                        <th
                            scope="col"
                            key={item.header}
                            className="px-4 py-5 font-medium sm:pl-6"
                        >
                            {item.header}
                        </th>)
                    )}
                </tr>
            </thead>
            <tbody className="bg-white">
                {data?.map((row) => {
                    return (
                        <tr
                            key={row.id}
                            className="w-full border border-green"
                        >
                            {
                                config.map((item) => {
                                    return (
                                        <td
                                            key={row.id + item.header}
                                            className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {item.getCell
                                                    ? item.getCell(row)
                                                    : item.id in row
                                                        ? row[item.id as keyof T]?.toString()
                                                        : ''}
                                            </div>
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
