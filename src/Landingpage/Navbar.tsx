import React, { useState, useEffect } from "react";
import { Mail, Phone, Menu, X} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from '../assets/images/logo.jpeg'

interface HeaderProps {
  id: any;
}

const Navbar: React.FC<HeaderProps> = () => {
  
  const scrollToSection = (id:any) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  
  const [openBrowseritem, setopenBrowseritem] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();

  // Check if current path is in Submit Items dropdown
  const isSubmitItemsActive = ['/reportlostitem', '/reportfounditem'].includes(location.pathname);
  
  // Check if current path is in Browse Items dropdown
  const isBrowseItemsActive = ['/lostitem', '/founditem'].includes(location.pathname);

  // Check for individual page states
  const isHomeActive = location.pathname === '/home' || location.pathname === '/';
  const isContactActive = location.pathname === '/contact';

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep dropdowns open if user is on related pages
  useEffect(() => {
    if (isSubmitItemsActive) {
      setOpen(true);
    }
    if (isBrowseItemsActive) {
      setopenBrowseritem(true);
    }
  }, [location.pathname, isSubmitItemsActive, isBrowseItemsActive]);

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmitItemsToggle = () => {
    // Only allow closing if not on an active page
    if (!isSubmitItemsActive) {
      setOpen(!open);
    }
  };

  const handleBrowseItemsToggle = () => {
    // Only allow closing if not on an active page
    if (!isBrowseItemsActive) {
      setopenBrowseritem(!openBrowseritem);
    }
  };

  return (
    <header className="w-full fixed z-50">
      {/* Top contact bar - hidd en when scrolled */}
      <div
        className={`hidden sm:block bg-primaryColor-100 text-white py-2 sm:py-3 px-4 sm:px-5 transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                needhelp@example.com
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                Tel: +250 784 127 871
              </span>
            </div>
          </div>

          {/* Social media icons */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-7">
            <Link
              to={""}
              className="h-3 w-3 sm:h-4 sm:w-4 text-white/80 hover:text-white transition-colors"
            >
              <FaXTwitter className="w-full h-full" />
            </Link>
            <Link
              to={""}
              className="h-3 w-3 sm:h-4 sm:w-4 text-white/80 hover:text-white transition-colors"
            >
              <FaFacebookF className="w-full h-full" />
            </Link>
            <Link
              to={"BBB"}
              className="h-3 w-3 sm:h-4 sm:w-4 text-white/80 hover:text-white transition-colors"
            >
              <FaYoutube className="w-full h-full" />
            </Link>
            <Link
              to={""}
              className="h-3 w-3 sm:h-4 sm:w-4 text-white/80 hover:text-white transition-colors"
            >
              <FaLinkedinIn className="w-full h-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation - stays visible */}
      <div
        className={`bg-white shadow-lg transition-transform duration-300 ${
          isScrolled
            ? "sm:-translate-y-[60px] lg:-translate-y-[45px]"
            : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-16 h-8 sm:w-18 sm:h-9 lg:w-20 lg:h-10  rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Navigation and Login */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <nav className="flex items-center space-x-6 xl:space-x-8">
                <Link
                  to={"home"}
                  className={`font-medium text-sm xl:text-base tracking-wide transition-colors ${
                    isHomeActive
                      ? "text-[#3A7196]"
                      : "text-slate-600 hover:text-[#3A7196]"
                  }`}
                >
                  Home
                </Link>

                {/* Submit Items Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleSubmitItemsToggle}
                    className="text-slate-600 hover:text-slate-800 font-normal text-sm xl:text-base tracking-wide flex items-center"
                  >
                    <span
                      className={`hover:text-[#3A7196] font-light hover:font-medium tracking-wide transition-colors ${
                        isSubmitItemsActive ? "text-[#3A7196]" : "text-slate-600"
                      }`}
                    >
                      Submit Items
                    </span>
                    <IoMdArrowDropdown
                      className={`ml-1 w-4 h-4 xl:w-5 xl:h-5 transform transition-transform ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      <Link
                        onClick={()=>setIsMobileMenuOpen(false)}
                        to="reportlostitem"
                        className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          location.pathname === "/reportlostitem"
                            ? "bg-blue-50 text-[#3A7196] font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        Lost Items
                      </Link>
                      <Link
                        onClick={()=>setIsMobileMenuOpen(false)}
                        to="reportfounditem"
                        className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          location.pathname === "/reportfounditem"
                            ? "bg-blue-50 text-[#3A7196] font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        Found Items
                      </Link>
                    </div>
                  )}
                </div>

                {/* Browse Items Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleBrowseItemsToggle}
                    className="text-slate-600 hover:text-slate-800 font-normal text-sm xl:text-base tracking-wide flex items-center"
                  >
                    <span
                      className={`hover:text-[#3A7196] font-medium tracking-wide transition-colors ${
                        isBrowseItemsActive ? "text-[#3A7196]" : "text-slate-600"
                      }`}
                    >
                      Browse Items
                    </span>
                    <IoMdArrowDropdown
                      className={`ml-1 w-4 h-4 xl:w-5 xl:h-5 transform transition-transform ${
                        openBrowseritem ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {openBrowseritem && (
                    <div className="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      <Link
                        onClick={()=>setopenBrowseritem(false)}
                        to="lostitem"
                        className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          location.pathname === "/lostitem"
                            ? "bg-blue-50 text-[#3A7196] font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        Lost Items
                      </Link>
                      <Link
                        onClick={()=>setopenBrowseritem(false)}
                        to="founditem"
                        className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          location.pathname === "/founditem"
                            ? "bg-blue-50 text-[#3A7196] font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        Found Items
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  onClick={() => scrollToSection("contact")}
                  to={"#contact"}
                  className={`font-medium text-sm xl:text-base tracking-wide transition-colors ${
                    isContactActive
                      ? "text-blue-500"
                      : "text-slate-600 hover:text-blue-500"
                  }`}
                >
                  Contact Us
                </Link>
              </nav>

              {/* Login Button */}
              <button className="bg-primaryColor-100 text-white px-5 py-2 xl:px-6 xl:py-2 font-medium text-sm xl:text-base hover:bg-slate-600 rounded-4xl transition-all duration-200 hover:shadow-md">
                <Link to={"/login"}>Login</Link>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-slate-600 hover:text-slate-800 p-2 rounded-md transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ${
            isScrolled
              ? "-translate-y-[50px] sm:-translate-y-[60px]"
              : "translate-y-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-1 max-h-screen overflow-y-auto">
            {/* Mobile Home Link */}
            <Link
              to="home"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-medium text-base py-3 px-4 rounded-lg transition-all ${
                isHomeActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            {/* Mobile Submit Items */}
            <div className="py-1">
              <button
                onClick={handleSubmitItemsToggle}
                className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-lg font-medium text-base transition-all ${
                  isSubmitItemsActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span>Submit Items</span>
                <IoMdArrowDropdown
                  className={`w-5 h-5 transform transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {open && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                  <Link
                    to="reportlostitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm py-2.5 px-3 rounded-md transition-colors ${
                      location.pathname === "/reportlostitem"
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-slate-600 hover:text-slate-800 hover:bg-gray-50"
                    }`}
                  >
                    Lost Items
                  </Link>
                  <Link
                    to="reportfounditem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm py-2.5 px-3 rounded-md transition-colors ${
                      location.pathname === "/reportfounditem"
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-slate-600 hover:text-slate-800 hover:bg-gray-50"
                    }`}
                  >
                    Found Items
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Browse Items */}
            <div className="py-1">
              <button
                onClick={handleBrowseItemsToggle}
                className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-lg font-medium text-base transition-all ${
                  isBrowseItemsActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span>Browse Items</span>
                <IoMdArrowDropdown
                  className={`w-5 h-5 transform transition-transform ${
                    openBrowseritem ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openBrowseritem && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                  <Link
                    to="lostitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm py-2.5 px-3 rounded-md transition-colors ${
                      location.pathname === "/lostitem"
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-slate-600 hover:text-slate-800 hover:bg-gray-50"
                    }`}
                  >
                    Lost Items
                  </Link>
                  <Link
                    to="founditem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm py-2.5 px-3 rounded-md transition-colors ${
                      location.pathname === "/founditem"
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-slate-600 hover:text-slate-800 hover:bg-gray-50"
                    }`}
                  >
                    Found Items
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Contact Link */}
            <Link
              to="/home#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-medium text-base py-3 px-4 rounded-lg transition-all ${
                isContactActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Contact Us
            </Link>

            {/* Mobile Login Button */}
            <div className="pt-4 pb-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-slate-500 text-white py-2 px-4 font-medium text-base rounded-lg hover:bg-slate-600 transition-all duration-200 hover:shadow-md"
              >
                <Link to={"/LandingAuth"} className="block w-full h-full">
                  Login
                </Link>
              </button>
            </div>

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center space-x-6 pt-4 pb-2 border-t border-gray-200">
              <Link
                to=""
                className="text-slate-400 hover:text-slate-600 transition-colors p-2"
              >
                <FaXTwitter className="w-5 h-5" />
              </Link>
              <Link
                to=""
                className="text-slate-400 hover:text-slate-600 transition-colors p-2"
              >
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link
                to="BBB"
                className="text-slate-400 hover:text-slate-600 transition-colors p-2"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
              <Link
                to=""
                className="text-slate-400 hover:text-slate-600 transition-colors p-2"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;