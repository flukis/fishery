type fisheryData = {
  uuid: string;
  komoditas: string;
  area_provinsi: string;
  area_kota: string;
  size: number;
  price: number;
  tgl_parsed: Date;
};
const urlData = `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list`;
const urlArea = `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`;

export { type fisheryData, urlData, urlArea };
