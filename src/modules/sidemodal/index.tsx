import { ReactNode } from "react";

export default function SideModal({
  title = "Sidemodal",
  children,
  onSave,
  onClose,
  openModal,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
  openModal: boolean;
}) {
  return openModal ? (
    <div className="side-modal-wrapper">
      <div className="side-modal-container">
        <div className="title">{title}</div>
        <div>{children}</div>
        <div className="navigation">
          <button className="btn btn-primary" onClick={() => onSave()}>
            Save
          </button>
          <button className="btn btn-danger-ghost" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
