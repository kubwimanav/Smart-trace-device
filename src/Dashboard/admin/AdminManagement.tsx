import React, { useState, type JSX } from "react";
import { Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../Api/user";
import Notiflix from "notiflix";
import { toast } from "react-toastify";

interface User {
  id: string;
  _id: string;
  last_name
: string;
  name?: string;
  email: string;
  phoneNumber: string;
  lost_location
: string;
}

// Static user data


export default function AdminManagement(): JSX.Element {

  const { data } = useGetUsersQuery();
 
  
  const staticUsers = data;
  // Use static data instead of context
  const [users] = useState<User[]>(staticUsers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading] = useState<boolean>(false);
  const usersPerPage: number = 3;

  // Filter users based on search term
  const filteredUsers: User[] = users?.filter(
    (user: User) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phoneNumber?.includes(searchTerm)
  );

  // Pagination logic
  const totalFilteredUsers: number = filteredUsers?.length;
  const totalPages: number = Math.ceil(totalFilteredUsers / usersPerPage);

  // Ensure current page is valid after filtering/deletion
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
  const currentUsers: User[] = filteredUsers?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const nextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate visible page numbers for pagination
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow: number = 4;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let middleStart: number = Math.max(2, currentPage - 1);
      let middleEnd: number = Math.min(currentPage + 1, totalPages - 1);

      if (currentPage <= 2) {
        middleEnd = 3;
      }
      if (currentPage >= totalPages - 1) {
        middleStart = totalPages - 2;
      }

      if (middleStart > 2) {
        pageNumbers.push("...");
      }

      for (let i = middleStart; i <= middleEnd; i++) {
        pageNumbers.push(i);
      }

      if (middleEnd < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();


const handleConfirmDelete = (id: string) => {
  Notiflix.Confirm.show(
    'Delete Confirmation',
    'Do you want to delete this User?',
    'Delete',
    'Cancel',
    async () => {
      try {
        console.log('Attempting to delete User with ID:', id);
        
        // Call the delete mutation and wait for response
        const result = await deleteUser(id).unwrap();
        
        console.log('Delete successful:', result);
        toast.success("User deleted successfully!");
        
        // The RTK Query will automatically update the cache and refetch data
        // No need to manually update local state since useGetLostitemQuery will re-run
        
      } catch (error: any) {
        console.error('Delete failed:', error);
        
        // Handle different types of errors
        let errorMessage = "Failed to delete user. Please try again.";
        
        if (error?.status === 404) {
          errorMessage = "Item not found. It may have already been deleted.";
        } else if (error?.status === 403) {
          errorMessage = "You don't have permission to delete this item.";
        } else if (error?.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
      }
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

const handleDeleteClick = (item: any) => {
  console.log('Delete clicked for item:', item);
  
  // Check for both _id and id fields since your API uses 'id'
  const itemId = item._id || item.id;
  console.log('Item ID (_id):', item._id);
  console.log('Item ID (id):', item.id);
  console.log('Final Item ID:', itemId);
  
  if (!item) {
    console.error("Item is null or undefined");
    toast.error("Cannot delete - item not found");
    return;
  }
  
  if (!itemId) {
    console.error("User ID is missing", item);
    toast.error("Cannot delete item - ID is missing");
    return;
  }
  
  // Prevent multiple delete attempts if already deleting
  if (isDeleting) {
    toast.warning("Please wait, deletion in progress...");
    return;
  }
  
  handleConfirmDelete(itemId.toString());
};

  let displayIndex: number = indexOfFirstUser + 1;

  return (
    <div className=" bg-gray-50 p-4">
      <div className="w-full px-2 sm:px-4 py-2 mx-auto max-w-7xl">
        <h5 className="text-size-xl font-bold text-primaryColor-100 mb-2 sm:mb-2">
          User Management Dashboard
        </h5>

        {/* Search and controls */}
        <div className="flex flex-col md:flex-row md:justify-between mb-2 gap-2 sm:gap-2">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="bg-primaryColor-100 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto text-sm"
            onClick={() =>
              alert("Add User functionality would be implemented here")
            }
          >
            Add New User
          </button>
        </div>

        {/* Show message when no results */}
        {currentUsers?.length === 0 && (
          <div className="text-center py-6 sm:py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-sm sm:text-base">
              {filteredUsers?.length === 0
                ? "No users found matching your search."
                : "No users available."}
            </p>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">Deleting user...</p>
            </div>
          </div>
        )}

        {/* Responsive container with scrolling */}
        {currentUsers?.length > 0 && (
          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-medium text-gray-500 tracking-wider hidden md:table-cell"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-medium text-gray-500 tracking-wider hidden lg:table-cell"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-2 sm:px-4 py-2 sm:py-3 text-right text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user: User) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-900 font-medium">
                        {displayIndex++}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-full bg-primaryColor-100 flex items-center justify-center text-white mr-2 sm:mr-3 text-xs sm:text-sm font-medium">
                          {user.name?.charAt(0) ||
                            user.last_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          <div className="truncate max-w-24 sm:max-w-none">
                            {user.last_name}
                          </div>
                          <div className="md:hidden text-xs text-gray-500 mt-1 truncate max-w-24 sm:max-w-none">
                            {user.email}
                          </div>
                          <div className="lg:hidden text-xs text-gray-500 mt-1 md:block truncate max-w-24 sm:max-w-none">
                            {user.lost_location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                      {user.lost_location}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                        aria-label={`Delete user ${user.last_name}`}
                        disabled={isLoading}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination - only show if we have users */}
        {filteredUsers?.length > 0 && (
          <div className="bg-white px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200 mt-4 rounded-lg shadow-sm">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, totalFilteredUsers)}
                  </span>{" "}
                  of <span className="font-medium">{totalFilteredUsers}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-md border transition-colors ${
                    currentPage === 1
                      ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {totalPages > 0 &&
                  getPageNumbers().map((page: number | string, index: number) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-700"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        onClick={() => goToPage(page as number)}
                        className={`relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border transition-colors ${
                          currentPage === page
                            ? "bg-primaryColor-100 text-white border-blue-500"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        } text-xs sm:text-sm font-medium rounded-md`}
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </button>
                    )
                  )}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-md border transition-colors ${
                    currentPage === totalPages || totalPages === 0
                      ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Mobile pagination */}
            <div className="flex flex-1 justify-between items-center sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-1 border rounded-md text-xs transition-colors ${
                  currentPage === 1
                    ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                Prev
              </button>
              <span className="text-xs text-gray-500 px-1">
                {currentPage}/{totalPages || 1}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-1 border rounded-md text-xs transition-colors ${
                  currentPage === totalPages || totalPages === 0
                    ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
