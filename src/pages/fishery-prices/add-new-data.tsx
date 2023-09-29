import { useEffect, useState } from "react";
import SideModal from "../../modules/sidemodal";
import JsonToForm from "json-reactform";
import { useApiCall } from "../../utils/data/api-calls";
import { urlArea, urlSize } from "./loader";
import { saveData } from "./action";
import toast from "react-hot-toast";

export default function AddNewData() {
  const { isLoading: isLoadingArea, data: dataArea } = useApiCall(urlArea);
  const { isLoading: isLoadingSize, data: dataSize } = useApiCall(urlSize);
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
    if (!isLoadingArea && !isLoadingSize && dataArea && dataSize) {
      const options = (dataArea || []).map((d) => ({
        label: `${d.city}, ${d.province}`,
        value: `${d.city}#${d.province}`,
      }));
      const area = {
        type: "select",
        placeholder: "Pilih area",
        required: true,
        options: options || [],
      };

      const sizeoptions = (dataSize || []).map((d) => ({
        label: d.size,
        value: d.size,
      }));
      const size = {
        type: "select",
        placeholder: "Pilih ukuran",
        required: true,
        options: sizeoptions || [],
      };

      const newSchema = Object.assign(schema, {
        Area: area,
        Ukuran: size,
        Save: {
          type: "submit",
        },
      });
      setSchema(newSchema);
    }
  }, [dataArea, isLoadingArea, dataSize, isLoadingSize]);

  const handleSubmit = (params) => {
    const splittedArea = (params.Area.value || "#").split("#");
    saveData(
      params.Komoditas,
      splittedArea[0],
      splittedArea[1],
      params.Harga,
      params.Ukuran.value,
      () => {
        toast.success("Successfully created!");

        const delayInMilliseconds = 3000; //1 second

        setTimeout(function () {
          setOpenModal(false);
          if (window.location) {
            window.location.reload();
          }
        }, delayInMilliseconds);
      }
    );
  };

  return (
    <>
      <SideModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        title="Tambah Data Baru"
      >
        <JsonToForm model={schema} onSubmit={handleSubmit} />
      </SideModal>
      <button onClick={() => setOpenModal(true)} className="btn btn-primary">
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
