import { useContext, useEffect, useState } from "react";
import { BtcContext } from "../context/BtcContext";

export function TopInfo() {
  const { btcPrice, satPrice, openPriceModal } = useContext(BtcContext);
  const [firstBtcPrice, setFirstBtcPrice] = useState(0);
  const [firstSatPrice, setFirstSatPrice] = useState(0);
  const [newBtcPrice, setNewBtcPrice] = useState(0);
  const [btcPricechangingEffect, setBtcPricechangingEffect] = useState(false);
  const [satPricechangingEffect, setSatPricechangingEffect] = useState(false);

  // first btc - sat price fetch
  useEffect(() => {
    const fetchFirstBtcPrice = async () => {
      try {
        const response = await fetch(
          "https://criptoya.com/api/decrypto/btc/usd/1"
        );
        const data = await response.json();
        const price = data.totalBid;
        setFirstBtcPrice(price);
        setNewBtcPrice(price);
        setFirstSatPrice(Math.trunc((1 / price) * 100000000));
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchFirstBtcPrice();
  }, []);

  // Btc - sat price effect
  if (newBtcPrice !== btcPrice) {
    setBtcPricechangingEffect(true);
    setSatPricechangingEffect(true);
    setNewBtcPrice(btcPrice);
    setTimeout(() => {
      setBtcPricechangingEffect(false);
      setSatPricechangingEffect(false);
    }, 150);
  }

  return (
    <div className="w-full h-56 flex justify-between">
      {/* Epoca - Suministro - subsidio*/}
      <div className="w-80 h-full flex flex-col justify-between p-4">
        <div className="flex justify-between ">
          <div>
            <p className="text-xs">ÉPOCA</p>
            <p className="text-7xl font-bold font-serif">IV</p>
          </div>
          <div className="mr-4">
            <p className="text-xs">SUMINISTRO</p>
            <p className="text-2xl font-bold">₿ 19.55M</p>
            <p className="text-xl font-bold">
              93.10%{" "}
              <span className="text-xs font-extrabold text-slate-400">
                de 21M
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs">SUBSIDIO</p>
          <p className="text-xl font-bold">₿ 6.25</p>
          <p className="text-xs font-extrabold text-slate-400">POR BLOQUE</p>
        </div>
      </div>

      {/* info precios - capitalización */}
      <div className="w-60 h-full flex flex-col justify-between p-4 text-right">
        <div className="flex flex-col cursor-pointer" onClick={openPriceModal}>
          <p className="text-xs">INTERCAMBIO</p>
          <p
            className={`${
              btcPricechangingEffect
                ? "text-slate-400 transition-colors duration-150 ease-in-out"
                : ""
            } text-2xl font-bold hover:text-orange-500 transition-colors duration-150 ease-in-out`}
          >
            {btcPrice === 0 ? Math.trunc(firstBtcPrice) : Math.trunc(btcPrice)}
          </p>
          <p className="text-xs font-extrabold text-slate-400">USD / BTC</p>
        </div>
        <div className="flex flex-col">
          <p
            className={`${
              satPricechangingEffect
                ? "text-slate-400 transition-colors duration-150 ease-in-out"
                : ""
            } text-2xl font-bold`}
          >
            {satPrice === 0 ? Math.trunc(firstSatPrice) : Math.trunc(satPrice)}
          </p>
          <p className="text-xs font-extrabold text-slate-400">SATS / USD</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs">CAPITALIZACIÓN</p>
          <p
            className={`${
              btcPricechangingEffect
                ? "text-slate-400 transition-colors duration-150 ease-in-out"
                : ""
            } text-xl font-bold`}
          >
            {btcPrice === 0
              ? ((firstBtcPrice * 19.54) / 1000).toFixed(2)
              : ((btcPrice * 19.54) / 1000).toFixed(2)}
            B
          </p>
          <p className="text-xs font-extrabold text-slate-400">USD</p>
        </div>
      </div>
    </div>
  );
}
