import { useState, useEffect, type JSX } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Trash2,
} from "lucide-react";
import { useDeletecontactMutation, useGetContactQuery } from "../../Api/contact";
import { toast } from "react-toastify";
import Notiflix from "notiflix";

// TypeScript interfaces
interface ContactMessage {
  id: string;
  _id: string;
  first_name:string,
  last_name: string;
  email: string;
  subject: string;
  description: string;
  message: string;
}

// Static data

export default function ContactMessagesPage(): JSX.Element {
  const { data } = useGetContactQuery();
  const contact = data;

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const messagesPerPage = 4;

  // Update messages when context data changes
  useEffect(() => {
    if (contact && Array.isArray(contact)) {
      // Ensure each message has the required properties
      const processedMessages = contact.map((message) => ({
        ...message,
        time: message.time || "Recently",
        description:
          message.description || message.message || "No description available",
      }));
      setMessages(processedMessages);
    }
  }, [contact]);



const [deletecontact] = useDeletecontactMutation();

const handleConfirmDelete = (id: string) => {
  Notiflix.Confirm.show(
    "Delete Confirmation",
    "Do you want to delete this message?",
    "Delete",
    "Cancel",
    () => {
      // User clicked Delete
      console.log("Attempting to delete contact with ID:", id);

      deletecontact(id);

      // Update local state immediately after deletion call
      setMessages((prevMessages) =>
        prevMessages.filter((message) => {
          const messageId = message._id || message.id?.toString();
          return messageId !== id;
        })
      );

      // Close modal if the deleted message is currently selected
      if (selectedMessage) {
        const selectedId =
          selectedMessage._id || selectedMessage.id?.toString();
        if (selectedId === id) {
          setSelectedMessage(null);
        }
      }

      toast.success("Message deleted successfully!");
    },
    () => {
      // User clicked Cancel - do nothing
      console.log("Delete cancelled");
    },
    {
      width: "320px",
      borderRadius: "8px",
      titleColor: "#ff5549",
      okButtonBackground: "#ff5549",
    }
  );
};

const handleDeleteClick = (item: ContactMessage) => {
  console.log("Delete clicked for item:", item);

  // Check for both _id and id fields since your API uses 'id'
  const itemId = item._id || item.id;
  console.log("Item ID (_id):", item._id);
  console.log("Item ID (id):", item.id);
  console.log("Final Item ID:", itemId);

  if (!item) {
    console.error("Item is null or undefined");
    toast.error("Cannot delete - item not found");
    return;
  }

  if (!itemId) {
    console.error("Item ID is missing", item);
    toast.error("Cannot delete - ID is missing");
    return;
  }

  handleConfirmDelete(itemId.toString()); // Convert to string in case it's a number
};



  // Filter messages based on search term and status filter
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      (message.last_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch ;
  });

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  

  
  
  return (
    <div className="bg-gray-50 rounded-2xl">
      <div className="max-w-7xl mx-auto py-3 px-2 sm:px-4 lg:px-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h5 className="text-size-xl font-bold text-primaryColor-100 mb-2 sm:mb-2">
              Contact Messages
            </h5>
            <div className="flex space-x-2">
              <button
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Search and filter */}
          <div className="px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 border-b border-gray-200">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </div>
              {searchTerm && (
                <button
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="block overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
                    <tr key={message._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {message.first_name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500 ">
                          {message.last_name}
                        </div>
                      </td>
                      <td className="px-4 py-3 ">
                        <div className="text-sm text-gray-500">
                          {message.email}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-sm font-semibold rounded-full">
                          {message.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="">
                          {message.description}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-red-600 hover:text-blue-900 p-1"
                            onClick={() => handleDeleteClick(message)}
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
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      {messages.length === 0
                        ? "No messages available"
                        : "No messages found matching your criteria"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredMessages.length > 0 && (
            <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                Showing{" "}
                <span className="font-medium">{indexOfFirstMessage + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastMessage, filteredMessages.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredMessages.length}</span>{" "}
                results
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>

                  {/* Show limited page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
