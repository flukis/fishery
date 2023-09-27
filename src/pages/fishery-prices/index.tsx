import { useMemo } from "react";
import Paper from "../../modules/paper";
import SelectWithTag from "../../modules/select-with-tag";
import Separator from "../../modules/separator";

import { Person, makeData } from "../../modules/table/makeData";

import { ColumnDef } from "@tanstack/react-table";
import Table from "../../modules/table";

export default function FisheryPricesPage() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            footer: (props) => props.column.id,
          },
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const data = makeData(100000);
  return (
    <Paper>
      <div className="paper__titlewrapper">
        <h2 className="paper__title">Data Harga Perikanan</h2>
        <div className="paper__action">
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
            <span>Tambah Data</span>
          </button>
        </div>
      </div>
      <div className="paper__bodywrapper" style={{ marginTop: "1.25rem" }}>
        <span style={{ width: "100%" }} />
        <SelectWithTag
          defaultValue={[]}
          options={[
            { value: "option 1", label: "option 1" },
            { value: "option 2", label: "option 2" },
            { value: "option 3", label: "option 3" },
            { value: "option 4", label: "option 4" },
          ]}
          callback={(val) => console.log(val)}
        />
      </div>
      <Separator />
      <div>
        <>
          <Table
            {...{
              data,
              columns,
            }}
          />
        </>
      </div>
    </Paper>
  );
}
