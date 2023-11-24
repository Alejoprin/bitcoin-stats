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

export function PriceModal() {
  const { closePriceModal, newPriceNotification, setNewPriceNotification } =
    useContext(BtcContext);

  const handleNewPriceNotification = (event) => {
    setNewPriceNotification(event.target.value);
  };

  const addPriceNotificationToLS = () => {
    localStorage.setItem(
      "priceNotification",
      JSON.stringify(newPriceNotification)
    );

    closePriceModal();
  };

  return ReactDOM.createPortal(
    <div className="fixed grid place-content-center w-full h-full top-0 left-0 bg-gray-950/80">
      <motion.section
        className="w-96 h-48 border rounded flex flex-col items-center p-6 bg-black text-white"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className="text-center mb-4 text-lg font-bold">
          🔔 NOTIFICACIÓN PARA PRECIO
        </p>
        <input
          type="number"
          className="w-32 p-1 my-auto border rounded bg-black uppercase mb-6 text-center"
          value={newPriceNotification}
          onChange={(event) => handleNewPriceNotification(event)}
        />
        <div className="w-full flex justify-evenly">
          <button
            className="text-xs border rounded-md py-2 px-5 hover:text-orange-500 hover:border-orange-500 transition-colors duration-150 ease-in-out"
            onClick={closePriceModal}
          >
            CANCELAR
          </button>
          <button
            className="text-xs border rounded-md py-2 px-5 hover:text-orange-500 hover:border-orange-500  transition-colors duration-150 ease-in-out"
            onClick={addPriceNotificationToLS}
          >
            ACEPTAR
          </button>
        </div>
      </motion.section>
    </div>,
    document.getElementById("modal")
  );
}
