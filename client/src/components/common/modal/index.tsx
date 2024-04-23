import React, { Dispatch } from "react";

type ModalProps = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

function Modal({ setShowModal, children }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="min-w-1/5 bg-white rounded-lg p-8 flex flex-col gap-4">
        {children}
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
