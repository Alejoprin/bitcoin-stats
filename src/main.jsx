import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BtcProvider } from "./context/BtcContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BtcProvider>
    <App />
  </BtcProvider>
);
