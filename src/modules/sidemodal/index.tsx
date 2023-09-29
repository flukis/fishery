import { ReactNode } from "react";

export default function SideModal({
  title = "Sidemodal",
  children,
  onClose,
  openModal,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  openModal: boolean;
}) {
  return openModal ? (
    <div className="side-modal-wrapper">
      <div className="side-modal-container">
        <div className="navigation">
          <button className="btn btn-danger-ghost" onClick={() => onClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
            <span className="sr-only">Close Modal</span>
          </button>
        </div>
        <div className="title">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
}
