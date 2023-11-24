import { useContext } from "react";
import { BtcContext } from "./context/BtcContext";
import { MainSection } from "./components/MainSection";
import { Aside } from "./components/Aside";
import { PriceModal } from "./components/PriceModal";
import { BloqTimeModal } from "./components/BloqTimeModal";
import { TxAvgPriceModal } from "./components/TxAvgPriceModal";
import { TxUnconfirmedModa } from "./components/TxUnconfirmedModa";
import { AnimatePresence } from "framer-motion";
import { NewBlockAnimationModal } from "./components/NewBlockAnimationModal";
import "./App.css";

function App() {
  const {
    priceModal,
    bloqTimeModal,
    txAvgPriceModal,
    txUnconfirmedModal,
    newBlockAnimationModal,
  } = useContext(BtcContext);

  return (
    // Background
    <main
      className={`${
        priceModal ||
        bloqTimeModal ||
        txAvgPriceModal ||
        txUnconfirmedModal ||
        newBlockAnimationModal
          ? "blur-sm"
          : ""
      } w-full h-screen bg-black text-white px-8 py-4`}
    >
      {/* Caja - Main y Aside */}
      <div className="w-full max-w-6xl h-full flex mx-auto">
        {/* Sección Principal */}
        <MainSection />

        {/* info lateral */}
        <Aside />

        {/* Modales */}
        <AnimatePresence>
          {priceModal && <PriceModal />}
          {bloqTimeModal && <BloqTimeModal />}
          {txAvgPriceModal && <TxAvgPriceModal />}
          {txUnconfirmedModal && <TxUnconfirmedModa />}
          {newBlockAnimationModal && <NewBlockAnimationModal />}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
