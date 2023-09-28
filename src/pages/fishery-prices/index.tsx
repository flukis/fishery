import { useMemo } from "react";
import Paper from "../../modules/paper";
import SelectWithTag from "../../modules/select-with-tag";
import TableWithPagination from "../../modules/table";
import { useApiCall, useApiWebWorker } from "../../utils/data/api-calls";

import { type fisheryData } from "./loader";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "../../utils/helpers/format-date";
import { formatRupiah } from "../../utils/helpers/format-rupiah";
import { SelectOptions } from "../../modules/select";

const url = `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list`;
const urlArea = `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`;

export default function FisheryPricesPage() {
  const { isLoading, data, error } = useApiWebWorker(url);
  const {
    isLoading: idLoadingArea,
    data: dataArea,
    error: errorArea,
  } = useApiCall(urlArea);

  const formatedDataArea: Array<SelectOptions> = useMemo(() => {
    const buf = (dataArea || []).map((d: { province: string }) => ({
      value: d.province,
      label: d.province,
    }));
    return buf;
  }, [dataArea]);

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
      <div>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Error"
        ) : (
          <TableWithPagination
            data={data || []}
            columns={columns}
            key="table"
            renderedFilter={
              <div>
                <SelectWithTag
                  defaultValue={formatedDataArea[0]}
                  options={formatedDataArea}
                  callback={(val) => console.log(val)}
                />
              </div>
            }
          />
        )}
      </div>
    </Paper>
  );
}
