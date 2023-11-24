import { useEffect, useState } from "react";

export function Aside() {
  const [difficultyChange, setDifficultyChange] = useState({});
  const [blockHeight, setBlockHeight] = useState(0);
  const [firstBlockData, setFirstBlockData] = useState({});

  useEffect(() => {
    const fetchDifficultyChange = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/difficulty-adjustment"
        );
        const data = await response.json();
        const difficultyChange = data;
        setDifficultyChange(difficultyChange);
      } catch (error) {
        console.log("Error fetching Difficulty Change", error);
      }
    };
    fetchDifficultyChange();

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
    fetchBlockHeight();

    if (blockHeight) {
      const fetchFirstBlockData = async () => {
        try {
          const response = await fetch(
            `https://mempool.space/api/v1/blocks/${blockHeight}`
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
  }, [blockHeight]);

  return (
    <aside className="w-1/4 h-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-between text-center">
        <div className="grow w-40 border-b p-4 flex flex-col justify-center">
          <p className="text-xs">HASHRATE</p>
          <p className="text-2xl font-bold">458.3 EH/s</p>
        </div>
        <div className="grow w-40 border-b p-4 flex flex-col justify-center">
          <p className="text-xs">ULT. AJUSTE DIF.</p>
          <p className="text-xl font-bold text-red-600">
            🔺
            {difficultyChange && difficultyChange.previousRetarget !== undefined
              ? difficultyChange.previousRetarget.toFixed(2)
              : "0"}
            %
          </p>
        </div>
        <div className="grow w-40 border-b p-4 flex flex-col justify-center">
          <p className="text-xs">ULTIMO BLOQUE SUBSIDIO</p>
          <p className="text-xl font-bold">
            ₿{" "}
            {firstBlockData?.extras?.reward !== undefined
              ? (firstBlockData.extras.reward / 100000000).toFixed(2)
              : "0"}
          </p>
        </div>
        <div className="grow p-4 flex flex-col justify-center">
          <p className="text-xs">BLOQUE EST. AJUST. DIFICULTAD</p>
          <p className="text-xl font-bold">
            {difficultyChange.nextRetargetHeight !== undefined
              ? difficultyChange.nextRetargetHeight
              : "0"}
          </p>
        </div>
      </div>
    </aside>
  );
}
