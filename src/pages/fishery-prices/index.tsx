import { useEffect, useMemo, useState } from "react";
import Paper from "../../modules/paper";
import SelectWithTag from "../../modules/select-with-tag";
import TableWithPagination from "../../modules/table";
import { useApiCall, useApiWebWorker } from "../../utils/data/api-calls";

import { type fisheryData } from "./loader";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "../../utils/helpers/format-date";
import { formatRupiah } from "../../utils/helpers/format-rupiah";
import { SelectOptions } from "../../modules/select";
import { urlArea, urlData } from "./loader";

export default function FisheryPricesPage() {
  const { isLoading, data, error } = useApiWebWorker(urlData);
  const { isLoading: isLoadingArea, data: dataArea } = useApiCall(urlArea);

  const [filteredData, setFilteredData] = useState([]);
  const [filterProvinsi, setFilterProvinsi] = useState<Array<string>>([]);

  useEffect(() => {
    if (filterProvinsi.length == 0) {
      return setFilteredData(data || []);
    } else {
      const filtProv = (data || []).filter((d) =>
        filterProvinsi.includes(d.area_provinsi)
      );
      setFilteredData(filtProv);
    }
  }, [data, filterProvinsi]);

  const formatedDataArea: Array<SelectOptions> = useMemo(() => {
    const provinsi = (dataArea || []).map(({ province }) => province);

    const cleanedProvinsi = [...new Set(provinsi)];

    const buf = (cleanedProvinsi || []).map((p) => ({
      value: p,
      label: p,
    }));
    return buf;
  }, [dataArea]);

  const columnHelper = createColumnHelper<fisheryData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("komoditas", {
        size: 180,
        cell: (info) => {
          return <div style={{ fontWeight: 600 }}>{info.getValue()}</div>;
        },
        header: () => "Komoditi",
      }),
      columnHelper.accessor("area_provinsi", {
        size: 300,
        cell: ({ row: { original } }) => {
          return `${original.area_kota}, ${original.area_provinsi}`;
        },
        header: () => "Daerah",
      }),
      columnHelper.accessor("price", {
        size: 180,
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
            data={filteredData}
            columns={columns}
            key="table"
            renderedFilter={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SelectWithTag
                  defaultValue={formatedDataArea.map((opt) => opt.value)}
                  options={formatedDataArea}
                  callback={(v) => setFilterProvinsi(v)}
                  placeholder="Pilih Provinsi"
                  label="Filter berdasarkan Provinsi"
                  loading={isLoadingArea}
                />
              </div>
            }
          />
        )}
      </div>
    </Paper>
  );
}
