import React, { useState, useEffect } from "react";
import homei from "../assets/images/image1-24.jpg";
import LostItemCard from "../hooks/useItem";
import { Search, ChevronDown } from "lucide-react";
import type { Founditem } from "../type/type";
import { useGetFounditemQuery } from "../Api/founditem";

const FoundItem: React.FC = () => {
  const { data } = useGetFounditemQuery();

  // Default to [] to avoid undefined issues
  const lostItems: Founditem[] = data ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "location">("title");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Founditem[]>(lostItems);

  // Rwandan districts for location filtering
  const rwandanDistricts = [
    "Kicukiro", "Gasabo", "Nyarugenge", "Bugesera", "Kamonyi", "Rwamagana",
    "Gicumbi", "Ruhango", "Nyamagabe", "Nyanza", "Kayonza", "Ngoma",
    "Nyagatare", "Gatsibo", "Rubavu", "Rutsiro", "Karongi", "Nyabihu",
    "Ngororero", "Rusizi", "Muhanga", "Huye", "Nyamasheke", "Rulindo"
  ];

  // Search filtering
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(lostItems);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const results = lostItems.filter((item: Founditem) => {
      if (searchBy === "title") {
        return item.name?.toLowerCase().includes(searchLower);
      } else {
        return item.location?.toLowerCase().includes(searchLower);
      }
    });

    setFilteredItems(results);
  }, [searchTerm, searchBy, lostItems]);

  const clearSearch = () => setSearchTerm("");

  return (
    <div>
      <div
        className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] flex flex-col items-center justify-center gap-10 px-4 md:px-16 lg:px-60 text-center text-white overflow-hidden"
        style={{
          background: `linear-gradient(rgba(41, 108, 181, 0.65), rgba(2, 17, 32, 0.84)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
        <div className="relative z-10 font-medium text-[20px] sm:text-[25px] text-white leading-tight mb-3 sm:mb-3">
        <div className="text-white grid gap-5">
          <p className=" font-normal  mt-2 text-3xl leading-snug drop-shadow-md">
            Looking for Your Device?
          </p>
          <p className="text-lg md:text-xl">
            Reporting your lost or stolen device helps protect everyone by
            making it harder to resell and easier for a finder to return it to
            you.
            </p>
            </div>
        </div>
      </div>

      <div className="w-full p-8">
        <div className="max-w-7xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Browse Found Items</h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 flex">
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

                {/* Search Input */}
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

          <p className="text-gray-600">
            Statistics show 85% of lost property (phones, bags, pets, luggage,
            etc.) is in honest hands. Let Lostings help you find the
            property/item(s) you have lost. Be smart and submit your lost
            property with our lost and found department today!
          </p>
        </div>

        {/* Results Count */}
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

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center place-items-center mx-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="w-full max-w-sm">
                <LostItemCard
                  title={item.name} // change to item.title if API returns title
                  image={import.meta.env.VITE_API_BASE_URL + item.deviceimage}
                  location={item.location}
                />
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
