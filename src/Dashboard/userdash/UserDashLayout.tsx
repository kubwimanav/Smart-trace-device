import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./DashNavbar";
import UserDashSidebar from "./UserDashSidebar";

const UserDashLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <UserDashSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col  w-full">
        <UserHeader toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <main className="flex-1 overflow-auto p-1">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashLayout;
