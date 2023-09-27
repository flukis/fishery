import Paper from "../../modules/paper";

export default function FisheryPricesPage() {
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
    </Paper>
  );
}
