import ReactDOM from "react-dom";
import { useContext } from "react";
import { BtcContext } from "../context/BtcContext";
import { motion } from "framer-motion";

const modalVariants = {
  initial: {
    opacity: 0,
    y: -300,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -300,
    transition: {
      ease: "anticipate",
      duration: 0.5,
    },
  },
};

export function TxUnconfirmedModa() {
  const {
    closeTxUnconfirmedModal,
    newTxUnconfirmedNotification,
    setNewTxUnconfirmedNotification,
  } = useContext(BtcContext);

  const handleNewTxUnconfirmedNotification = (event) => {
    setNewTxUnconfirmedNotification(event.target.value);
  };

  const addTxUnconfirmedNotificationToLS = () => {
    localStorage.setItem(
      "TxUnconfirmedNotification",
      JSON.stringify(newTxUnconfirmedNotification)
    );

    closeTxUnconfirmedModal();
  };

  return ReactDOM.createPortal(
    <div className="fixed grid place-content-center w-full h-full top-0 left-0 bg-gray-950/80">
      <motion.section
        className="w-96 h-54 border rounded flex flex-col items-center p-6 bg-black text-white"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className="text-center mb-4 text-lg font-bold">
          🔔 NOTIFICACIÓN PARA TXs SIN CONFIRMACIÓN
        </p>
        <input
          type="number"
          className="w-32 p-1 border rounded bg-black uppercase mb-6 text-center"
          value={newTxUnconfirmedNotification}
          onChange={(event) => handleNewTxUnconfirmedNotification(event)}
        />
        <div className="w-full flex justify-evenly">
          <button
            className="text-xs border rounded-md py-2 px-5 hover:text-orange-500 hover:border-orange-500  transition-colors duration-150 ease-in-out"
            onClick={closeTxUnconfirmedModal}
          >
            CANCELAR
          </button>
          <button
            className="text-xs border rounded-md py-2 px-5 hover:text-orange-500 hover:border-orange-500  transition-colors duration-150 ease-in-out"
            onClick={addTxUnconfirmedNotificationToLS}
          >
            ACEPTAR
          </button>
        </div>
      </motion.section>
    </div>,
    document.getElementById("modal")
  );
}
