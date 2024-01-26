import React, { Dispatch, SetStateAction, ReactNode } from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (box: boolean) => boolean | void;
  children: React.ReactNode; // Corrected typo here
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  children, // Corrected typo here
}) => {
  if (!modalOpen) return null;

  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <label
          htmlFor="my_modal_6"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
