import React, { useState, useEffect } from "react";
import homei from "../assets/images/home.jpg";
import LostItemCard from "../hooks/useItem";
import { Search, ChevronDown } from "lucide-react";
import { useGetLostitemQuery } from "../Api/lostitem";

interface LostItem {
  id: string;
  title: string;
  category: string;
  brand: string;
  description: string;
  dateLost: string;
  location: string;
  imageUrl?: string;
  contactInfo?: string;
  status?: "lost" | "found";
}

const LostItem: React.FC = () => {
  const { data } = useGetLostitemQuery();
  console.log("hello my friend", data);

  const lostItems =data;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "location">("title");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState(lostItems);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(lostItems);
      return;
    }

    const results = lostItems.filter((item:any) => {
      const searchLower = searchTerm.toLowerCase();

      if (searchBy === "title") {
        return item.title.toLowerCase().includes(searchLower);
      } else {
        return (
          item.location && item.location.toLowerCase().includes(searchLower)
        );
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
            Verify Before You Buy
          </h1>
          <p className="text-lg md:text-xl">
            Reporting your lost or stolen device helps protect everyone by
            making it harder to resell and easier for a finder to return it to
            you.
          </p>
        </div>
      </div>
      

      <div className="w-full p-8">
        <div className="max-w-7xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Browse Reported Lost Items</h1>

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
            {filteredItems?.length}
            {filteredItems?.length === 1 ? "item" : "items"} found
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
          {filteredItems?.length > 0 ? (
            filteredItems.map((item: any) => (
              <div className="w-full max-w-sm" key={item.id}>
                <LostItemCard
                  title={item.title}
                  image={import.meta.env.VITE_API_BASE_URL + item.image}
                  location={item.addressType}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No items found</div>
              <p className="text-gray-400">
                {searchTerm
                  ? `No items found matching "${searchTerm}" in ${searchBy}`
                  : "No lost items have been reported yet"}
              </p>
  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostItem;
