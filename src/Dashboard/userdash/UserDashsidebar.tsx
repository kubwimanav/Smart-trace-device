import React from "react";
import {  Link, useLocation, useNavigate, type To } from "react-router-dom";
import {
  MdHome,
  MdOutlineAppSettingsAlt,
  MdOutlineLogout,
  MdPayment
} from "react-icons/md";
import logo from '../../assets/images/logo.jpeg'



interface ToggleProps{
  isOpen: any;
  toggleSidebar:any
}
const UserDashSidebar:React.FC<ToggleProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/userdash",
      icon: <MdHome className="h-4 w-4 mr-3" />,
    },

    {
      name: "Found Items",
      path: "userfounditem",
      icon: <MdOutlineAppSettingsAlt className="h-4 w-4 mr-3" />,
    },

    {
      name: "Lost Items",
      path: "users",
      icon: <MdPayment className="h-4 w-4 mr-3" />,
    },

    // {
    //   name: "Matched",
    //   path: "adminsetting",
    //   icon: <CgFormatCenter className="h-5 w-5 mr-3" />,
    // },
  ];

  const handleNavClick = (path: To) => {
    navigate(path);

    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`bg-white w-50 shadow-md flex-shrink-0 transition-all duration-300 ease-in-out fixed md:relative h-full z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <nav className="p-4 h-full flex flex-col gap-7 overflow-y-auto">
        <img src={logo} alt="" className="w-30 h-10 mt-4" />
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive =
              (currentPath === "/userdash" && item.path === "/userdash") ||
              (item.path !== "/userdash" && currentPath.includes(item.path));

            return (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center px-4 py-2 rounded-md w-full text-left ${
                    isActive
                      ? "bg-primaryColor-100 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
        <div className=" text-red-500 flex items-center mt-20 ml-6">
          <MdOutlineLogout className=" h-5 w-5 mr-3" />
          <Link to={"/"} className=" mb-1">
            Logout
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default UserDashSidebar;
