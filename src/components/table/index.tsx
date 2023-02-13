import React from "react";

import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

import { Table as BoostrapTable } from "react-bootstrap";

type Props<DataRow> = {
    data: DataRow[];
    columns: ColumnDef<DataRow, any>[];
    isLoading: boolean;
}

function Table<DataRow>(props: Props<DataRow>) {
    const { data, columns, isLoading } =
        props;

    const enableSorting = true;
    const manualSorting = false;

    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },

        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting,
        enableSorting,
        //
        debugTable: false,
    });

    return (
        <div>
            <BoostrapTable
                className="mb-0"
            >
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    role={header.column.getCanSort() ? "button" : undefined}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {{
                                                asc: " 🔼",
                                                desc: " 🔽",
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
                </thead>
                <tbody style={{ opacity: isLoading ? 0.5 : 1 }}>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td className="align-middle" key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
                <tfoot className="tfoot">
                {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </BoostrapTable>
        </div>
    );
}

export default Table;
