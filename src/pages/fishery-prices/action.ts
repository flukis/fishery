import axios from "axios";
import { fisheryData, urlData } from "./loader";
import { v4 as uuidv4 } from "uuid";

async function saveData(
  komoditas: string,
  prov: string,
  city: string,
  price: number,
  size: number,
  callback: () => void
) {
  const uuid = uuidv4();
  const f: fisheryData = {
    uuid: uuid,
    komoditas: komoditas,
    area_kota: city,
    area_provinsi: prov,
    price: price,
    size: size,
    tgl_parsed: new Date(),
  };

  try {
    await axios.post(urlData, [f], {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  } finally {
    callback();
  }
}

export { saveData };
