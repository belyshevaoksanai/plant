type ITable<T> = {
    config: {
        id: Extract<keyof T, string> | string;
        header: string;
        getCell?: (row: T) => React.ReactElement;
        align?: 'center' | 'left' | 'right';
    }[];
    data?: T[];
    height?: string;
};

export function Table<T extends { id: string }>({ config, data, height }: ITable<T>) {
    return (
        <div className={height}>
            <div className="h-full overflow-auto">
                <table className="min-w-full">
                    <thead className="font-normal">
                        <tr>
                            {config.map((item) => (
                                <th
                                    scope="col"
                                    key={item.header}
                                    className="font-medium bg-beige py-3 px-3 sticky top-0 z-50"
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
                                    className="w-full even:bg-green-light"
                                >
                                    {
                                        config.map((item) => {
                                            return (
                                                <td
                                                    key={row.id + item.header}
                                                    className={`border border-green py-1 px-3 text-${item.align || 'left'}`}
                                                >
                                                    {item.getCell
                                                        ? item.getCell(row)
                                                        : item.id in row
                                                            ? row[item.id as keyof T]?.toString()
                                                            : ''}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
