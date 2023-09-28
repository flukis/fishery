import { useMemo } from "react";
import Paper from "../../modules/paper";
import SelectWithTag from "../../modules/select-with-tag";
import TableWithPagination from "../../modules/table";
import useApiCall from "../../utils/data/api-calls";

import { type fisheryData } from "./loader";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "../../utils/helpers/format-date";
import { formatRupiah } from "../../utils/helpers/format-rupiah";

const url = `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list?limit=10&offset=0`;

export default function FisheryPricesPage() {
  const { isLoading, data, error } = useApiCall(url);

  const columnHelper = createColumnHelper<fisheryData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("komoditas", {
        cell: (info) => {
          return <div style={{ fontWeight: 600 }}>{info.getValue()}</div>;
        },
        header: () => "Komoditi",
      }),
      columnHelper.accessor("area_provinsi", {
        cell: ({ row: { original } }) => {
          return `${original.area_kota}, ${original.area_provinsi}`;
        },
        header: () => "Daerah",
      }),
      columnHelper.accessor("price", {
        cell: (info) => {
          return (
            <div
              style={{
                textAlign: "right",
                fontFamily: "mono",
              }}
            >
              {formatRupiah(info.getValue())}
            </div>
          );
        },
        header: () => <div style={{ textAlign: "right" }}>Harga</div>,
      }),
      columnHelper.accessor("size", {
        cell: (info) => {
          return <div style={{ textAlign: "right" }}>{info.getValue()}</div>;
        },
        header: () => <div style={{ textAlign: "right" }}>Ukuran</div>,
      }),
      columnHelper.accessor("tgl_parsed", {
        cell: (info) => {
          return (
            <div style={{ textAlign: "center" }}>
              {formatDate(info.getValue())}
            </div>
          );
        },
        header: () => <div style={{ textAlign: "center" }}>Tanggal</div>,
      }),
    ],
    []
  );

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
      <div className="paper__bodywrapper" style={{ marginBlock: "1.5rem" }}>
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
      <div>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Error"
        ) : (
          <TableWithPagination data={data} columns={columns} key="table" />
        )}
      </div>
    </Paper>
  );
}
