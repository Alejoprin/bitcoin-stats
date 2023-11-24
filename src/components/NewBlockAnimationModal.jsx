import ReactDOM from "react-dom";
import { useContext } from "react";
import { BtcContext } from "../context/BtcContext";
import { motion } from "framer-motion";

const blockVariants = {
  initial: {
    opacity: 0,
    y: -300,
  },
  animate: {
    opacity: 1,
    y: 0,
    color: "#f7931a",
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 300,
    color: "#fff",
    transition: {
      ease: "anticipate",
      duration: 0.5,
    },
  },
};

export function NewBlockAnimationModal() {
  const { blockHeight } = useContext(BtcContext);

  return ReactDOM.createPortal(
    <div className="fixed grid place-content-center w-full h-full top-0 left-0 bg-gray-950/80">
      <div className="text-white">
        <p className="text-7xl font-bold mb-6"> - NUEVO BLOQUE MINADO - </p>
        <motion.p
          className="text-8xl font-bold text-center"
          variants={blockVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {blockHeight}
        </motion.p>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
