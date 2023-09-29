import { useEffect, useState } from "react";
import SideModal from "../../modules/sidemodal";
import JsonToForm from "json-reactform";
import { useApiCall } from "../../utils/data/api-calls";
import { urlArea } from "./loader";

export default function AddNewData() {
  const { isLoading: isLoadingArea, data: dataArea } = useApiCall(urlArea);
  const [openModal, setOpenModal] = useState(false);
  const [schema, setSchema] = useState({
    Komoditas: {
      type: "text",
      required: true,
      placeholder: "Masukan nama komoditas",
    },
    Harga: {
      type: "number",
      required: true,
      placeholder: "Masukan harga komoditas",
    },
  });

  useEffect(() => {
    const options = (dataArea || []).map((d) => ({
      label: `${d.city}, ${d.province}`,
      value: `${d.city}#${d.province}`,
    }));
    const area = {
      type: "text",
      required: true,
      options: options || [],
    };
    const newSchema = Object.assign(schema, { Area: area });
    setSchema(newSchema);
  }, [dataArea, isLoadingArea]);

  return (
    <>
      <SideModal
        openModal={openModal}
        onSave={() => console.log("Save")}
        onClose={() => setOpenModal(false)}
        title="Tambah Data Baru"
      >
        <JsonToForm model={schema} onSubmit={(v) => console.log(v)} />
      </SideModal>
      <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
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
    </>
  );
}
