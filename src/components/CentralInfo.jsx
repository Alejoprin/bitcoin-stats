import { useContext, useEffect, useState } from "react";
import { BtcContext } from "../context/BtcContext";
import addNotification from "react-push-notification";
import btcLogo from "../assets/btcLogo.png";

export function CentralInfo() {
  const {
    blockHeight,
    feesRate,
    mempoolRate,
    difficultyChange,
    openBloqTimeModal,
    openTxAvgPriceModal,
    openTxUnconfirmedModal,
    openNewBlockAnimationModal,
    closeNewBlockAnimationModal,
  } = useContext(BtcContext);
  const [firstBlockHeight, setFirstBlockHeight] = useState(0);
  const [newBlockHeight, setNewBlockHeight] = useState(0);
  const [firstFeesRate, setFirstFeesRate] = useState({});
  const [newFeesRate, setNewFeesRate] = useState({});
  const [newFeesChangingEffect, setNewFeesChangingEffect] = useState(false);
  const [firstMempoolRate, setFirstMempoolRate] = useState({});
  const [newMempoolRate, setNewMempoolRate] = useState({});
  const [newMempoolRateChangingEffect, setMempoolRateChangingEffect] =
    useState(false);
  const [firstNextDiffAjust, setFirstNextDiffAjust] = useState({});
  const [newNextDiffAjust, setNewNextDiffAjust] = useState({});
  const [newNextDiffAjustChangingEffect, setNextDiffAjustChangingEffect] =
    useState(false);
  const [firstBlockData, setFirstBlockData] = useState({});

  // First Fetch
  useEffect(() => {
    // block height fetch
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/blocks/tip/height"
        );
        const data = await response.json();
        const blockHeight = data;
        setFirstBlockHeight(blockHeight);
        setNewBlockHeight(blockHeight);
      } catch (error) {
        console.log("Error fetching block height", error);
      }
    };
    fetchBlockHeight();

    // Fees Rate fetch
    const fetchFeesRate = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/fees/recommended"
        );
        const data = await response.json();
        const feesRate = data;
        setFirstFeesRate(feesRate);
        setNewFeesRate(feesRate);
      } catch (error) {
        console.log("Error fetching Fees Rate", error);
      }
    };
    fetchFeesRate();

    // Mempool Rate fetch
    const fetchMempoolRate = async () => {
      try {
        const response = await fetch("https://mempool.space/api/mempool");
        const data = await response.json();
        const mempoolRate = data;
        setFirstMempoolRate(mempoolRate);
        setNewMempoolRate(mempoolRate);
      } catch (error) {
        console.log("Error fetching Mempool Rata", error);
      }
    };
    fetchMempoolRate();

    // Prox ajust dif fetch
    const fetchNextDiffAjust = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/difficulty-adjustment"
        );
        const data = await response.json();
        const difficultyChange = data;
        setFirstNextDiffAjust(difficultyChange);
        setNewNextDiffAjust(difficultyChange);
      } catch (error) {
        console.log("Error fetching next diff ajust", error);
      }
    };
    fetchNextDiffAjust();

    // block data fetch
    if (firstBlockHeight) {
      const fetchFirstBlockData = async () => {
        try {
          const response = await fetch(
            `https://mempool.space/api/v1/blocks/${firstBlockHeight}`
          );
          const data = await response.json();
          const firstBlockData = data;
          setFirstBlockData(firstBlockData[0]);
        } catch (error) {
          console.log("Error fetching last block data", error);
        }
      };
      fetchFirstBlockData();
    }
  }, [firstBlockHeight, blockHeight]);

  // Block height animation
  if (newBlockHeight !== blockHeight) {
    // abrir modal
    if (blockHeight !== 0) {
      setNewBlockHeight(blockHeight);
      openNewBlockAnimationModal();
    }
    setTimeout(() => {
      closeNewBlockAnimationModal();
    }, 4000);
  }

  // fees rate animation
  if (feesRate !== null) {
    if (newFeesRate.fastestFee !== feesRate.fastestFee) {
      setNewFeesRate(feesRate);
      setNewFeesChangingEffect(true);
      setTimeout(() => {
        setNewFeesChangingEffect(false);
      }, 150);
    }
  }

  // Mempool rate animation
  if (mempoolRate !== null) {
    if (newMempoolRate.count !== mempoolRate.count) {
      setNewMempoolRate(mempoolRate);
      setMempoolRateChangingEffect(true);
      setTimeout(() => {
        setMempoolRateChangingEffect(false);
      }, 150);
    }
  }

  // Difficulty change animation
  if (difficultyChange !== null) {
    if (
      newNextDiffAjust.difficultyChange !== difficultyChange.difficultyChange
    ) {
      setNewNextDiffAjust(difficultyChange);
      setNextDiffAjustChangingEffect(true);
      setTimeout(() => {
        setNextDiffAjustChangingEffect(false);
      }, 150);
    }
  }

  const buttonClick = () => {
    addNotification({
      title: "Notificación para TXs sin confirmación",
      icon: btcLogo,
      duration: 5000,
      message: "Valor alcanzado: 100000",
      native: true,
    });
  };

  return (
    <div className="relative bottom-12 w-8/12 h-2/3 flex flex-col items-center justify-evenly text-center mx-auto my-0">
      {/* Titulo */}
      <div className="p-4">
        <div
          className="w-4 h-4 bg-green-400 rounded-full mx-auto my-0 shadow-green-400 shadow-md animate-pulse"
          onClick={buttonClick}
        ></div>
        <p className="text-2xl font-bold mt-4">BITCOIN STATS</p>
      </div>

      {/* info adicional de bloques */}
      <div className="flex justify-between w-4/5 p-4">
        <div className="cursor-pointer" onClick={openBloqTimeModal}>
          <p className="text-xs">TIEMPO POR BLOQUE</p>
          <p className="text-xl font-bold hover:text-orange-500 transition-colors duration-150 ease-in-out">
            9m
          </p>
          <p className="text-xs font-extrabold text-slate-400">META: 10 MIN</p>
        </div>
        <div className="px-6 border-x">
          <p className="text-xs">ÚLTIMAS 24 HORAS</p>
          <p className="text-xl font-bold">127 / 144</p>
          <p className="text-xs font-extrabold text-slate-400">BLOQUES</p>
        </div>
        <div>
          <p className="text-xs">PRÓX AJU DIF</p>
          <p
            className={`${
              newNextDiffAjustChangingEffect
                ? "text-slate-400 transition-colors duration-150 ease-in-out"
                : ""
            } text-xl font-bold`}
          >
            {" "}
            🔺
            {difficultyChange &&
            firstNextDiffAjust.difficultyChange !== undefined
              ? difficultyChange.difficultyChange.toFixed(2)
              : "3.62"}
            %
          </p>
          <p className="text-xs font-extrabold text-slate-400">
            EST NOV 26, 2023
          </p>
        </div>
      </div>

      {/* Altura bloque */}
      <div className="flex flex-col w-11/12 p-4">
        <div>
          <p className="text-xs">ALTURA DE BLOQUES</p>
        </div>
        <div>
          <p className="text-7xl font-bold mb-2">
            {blockHeight === 0 ? firstBlockHeight : blockHeight}
          </p>
        </div>
        <div className="flex justify-evenly">
          <p className="text-xs font-extrabold text-slate-400">6 MIN ATRÁS</p>
          <p
            className="text-xs font-extrabold text-slate-400 cursor-pointer hover:text-orange-500 transition-colors duration-150 ease-in-out"
            onClick={openTxAvgPriceModal}
          >
            AVG{" "}
            {firstBlockData?.extras?.avgFeeRate !== undefined
              ? firstBlockData.extras.avgFeeRate
              : "0"}{" "}
            s/vB
          </p>
          <p className="text-xs font-extrabold text-slate-400">
            {firstBlockData?.tx_count !== undefined
              ? firstBlockData.tx_count
              : "0"}{" "}
            TXS
          </p>
          <p className="text-xs font-extrabold text-slate-400">
            {firstBlockData?.size !== undefined
              ? (firstBlockData.size / 1000000).toFixed(2)
              : "0"}{" "}
            MB
          </p>
        </div>
      </div>

      {/* Tarifas */}
      <div className="flex flex-col items-center w-4/5 p-4">
        <div className="w-32 text-xs border rounded-lg mb-2">
          TARIFAS SATS/vB
        </div>
        <div className="flex justify-evenly w-full">
          <p className="text-xs">
            PRIORIDAD:{" "}
            <span
              className={`${
                newFeesChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-green-300 text-xl font-bold`}
            >
              {feesRate === null
                ? firstFeesRate.fastestFee
                : feesRate.fastestFee}
            </span>
          </p>
          <p className="text-xs">
            NORMAL:{" "}
            <span
              className={` ${
                newFeesChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-xl font-bold`}
            >
              {feesRate === null
                ? firstFeesRate.economyFee
                : feesRate.economyFee}
            </span>
          </p>
          <p className="text-xs text-red-500">
            PURGANDO:{" "}
            <span
              className={` ${
                newFeesChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-xl font-bold`}
            >
              {"<"}
              {feesRate === null
                ? firstFeesRate.minimumFee
                : feesRate.minimumFee}
            </span>{" "}
          </p>
        </div>
      </div>

      {/* Mempool */}
      <div className="flex flex-col items-center w-2/3 p-4">
        <div className="w-24 text-xs border rounded-lg mb-2">MEMPOOL</div>

        <div className="flex justify-evenly w-full">
          <div>
            <p className="text-xs">ENTRANDO</p>
            <p
              className={`${
                newMempoolRateChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-xl font-bold`}
            >
              {mempoolRate === null
                ? Math.trunc(firstMempoolRate.total_fee / 1000000)
                : Math.trunc(mempoolRate.total_fee / 1000000)}
            </p>
            <p className="text-xs font-extrabold text-slate-400">BTC</p>
          </div>
          <div
            className="px-6 border-x cursor-pointer"
            onClick={openTxUnconfirmedModal}
          >
            <p className="text-xs">SIN CONFIRMAR</p>
            <p
              className={`${
                newMempoolRateChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-xl font-bold hover:text-orange-500 transition-colors duration-150 ease-in-out`}
            >
              {mempoolRate === null
                ? firstMempoolRate.count
                : mempoolRate.count}
            </p>
            <p className="text-xs font-extrabold text-slate-400">
              TRANSACCIONES
            </p>
          </div>
          <div>
            <p className="text-xs">VOLUMEN</p>
            <p
              className={`${
                newMempoolRateChangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-xl font-bold text-red-500`}
            >
              ~
              {mempoolRate === null
                ? Math.trunc(firstMempoolRate.vsize / 1000000)
                : Math.trunc(mempoolRate.vsize / 1000000)}
            </p>
            <p className="text-xs font-extrabold text-slate-400">BLOQUES</p>
          </div>
        </div>
      </div>
    </div>
  );
}
