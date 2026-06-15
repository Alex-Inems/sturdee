"use client";

interface Column<T> {
    key: string;
    header: string;
    render: (row: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    rowKey: (row: T) => string;
}

export default function DataTable<T>({
    columns,
    data,
    emptyMessage = "No records found",
    rowKey,
}: DataTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-[13px]">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 ${col.className || ""}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-12 text-center text-gray-400"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={rowKey(row)}
                                    className="transition-colors hover:bg-gray-50/80"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`px-4 py-3 text-gray-700 ${col.className || ""}`}
                                        >
                                            {col.render(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {data.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
                    <p className="text-[11px] text-gray-500">
                        {data.length} row{data.length !== 1 ? "s" : ""}
                    </p>
                </div>
            )}
        </div>
    );
}
