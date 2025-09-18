import React, { useState, type JSX } from "react";
import { Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface User {
  id: string;
  _id: string;
  username: string;
  name?: string;
  email: string;
  phoneNumber: string;
  country: string;
}

// Static user data
const staticUsers: User[] = [
  {
    id: "1",
    _id: "64a1b2c3d4e5f6789012",
    username: "john_doe",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    country: "United States",
  },
  {
    id: "2",
    _id: "64a1b2c3d4e5f6789013",
    username: "jane_smith",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1234567891",
    country: "Canada",
  },
  {
    id: "3",
    _id: "64a1b2c3d4e5f6789014",
    username: "mike_johnson",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phoneNumber: "+1234567892",
    country: "United Kingdom",
  },
  {
    id: "4",
    _id: "64a1b2c3d4e5f6789015",
    username: "sarah_wilson",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phoneNumber: "+1234567893",
    country: "Australia",
  },
  {
    id: "5",
    _id: "64a1b2c3d4e5f6789016",
    username: "david_brown",
    name: "David Brown",
    email: "david.brown@example.com",
    phoneNumber: "+1234567894",
    country: "Germany",
  },
  {
    id: "6",
    _id: "64a1b2c3d4e5f6789017",
    username: "lisa_davis",
    name: "Lisa Davis",
    email: "lisa.davis@example.com",
    phoneNumber: "+1234567895",
    country: "France",
  },
  {
    id: "7",
    _id: "64a1b2c3d4e5f6789018",
    username: "robert_miller",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    phoneNumber: "+1234567896",
    country: "Japan",
  },
  {
    id: "8",
    _id: "64a1b2c3d4e5f6789019",
    username: "emily_garcia",
    name: "Emily Garcia",
    email: "emily.garcia@example.com",
    phoneNumber: "+1234567897",
    country: "Spain",
  },
  {
    id: "9",
    _id: "64a1b2c3d4e5f6789020",
    username: "alex_martinez",
    name: "Alex Martinez",
    email: "alex.martinez@example.com",
    phoneNumber: "+1234567898",
    country: "Mexico",
  },
  {
    id: "10",
    _id: "64a1b2c3d4e5f6789021",
    username: "chris_anderson",
    name: "Chris Anderson",
    email: "chris.anderson@example.com",
    phoneNumber: "+1234567899",
    country: "Brazil",
  },
];

export default function AdminManagement(): JSX.Element {
  // Use static data instead of context
  const [users, setUsers] = useState<User[]>(staticUsers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const usersPerPage: number = 3;

  // Filter users based on search term
  const filteredUsers: User[] = users.filter(
    (user: User) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phoneNumber?.includes(searchTerm)
  );

  // Pagination logic
  const totalFilteredUsers: number = filteredUsers.length;
  const totalPages: number = Math.ceil(totalFilteredUsers / usersPerPage);

  // Ensure current page is valid after filtering/deletion
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
  const currentUsers: User[] = filteredUsers.slice(
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

  const handleConfirmDelete = async (id: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        // Remove user from static data
        setUsers((prevUsers: User[]) =>
          prevUsers.filter((user: User) => user._id !== id)
        );

        setIsLoading(false);
        alert("User deleted successfully");
      } catch (error: unknown) {
        setIsLoading(false);
        console.log(error);
        alert("Failed to delete user");
      }
    }
  };

  let displayIndex: number = indexOfFirstUser + 1;

  return (
    <div className=" bg-gray-50 p-4">
      <div className="w-full px-2 sm:px-4 py-2 mx-auto max-w-7xl">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-3 text-gray-900">
          User Management Dashboard
        </h1>

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
        {currentUsers.length === 0 && (
          <div className="text-center py-6 sm:py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-sm sm:text-base">
              {filteredUsers.length === 0
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
        {currentUsers.length > 0 && (
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
                    Country
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
                            user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          <div className="truncate max-w-24 sm:max-w-none">
                            {user.username}
                          </div>
                          <div className="md:hidden text-xs text-gray-500 mt-1 truncate max-w-24 sm:max-w-none">
                            {user.email}
                          </div>
                          <div className="lg:hidden text-xs text-gray-500 mt-1 md:block truncate max-w-24 sm:max-w-none">
                            {user.country}
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
                      {user.country}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleConfirmDelete(user._id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                        aria-label={`Delete user ${user.username}`}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination - only show if we have users */}
        {filteredUsers.length > 0 && (
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
