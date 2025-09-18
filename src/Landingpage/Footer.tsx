import React from "react";
import { MapPin, Phone, Mail} from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = () => {
  // const [email, setEmail] = useState("");

  // const handleSubscribe = () => {
  //   if (email.trim()) {
  //     console.log("Subscribing email:", email);
  //     setEmail("");
  //   }
  // };


  return (
    <footer className="bg-primaryColor-100   text-white">
      {/* Main Footer Content */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-10 justify-between w-full px-10 py-20">
        <div className=" grid gap-4 w-1/3">
          <h3 className="text-size-lg font-medium ">About Us</h3>
          <p className=" text-size-sm">
            I can see the issue - the layout isn't balanced and the spacing
            isn't equal. Let me fix the responsive grid layout and padding to
            make it look better on all screen sizes.
          </p>
          <div className=" flex gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className=" bg-white text-primaryColor-100 text-sm px-6 py-2 hover:border-0   border-0"
            />
            <button className=" bg-white p-2 text-sm text-primaryColor-100">
              Subscribe
            </button>
          </div>
        </div>
        <div className="grid gap-4 w-fit">
          <h3 className="text-size-lg font-medium">Contact Us</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="text-white text-size-sm">
                25 Street, Kigali City Road, Rwanda
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-white text-size-sm">+250 784 127 871</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-white text-size-sm">needhelp@company.com</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 ">
          <h3 className="text-size-lg font-medium">Quick Links</h3>

          <div className=" flex flex-col gap-1 ">
            <Link
              to={"/"}
              className="text-white hover:text-primaryColor-300 text-size-sm"
            >
              Home
            </Link>
            <Link
              to={"lostitem"}
              className="text-white hover:text-primaryColor-300 text-size-sm"
            >
              Lost iTems
            </Link>
            <Link
              to={"founditem"}
              className="text-white hover:text-primaryColor-300 text-size-sm"
            >
              Found Itemms
            </Link>
            <Link
              to={"reportlostitem"}
              className="text-white hover:text-primaryColor-300 text-size-sm"
            >
              Report Lost Items
            </Link>
            <Link
              to={"reportfounditem"}
              className="text-white hover:text-primaryColor-300 text-size-sm"
            >
              Report Found Items
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-size-lg font-medium mb-4">Follow Us</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaTwitter className="w-4 h-4" />

              <p className="text-white text-size-sm">Smart-Trace-Device</p>
            </div>

            <div className="flex items-center gap-3">
              <FaFacebookF className="w-4 h-4" />

              <p className="text-white text-size-sm">Smart-Trace-Device</p>
            </div>

            <div className="flex items-center gap-3">
              <FaInstagram className="w-5 h-5 " />

              <p className="text-white text-size-sm">Smart-Trace-Device</p>
            </div>
            <div className="flex items-center gap-3">
              <FaLinkedinIn className="w-5 h-5 text-white" />

              <p className="text-white text-size-sm">Smart-Trace-Device</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primaryColor-300 py-4 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-1 text-sm ">
              <a href="#" className="hover:text-white transition-colors">
                Career
              </a>
              <span className="mx-1">|</span>
              <a href="#" className="hover:text-white transition-colors">
                About us
              </a>
              <span className="mx-1">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Contact us
              </a>
              <span className="mx-1">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy policy
              </a>
            </div>
            <div className="text-sm ">
              © 2015 Smart Trace Devices. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;