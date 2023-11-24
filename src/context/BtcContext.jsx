import { createContext, useEffect, useState } from "react";

export const BtcContext = createContext();

export const BtcProvider = ({ children }) => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [satPrice, setSatPrice] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [feesRate, setFeesRate] = useState(null);
  const [mempoolRate, setMempoolRate] = useState(null);
  const [difficultyChange, setDifficultyChange] = useState(null);
  const [lastBlockData, setLastBlockData] = useState([]);

  const [priceModal, setPriceModal] = useState(false);
  const [bloqTimeModal, setBloqTimeModal] = useState(false);
  const [txAvgPriceModal, setTxAvgPriceModal] = useState(false);
  const [txUnconfirmedModal, setTxUnconfirmedModal] = useState(false);
  const [newBlockAnimationModal, setNewBlockAnimationModal] = useState(false);
  const [seconds, setSeconds] = useState(null);
  const [secondschangingEffect, setSecondsChangingEffect] = useState(false);
  const [newPriceNotification, setNewPriceNotification] = useState(0);
  const [newBloqTimeNotification, setNewBloqTimeNotification] = useState(0);
  const [newTxAvgPriceNotification, setNewTxAvgPriceNotification] = useState(0);
  const [newTxUnconfirmedNotification, setNewTxUnconfirmedNotification] =
    useState(0);

  let date = new Date();
  let fullDate = date.toDateString().slice(4);
  let day = date.toDateString().slice(0, -12);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let time = date.toLocaleTimeString();
  let timePeriod = date.toLocaleTimeString().slice(time.length - 2);

  // Updates control
  useEffect(() => {
    // Seconds
    const intervalSeconds = setInterval(() => {
      const newSeconds = date.getSeconds();

      if (newSeconds !== seconds) {
        setSecondsChangingEffect(true);
        setTimeout(() => {
          setSecondsChangingEffect(false);
        }, 150);
      }

      setSeconds(newSeconds);
    }, 1000);

    // BTC - SAT price update
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch(
          "https://criptoya.com/api/decrypto/btc/usd/1"
        );
        const data = await response.json();
        const price = data.totalBid;
        setBtcPrice(price);
        setSatPrice(Math.trunc((1 / price) * 100000000));
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };
    if (seconds === 10) {
      fetchBtcPrice();
    }

    // block height Update
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/blocks/tip/height"
        );
        const data = await response.json();
        const blockHeight = data;
        setBlockHeight(blockHeight);
      } catch (error) {
        console.log("Error fetching block height", error);
      }
    };
    if (seconds === 30) {
      fetchBlockHeight();
    }

    // Fees Rate Update
    const fetchFeesRate = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/fees/recommended"
        );
        const data = await response.json();
        const feesRate = data;
        setFeesRate(feesRate);
      } catch (error) {
        console.log("Error fetching block height", error);
      }
    };
    if (seconds === 40) {
      fetchFeesRate();
    }

    // Mempool Update
    const fetchMempoolRate = async () => {
      try {
        const response = await fetch("https://mempool.space/api/mempool");
        const data = await response.json();
        const mempoolRate = data;
        setMempoolRate(mempoolRate);
      } catch (error) {
        console.log("Error fetching block height", error);
      }
    };
    if (seconds === 50) {
      fetchMempoolRate();
    }

    // difficulty Change Update
    const fetchDifficultyChange = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/difficulty-adjustment"
        );
        const data = await response.json();
        const difficultyChange = data;
        setDifficultyChange(difficultyChange);
      } catch (error) {
        console.log("Error fetching difficulty change", error);
      }
    };
    if (seconds === 20) {
      fetchDifficultyChange();
    }

    // Last Block Data Update
    if (blockHeight) {
      const fetchLastBlockData = async () => {
        try {
          const response = await fetch(
            `https://mempool.space/api/v1/blocks/${blockHeight}`
          );
          const data = await response.json();
          const lastBlockData = data;
          setLastBlockData(lastBlockData);
        } catch (error) {
          console.log("Error fetching last block data", error);
        }
      };
      if (seconds === 5) {
        fetchLastBlockData();
      }
    }

    return () => clearInterval(intervalSeconds);
  }, [seconds]);

  const openPriceModal = () => {
    setPriceModal(true);
  };

  const closePriceModal = () => {
    setPriceModal(false);
  };

  const openBloqTimeModal = () => {
    setBloqTimeModal(true);
  };

  const closeBloqTimeModal = () => {
    setBloqTimeModal(false);
  };

  const openTxAvgPriceModal = () => {
    setTxAvgPriceModal(true);
  };

  const closeTxAvgPriceModal = () => {
    setTxAvgPriceModal(false);
  };

  const openTxUnconfirmedModal = () => {
    setTxUnconfirmedModal(true);
  };

  const closeTxUnconfirmedModal = () => {
    setTxUnconfirmedModal(false);
  };

  const openNewBlockAnimationModal = () => {
    setNewBlockAnimationModal(true);
  };

  const closeNewBlockAnimationModal = () => {
    setNewBlockAnimationModal(false);
  };

  const data = {
    btcPrice,
    satPrice,
    blockHeight,
    feesRate,
    mempoolRate,
    difficultyChange,
    lastBlockData,
    priceModal,
    openPriceModal,
    closePriceModal,
    bloqTimeModal,
    openBloqTimeModal,
    closeBloqTimeModal,
    txAvgPriceModal,
    openTxAvgPriceModal,
    closeTxAvgPriceModal,
    txUnconfirmedModal,
    openTxUnconfirmedModal,
    closeTxUnconfirmedModal,
    newBlockAnimationModal,
    openNewBlockAnimationModal,
    closeNewBlockAnimationModal,
    fullDate,
    day,
    hours,
    minutes,
    seconds,
    timePeriod,
    secondschangingEffect,
    newPriceNotification,
    setNewPriceNotification,
    newBloqTimeNotification,
    setNewBloqTimeNotification,
    newTxAvgPriceNotification,
    setNewTxAvgPriceNotification,
    newTxUnconfirmedNotification,
    setNewTxUnconfirmedNotification,
  };

  return <BtcContext.Provider value={data}>{children}</BtcContext.Provider>;
};
