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
import InputSearch from "../../modules/search";
import AddNewData from "./add-new-data";
import useCheckMobileScreen from "../../utils/screen/check-is-mobile";

export default function FisheryPricesPage() {
  const { isLoading, data, error } = useApiCall(urlData);
  const { isLoading: isLoadingArea, data: dataArea } = useApiCall(urlArea);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState<Array<string>>([]);

  useEffect(() => {
    if (filterProvinsi.length == 0) {
      if (search === "") return setFilteredData(data || []);

      const temp = (data || []).filter(
        (d) =>
          (d.area_provinsi || "").includes(search) ||
          (d.komoditas || "").includes(search) ||
          (d.area_kota || "").includes(search)
      );

      return setFilteredData(temp || []);
    } else {
      if (search === "") {
        const filtProv = (data || []).filter((d) =>
          filterProvinsi.includes(d.area_provinsi)
        );

        return setFilteredData(filtProv);
      }
      const filtProv = (data || []).filter(
        (d) =>
          filterProvinsi.includes(d.area_provinsi) &&
          ((d.area_provinsi || "").includes(search) ||
            (d.komoditas || "").includes(search) ||
            (d.area_kota || "").includes(search))
      );

      return setFilteredData(filtProv);
    }
  }, [data, filterProvinsi, search]);

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

  const isMobile = useCheckMobileScreen();

  const columns = useMemo(() => {
    return isMobile
      ? [
          columnHelper.accessor("area_provinsi", {
            cell: ({ row: { original } }) => {
              return (
                <div>
                  <span>
                    <strong>{original.komoditas}</strong>
                    {` ukuran `}
                    <b>{original.size}</b>
                  </span>
                  <br />
                  <span style={{ fontSize: ".75rem" }}>
                    {`${original.area_kota}, ${original.area_provinsi}`}
                  </span>
                </div>
              );
            },
            header: () => "Komoditas",
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
        ]
      : [
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
              return (
                <div style={{ textAlign: "right" }}>{info.getValue()}</div>
              );
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
        ];
  }, []);

  return (
    <Paper>
      <div className="paper__titlewrapper">
        <h2 className="paper__title">Data Harga Perikanan</h2>
        <div className="paper__action">
          <AddNewData />
        </div>
      </div>
      <div>
        <TableWithPagination
          data={filteredData}
          columns={columns}
          key="table"
          loading={isLoading}
          raiseError={error}
          renderedFilter={
            <div className="fishery-table-filter">
              <div>
                <InputSearch
                  label="Pencarian"
                  callback={(v) => setSearch((String(v) || "").toUpperCase())}
                />
                <span style={{ fontSize: 13, marginTop: 8, color: "gray" }}>
                  ... ditemukan{" "}
                  <strong style={{ color: "#212121" }}>
                    {filteredData.length}
                  </strong>{" "}
                  data
                </span>
              </div>
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
      </div>
    </Paper>
  );
}
