import { useEffect, useState, type JSX } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
  X,
  Save,
} from "lucide-react";
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import {
  useDeleteLostitemMutation,
  useGetLostitemByUserQuery,
} from "../../Api/lostitem";

// TypeScript interfaces
interface LostItem {
  _id: string;
  id: string;
  title: string;
  firstName: string;
  losterEmail: string;
  ownerPhone: string;
  state: string;
  date: string;
  serialNumber: string;
  additionalInfo: string;
  image: string;
  dateFound?: string;
  foundBy?: string;
  phoneNumber?: string;
  description?: string;
}

interface EditModalProps {
  item: LostItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: LostItem) => void;
}

interface FormData {
  title: string;
  firstName: string;
  losterEmail: string;
  ownerPhone: string;

  state: string;
  date: string;
  serialNumber: string;
  additionalInfo: string;
  image: string;
}

interface FormErrors {
  general?: string;
  title?: string;
  losterEmail?: string;

  state?: string;
  date?: string;
  serialNumber?: string;
  additionalInfo?: string;
  image?: string;
  [key: string]: string | undefined;
}

const EditModal: React.FC<EditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    losterEmail: "",
    ownerPhone: "",
    state: "",
    date: "",
    serialNumber: "",
    additionalInfo: "",
    image: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper function to convert datetime to date format
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Initialize form data when item changes
  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        title: item.title || "",
        firstName: item.firstName || "",
        losterEmail: item.losterEmail || "",
        ownerPhone: item.ownerPhone || "",
        state: item.state || "",
        date: formatDateForInput(item.date || item.date),
        serialNumber: item.serialNumber || item.serialNumber || "",
        additionalInfo: item.additionalInfo || item.additionalInfo || "",
        image: item.image || "",
      });
      setErrors({});
    }
  }, [item, isOpen]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
        // Clear any previous image errors
        setErrors((prev) => ({
          ...prev,
          image: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check if fields exist and are not empty
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = "Item name is required";
    }

    if (!formData.state || !formData.state.trim()) {
      newErrors.state = "state is required";
    }

    if (!formData.date || !formData.date.trim()) {
      newErrors.date = "Date found is required";
    }

    if (!formData.serialNumber || !formData.serialNumber.trim()) {
      newErrors.serialNumber = "Serial number is required";
    }

    if (!formData.additionalInfo || !formData.additionalInfo.trim()) {
      newErrors.additionalInfo = "Description is required";
    }

    // Validate email format if provided
    if (formData.losterEmail && formData.losterEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.losterEmail)) {
        newErrors.losterEmail = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with API call
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Fixed: Properly access the item ID
    const itemId = item?._id || item?.id;

    if (!item || !itemId) {
      console.error("Item ID is required for editing. Item:", item);
      setErrors((prev) => ({
        ...prev,
        general: "Unable to identify item for editing. Please try again.",
      }));
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for API call
      const updateData = {
        title: formData.title,
        firstName: formData.firstName,
        losterEmail: formData.losterEmail,
        ownerPhone: formData.ownerPhone,
        state: formData.state,
        date: formData.date,
        serialNumber: formData.serialNumber,
        additionalInfo: formData.additionalInfo,
        image: formData.image,
      };

      // Make API call to update the item
      const response = await fetch(
        `https://smart-trace-device-backend.onrender.com/api/devices/lost/${itemId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedItem = await response.json();

      // Call the onSave callback with updated data from API response
      onSave(updatedItem);

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
      setErrors((prev) => ({
        ...prev,
        general:
          "Failed to update item. Please check your connection and try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form and close modal
  const handleClose = () => {
    setFormData({
      title: "",
      firstName: "",
      losterEmail: "",
      ownerPhone: "",
      state: "",
      date: "",
      serialNumber: "",
      additionalInfo: "",
      image: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(49,49,49,0.8)] bg-opacity-80 flex justify-center items-start sm:items-center z-1000 p-2 sm:p-2 overflow-y-auto">
      <div className=" relative flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Lost Item
              </h3>
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-8 w-8 bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-md shadow-lg"
                type="button"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white">
            <div className="px-4 py-5 sm:p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Item Image */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Item preview"
                        className="h-16 w-16 rounded-md object-cover border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}
                </div>

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter item name"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Founder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter founder name"
                  />
                </div>

                {/* Founder Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founder Email
                  </label>
                  <input
                    type="email"
                    name="losterEmail"
                    value={formData.losterEmail}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.losterEmail ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter founder email"
                  />
                  {errors.losterEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.losterEmail}
                    </p>
                  )}
                </div>

                {/* Founder Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founder Phone
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter founder phone"
                  />
                </div>

                {/* state */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    state Found
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.state ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter state where item was found"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                {/* Date Found */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Found
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.date ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.serialNumber ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter serial number"
                  />
                  {errors.serialNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.serialNumber}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.additionalInfo
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter detailed additionalInfo of the item"
                  />
                  {errors.additionalInfo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// Mock ReportLostItem component
const ReportLostItem: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-lg font-semibold mb-4">Report Lost Item</h2>
        <p className="text-gray-600 mb-4">
          This is a placeholder for the Report Lost Item form.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function UserLostItemById(): JSX.Element {
  const { data } = useGetLostitemByUserQuery();
  const allItems: LostItem[] = data;

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal and form state

  // Filter items based on search term
  const filteredItems = allItems?.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.foundBy?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
  const [itemToEdit, setItemToEdit] = useState<LostItem | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  // Form handling

  // Edit handler

  // Delete handlers
  const [deleteLostitem, { isLoading: isDeleting }] =
    useDeleteLostitemMutation();

  const handleConfirmDelete = (id: string) => {
    Notiflix.Confirm.show(
      "Delete Confirmation",
      "Do you want to delete this item?",
      "Delete",
      "Cancel",
      async () => {
        try {
          console.log("Attempting to delete lost item with ID:", id);

          // Call the delete mutation and wait for response
          const result = await deleteLostitem(id).unwrap();

          console.log("Delete successful:", result);
          toast.success("Product deleted successfully!");

          // The RTK Query will automatically update the cache and refetch data
          // No need to manually update local state since useGetLostitemQuery will re-run
        } catch (error: any) {
          console.error("Delete failed:", error);

          // Handle different types of errors
          let errorMessage = "Failed to delete item. Please try again.";

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
        width: "320px",
        borderRadius: "8px",
        titleColor: "#ff5549",
        okButtonBackground: "#ff5549",
      }
    );
  };

  const handleDeleteClick = (item: LostItem) => {
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

  const handleEdit = (item: LostItem) => {
    setItemToEdit(item);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedItem: LostItem) => {
    console.log("Saving updated item:", updatedItem);
    setShowEditModal(false);
    setItemToEdit(null);
  };

  return (
    <div className="max-w-xl md:max-w-3xl lg:max-w-7xl xl:max-w-7xl mx-auto p-3 sm:p-6 bg-white shadow-lg rounded-lg">
      <h5 className="text-size-xl font-bold text-primaryColor-100 mb-2 sm:mb-2">
        Lost Items Dashboard
      </h5>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search items, 
states, or finders..."
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="flex flex-row gap-2 sm:gap-4">
          <button
            onClick={openReportModal}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryColor-100 hover:bg-primaryColor-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Lost Item
          </button>
        </div>
      </div>

      {/* Desktop view - Table */}
      <div className="block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
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
                  Description
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Serial Number
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Lost
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lost By
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems?.map((item) => (
                <tr key={item._id || item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={import.meta.env.VITE_API_BASE_URL + item.image}
                          alt={item.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkMyMC40MTgzIDE2IDI0IDE5LjU4MTcgMjQgMjRDMjQgMjguNDE4MyAyMC40MTgzIDMyIDE2IDMyQzExLjU4MTcgMzIgOCAyOC40MTgzIDggMjRDOCAxOS41ODE3IDExLjU4MTcgMTYgMTYgMTZaIiBmaWxsPSIjOUM5Qzk3Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDIxLjMzMzNWMjIuNjY2N0gyMi42NjY3VjI0SDIxLjMzMzNWMjUuMzMzM0gyMFYyNEgxOC42NjY3VjIyLjY2NjdIMjBWMjEuMzMzM0gyMS4zMzMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs w-[15 px] text-gray-500">
                          {item.losterEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {item.additionalInfo}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.serialNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.dateFound}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.firstName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.phoneNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                        title="Edit item"
                      >
                        <Edit size={16} />
                      </button>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white pt-3 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`relative ml-3 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {filteredItems?.length > 0 ? indexOfFirstItem + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredItems?.length)}
              </span>{" "}
              of <span className="font-medium">{filteredItems?.length}</span>{" "}
              results
            </p>
          </div>

          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1 || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md text-gray-400
                  ${
                    currentPage === 1 || totalPages === 0
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                title="First Page"
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 text-gray-400
                  ${
                    currentPage === 1 || totalPages === 0
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                title="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-white border border-gray-300">
                Page {totalPages > 0 ? currentPage : 0} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 text-gray-400
                  ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                title="Next Page"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md text-gray-400
                  ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 border border-gray-300"
                  }`}
                title="Last Page"
              >
                <ChevronsRight size={18} />
              </button>
            </nav>
          </div>
        </div>
      </div>

      <ReportLostItem isOpen={isReportModalOpen} onClose={closeReportModal} />

      {/* Edit Modal */}
      <EditModal
        item={itemToEdit}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
