import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pt-15 sm:pt-30">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
