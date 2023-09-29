import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";

import InputSelect, { SelectOptions } from "../form/select";

const perPage: Array<SelectOptions> = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "25",
    value: 25,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "100",
    value: 100,
  },
];

export default function TableWithPagination({
  data,
  columns,
  renderedFilter,
  loading = false,
  raiseError = null,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  renderedFilter: ReactNode;
  loading: boolean;
  raiseError: string | null;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="table-wrapper">
      <div className="table-filter">
        {renderedFilter}
        <div>
          <InputSelect
            label="Data Per Halaman"
            placeholder="Select per Page"
            options={perPage}
            defaultValue={{
              label: String(table.getState().pagination.pageSize),
              value: String(table.getState().pagination.pageSize),
            }}
            callback={(v) => {
              table.setPageSize(Number(v));
            }}
            size="sm"
          />
        </div>
      </div>
      {loading ? (
        <div className="loading-progress">
          <span>Memuat data ...</span>
        </div>
      ) : raiseError ? (
        <div className="loading-progress">
          <span>{raiseError}</span>
        </div>
      ) : (
        <div className="overflow-x-scrollable">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        title="Urutkan berdasarkan"
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width:
                            header.getSize() !== 150
                              ? header.getSize()
                              : undefined,
                        }}
                        className={
                          {
                            asc: "asc",
                            desc: "desc",
                          }[header.column.getIsSorted() as string] ?? ""
                        }
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-pagination">
            <button
              className="prev"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span>Previous</span>
            </button>
            <span className="table-navigation">
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <button
              className="next"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
