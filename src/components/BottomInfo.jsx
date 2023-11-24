import { useContext } from "react";
import { BtcContext } from "../context/BtcContext";

export function BottomInfo() {
  const {
    fullDate,
    day,
    hours,
    minutes,
    seconds,
    timePeriod,
    secondschangingEffect,
  } = useContext(BtcContext);

  let dayConverse;

  switch (day) {
    case "Mon":
      dayConverse = "LUNES";
      break;

    case "Tue":
      dayConverse = "MARTES";
      break;

    case "Wed":
      dayConverse = "MIÉRCOLES";
      break;

    case "Thu":
      dayConverse = "JUEVES";
      break;

    case "Fri":
      dayConverse = "VIERNES";
      break;
    case "Sat":
      dayConverse = "SÁBADO";
      break;
    case "Sun":
      dayConverse = "DOMINGO";
      break;

    default:
      break;
  }

  return (
    <>
      {/* fecha y hora */}
      <div className="flex justify-between">
        <div className="p-4 border rounded-md">
          <p className="text-6xl font-bold">
            {hours}:{minutes < 10 ? "0" + minutes : minutes}
            <span
              className={`${
                secondschangingEffect
                  ? "text-slate-400 transition-colors duration-150 ease-in-out"
                  : ""
              } text-4xl`}
            >
              :{seconds < 10 ? "0" + seconds : seconds}
            </span>
            <span className="text-sm font-extrabold text-slate-400">
              {timePeriod}
            </span>
          </p>
        </div>

        <div className="grow my-auto">
          <div className="border-t"></div>
        </div>

        <div className="p-4 text-right border rounded-md">
          <p className="text-sm font-extrabold text-slate-400">{dayConverse}</p>
          <p className="text-4xl font-bold uppercase">{fullDate}</p>
        </div>
      </div>
    </>
  );
}
