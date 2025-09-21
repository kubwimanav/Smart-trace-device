import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar id={''} />
      <div className="pt-15 sm:pt-30">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
