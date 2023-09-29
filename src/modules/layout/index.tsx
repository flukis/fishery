import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="wrapper">
      <div className="wrapper__header">
        <header className="layout-container">
          <div className="logo">
            <span>Fishery</span>
          </div>
        </header>
      </div>
      <div className="layout-container">
        <Outlet />
      </div>
      <footer>
        <p>for eFishery test assesment purposes.</p>
      </footer>
    </main>
  );
}
