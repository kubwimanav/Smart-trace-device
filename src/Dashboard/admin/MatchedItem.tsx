import { type JSX, useState, useMemo } from "react";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMatchQuery } from "../../Api/user";
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import { useDeleteMatchitemMutation } from "../../Api/contact";

export default function MatchedItem(): JSX.Element {
  const { data,refetch } = useGetMatchQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!data) return [];

    if (!searchTerm.trim()) return data;

    const searchLower = searchTerm.toLowerCase();
    return data.filter(
      (item: any) =>
        item?.matched?.device_name?.toLowerCase().includes(searchLower) ||
        item?.matched?.serial_number?.toLowerCase().includes(searchLower) ||
        item?.matched?.founder?.name?.toLowerCase().includes(searchLower) ||
        item?.matched?.loster?.name?.toLowerCase().includes(searchLower) ||
        item?.matched?.founder?.email?.toLowerCase().includes(searchLower) ||
        item?.matched?.loster?.email?.toLowerCase().includes(searchLower) ||
        item?.matched?.founder?.phone_number?.includes(searchTerm) ||
        item?.matched?.loster?.phone_number?.includes(searchTerm) ||
        item?.match_status?.toLowerCase().includes(searchLower)
    );
  }, [data, searchTerm]);

  // Calculate pagination values
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const [deleteMacthitem] = useDeleteMatchitemMutation();
  
  const handleConfirmDelete = async (id: string) => {
    Notiflix.Confirm.show(
      'Delete Confirmation',
      'Do you want to delete this item?',
      'Delete',
      'Cancel',
      () => {
        // User clicked Delete
        deleteMacthitem(id);
        toast.success("Product deleted successfully!");
        refetch();
        console.log(id);
        
        
      },
      () => {
        // User clicked Cancel - do nothing
        console.log("Delete cancelled");
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: '#ff5549',
        okButtonBackground: '#ff5549',
      }
    );
  };
  
  const handleDeleteClick = (item:any) => {
    if (item && item.id) {
      handleConfirmDelete(item.id);
    } else {
      console.error("Item or item ID is missing");
      toast.error("Cannot delete item - ID is missing");
    }
  };




  return (
    <div className="max-w-xl md:max-w-3xl lg:max-w-7xl xl:max-w-7xl mx-auto p-3 sm:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-normal text-gray-800 mb-2 sm:mb-2">
        Matched Items
      </h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search items, locations, or finders..."
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {currentItems.length > 0 ? startIndex + 1 : 0} to{" "}
        {Math.min(endIndex, totalItems)} of {totalItems} results
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Desktop view - Table */}
      <div className="block">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Matched Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Found By
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lost By
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item: any) => (
                  <tr key={item._id || item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={item.itemImage}
                            alt={item?.matched?.device_name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkMyMC40MTgzIDE2IDI0IDE5LjU4MTcgMjQgMjRDMjQgMjguNDE4MyAyMC40MTgzIDMyIDE2IDMyQzExLjU4MTcgMzIgOCAyOC40MTgzIDggMjRDOCAxOS41ODE3IDExLjU4MTcgMTYgMTYgMTZaIiBmaWxsPSIjOUM5Qzk3Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDIxLjMzMzNWMjIuNjY2N0gyMi42NjY3VjI0SDIxLjMzMzNWMjUuMzMzM0gyMFYyNEgxOC42NjY3VjIyLjY2NjdIMjBWMjEuMzMzM0gyMS4zMzMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item?.matched?.device_name}
                          </div>
                          <div className="text-sm w-full text-gray-500">
                            {item?.matched?.serial_number}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {item?.match_date
                          ? item.match_date.split("T")[0]
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.matched?.founder?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item?.matched?.founder?.phone_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item?.matched?.founder?.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.matched?.loster?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item?.matched?.loster?.phone_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item?.matched?.loster?.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.match_status}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? `No items found matching "${searchTerm}"`
                      : "No matched items available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-1">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md transition-colors ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              title="Previous page"
            >
              <ChevronLeft size={19} />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  currentPage === pageNumber
                    ? "bg-primaryColor-100 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md transition-colors ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              title="Next page"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
