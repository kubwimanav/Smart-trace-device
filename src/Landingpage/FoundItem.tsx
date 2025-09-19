import React, { useState, useEffect } from "react";
import homei from "../assets/images/image1-24.jpg";
import LostItemCard from "../hooks/useItem";
import type { LostItem } from "../type/type";
import imag1 from '../assets/images/Frame.png'
import imag2 from'../assets/images/Frame 401 (2).png'
import imag3 from '../assets/images/imag1.jpg'
import imag4 from '../assets/images/Frame 401 (4).png'
import imag5 from '../assets/images/Frame 401.png'
import imag6 from "../assets/images/Tablet.jpg";
import imag7 from "../assets/images/mouse.jpg";
import imag8 from "../assets/images/laptop.jpg";
import imag9 from "../assets/images/phonen.jpg";
import { Search, ChevronDown} from "lucide-react";
import { useGetProductsQuery } from "../Api/item";

const FoundItem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "location">("title");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState<LostItem[]>([]);

  const lostItems: LostItem[] = [
    {
      id: 1,
      title: "White i POD",
      location: "Kicukiro",
      image: imag5,
      type: "ipod",
    },
    {
      id: 2,
      title: "Laptop Lenovo i7",
      location: "Nyarugenge",
      image: imag1,
      type: "laptop",
    },
    {
      id: 3,
      title: "I Phone 7 plus",
      location: "Gasabo",
      image: imag3,
      type: "phone",
    },
    {
      id: 4,
      title: "White Tablet",
      location: "Kicukiro",
      image: imag6,
      type: "tablet",
    },
    {
      id: 5,
      title: "Mouse",
      location: "Nyarugenge",
      image: imag7,
      type: "wallet",
    },
    {
      id: 6,
      title: "Phone",
      location: "Kicukiro",
      image: imag9,
      type: "charger",
    },
    {
      id: 7,
      title: "Adapter",
      location: "Gasabo",
      image: imag4,
      type: "adapter",
    },
    {
      id: 8,
      title: "Telphone Spark",
      location: "Gasabo",
      image: imag2,
      type: "camera",
    },
    {
      id: 9,
      title: "Laptop",
      location: "Huye",
      image: imag8,
      type: "camera",
    },
  ];

  const { data } = useGetProductsQuery();


  // Rwandan districts for location filtering
  const rwandanDistricts = [
    "Kicukiro", "Gasabo", "Nyarugenge", "Bugesera", "Kamonyi", "Rwamagana",
    "Gicumbi", "Ruhango", "Nyamagabe", "Nyanza", "Kayonza", "Ngoma", 
    "Nyagatare", "Gatsibo", "Rubavu", "Rutsiro", "Karongi", "Nyabihu",
    "Ngororero", "Rusizi", "Muhanga", "Huye", "Nyamasheke", "Rulindo"
  ];

  // Apply search filter when search term or searchBy changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(lostItems);
      return;
    }

    const results = lostItems.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      
      if (searchBy === "title") {
        return item.title.toLowerCase().includes(searchLower);
      } else {
        return item.location && item.location.toLowerCase().includes(searchLower);
      }
    });

    setFilteredItems(results);
  }, [searchTerm, searchBy, lostItems]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div
        className="h-screen flex flex-col items-center justify-center gap-10 py-20 px-4 md:px-16 lg:px-60 text-center text-white bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white grid gap-5">
          <h1 className="font-bold text-3xl md:text-4xl">
            Looking for Your Device?
          </h1>
          <p className="text-lg md:text-xl">
            Reporting your lost or stolen device helps protect everyone by
            making it harder to resell and easier for a finder to return it to
            you.
          </p>
        </div>
      </div>
      <div>
        {data?.map((item: any) => (
          <div>
            <p>{data.length}</p>
            <p className=" text-red-300 text-2xl">{item.name}</p>
            <p className=" text-red-300 text-2xl">{item.category}</p>
            <p className=" text-red-300 text-2xl">{item.serialnumber}</p>
            <p className=" text-red-300 text-2xl">{item.lastName}</p>
            <p className=" text-red-300 text-2xl">{item.province}</p>
            <p className=" text-red-300 text-2xl">{item.district}</p>
            <p className=" text-red-300 text-2xl">{item.description}</p>

            <img src={item.deviceimage} alt="" />
          </div>
        ))}
      </div>

      <div className="w-full p-8">
        <div className="max-w-7xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Browse Found Items</h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search with integrated filter dropdown */}
              <div className="relative flex-1 flex">
                {/* Search type dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSearchOptions(!showSearchOptions)}
                    className="h-full px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 flex items-center gap-1 text-sm font-medium"
                  >
                    {searchBy === "title" ? "Title" : "Location"}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showSearchOptions && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setSearchBy("title");
                          setShowSearchOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Search by Title
                      </button>
                      <button
                        onClick={() => {
                          setSearchBy("location");
                          setShowSearchOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Search by Location
                      </button>
                    </div>
                  )}
                </div>

                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    placeholder={
                      searchBy === "title"
                        ? "Search by item title..."
                        : "Search by district..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-r-md rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location quick filters - only show when searching by location */}
          {/* {searchBy === "location" && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-800">Popular Districts:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Kicukiro", "Gasabo", "Nyarugenge", "Bugesera", "Kamonyi", "Rwamagana"].map(district => (
                  <button
                    key={district}
                    onClick={() => setSearchTerm(district)}
                    className="text-xs px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          <p className="text-gray-600">
            Statistics show 85% of lost property (phones, bags, pets, luggage,
            etc.) is in honest hands. Let Lostings help you find the
            property/item(s) you have lost. Be smart and submit your lost
            property with our lost and found department today!
          </p>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"} found
            {searchTerm ? ` matching "${searchTerm}" in ${searchBy}` : ""}
          </p>

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center place-items-center mx-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="w-full max-w-sm" key={item.id}>
                <LostItemCard title="Item Found" item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No items found</div>
              <p className="text-gray-400">
                {searchTerm
                  ? `No items found matching "${searchTerm}" in ${searchBy}`
                  : "No found items have been reported yet"}
              </p>
              {searchBy === "location" && searchTerm && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Popular districts in Rwanda:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {rwandanDistricts.slice(0, 8).map((district) => (
                      <button
                        key={district}
                        onClick={() => setSearchTerm(district)}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItem;