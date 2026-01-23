import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRaute from "./appRoute/AppRoute";

function App() {
  return (
    <div>
      <AppRaute />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
