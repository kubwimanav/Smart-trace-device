// Item Card component for mobile view
import { useEffect, useState, type JSX } from "react";
import Notiflix from "notiflix";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
  X,
  Save,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDeleteFounditemMutation, useGetFounditemQuery } from "../../Api/founditem";

// TypeScript interfaces
interface LostItem {
  id: string;
  name: string;
  category: string;
  description: string;
  serialnumber: string;
  founderEmail: string;
  location: string;
  phoneNumber: string;
  firstName: string;
  address: string;
  province: string;
  district: string;
  lastName: string;
  deviceimage: string;
}

interface EditModalProps {
  item: LostItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: LostItem) => void;
}


interface FormData {
  name: string;
  category: string;
  description: string;
  serialnumber: string;
  founderEmail: string;
  location: string;
  phoneNumber: string;
  firstName: string;
  address: string;
  province: string;
  district: string;
  lastName: string;
  deviceimage: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  serialnumber?: string;
  founderEmail?: string;
  location?: string;
  firstName?: string;
  address?: string;
  province?: string;
  district?: string;
  lastName?: string;
  [key: string]: string | undefined;
}

// Static data for demonstration



const EditModal: React.FC<EditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    description: "",
    serialnumber: "",
    founderEmail: "",
    location: "",
    phoneNumber: "",
    firstName: "",
    address: "",
    province: "",
    district: "",
    lastName: "",
    deviceimage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize form data when item changes
  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        name: item.name || "",
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        founderEmail: item.founderEmail || "",
        phoneNumber: item.phoneNumber || "",
        location: item.location || "",
        district: item.district || "",
        province: item.province || "",
        address: item.address || "",
        category: item.category || "",
        serialnumber: item.serialnumber || "",
        description: item.description || "",
        deviceimage: item.deviceimage || "",
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
          deviceimage: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          deviceimage: "Please select a valid image file",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          deviceimage: e.target?.result as string,
        }));
        // Clear any previous image errors
        setErrors((prev) => ({
          ...prev,
          deviceimage: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check if fields exist and are not empty
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Item name is required";
    }

    if (!formData.location || !formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.serialnumber || !formData.serialnumber.trim()) {
      newErrors.serialnumber = "Serial number is required";
    }

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Validate email format if provided
    if (formData.founderEmail && formData.founderEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.founderEmail)) {
        newErrors.founderEmail = "Please enter a valid email address";
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

    // Get the item ID
    const itemId = item?.id || item?.id;

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
        name: formData.name,
        firstName: formData.firstName,
        lastName: formData.lastName,
        founderEmail: formData.founderEmail,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        district: formData.district,
        province: formData.province,
        address: formData.address,
        category: formData.category,
        serialnumber: formData.serialnumber,
        description: formData.description,
        deviceimage: formData.deviceimage,
      };

      // Make API call to update the found item
      const response = await fetch(
        `https://smart-trace-device-backend.onrender.com/api/devices/found/${itemId}/`,
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
      name: "",
      category: "",
      description: "",
      serialnumber: "",
      founderEmail: "",
      location: "",
      phoneNumber: "",
      firstName: "",
      address: "",
      province: "",
      district: "",
      lastName: "",
      deviceimage: "",
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
                Edit Found Item
              </h3>
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-8 w-8 bg-primaryColor-100 text-white hover:bg-blue-800 transition-colors rounded-md shadow-lg"
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
                    {formData.deviceimage && (
                      <img
                        src={
                          formData.deviceimage.startsWith("data:")
                            ? formData.deviceimage
                            : import.meta.env.VITE_API_BASE_URL +
                              formData.deviceimage
                        }
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
                  {errors.deviceimage && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.deviceimage}
                    </p>
                  )}
                </div>

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter item name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Founder Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founder Email
                  </label>
                  <input
                    type="email"
                    name="founderEmail"
                    value={formData.founderEmail}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.founderEmail ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter founder email"
                  />
                  {errors.founderEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.founderEmail}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Found
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter location where item was found"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item category"
                  />
                </div>

                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="serialnumber"
                    value={formData.serialnumber}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.serialnumber ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter serial number"
                  />
                  {errors.serialnumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.serialnumber}
                    </p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter district"
                  />
                </div>

                {/* Province */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter province"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter detailed description of the item"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primaryColor-100 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

export default function AdminFoundItem(): JSX.Element {
  
  const { data,refetch } = useGetFounditemQuery();
  

  const allItems: LostItem[] = data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal and form state

  // Filter items based on search term
  const filteredItems = allItems?.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.founderEmail?.toLowerCase().includes(searchTerm.toLowerCase());

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



const [deleteProduct] = useDeleteFounditemMutation();

 const handleConfirmDelete = (id: string) => {
  Notiflix.Confirm.show(
    "Delete Confirmation",
    "Do you want to delete this item?",
    "Delete",
    "Cancel",
    async () => {
      try {
        console.log("Attempting to delete lost item with ID:", id);

        const result = await deleteProduct(id).unwrap();

        console.log("Delete successful:", result);
        toast.success("FoundItem deleted successfully!", {
          autoClose: 2000,
        });

        // Force refetch to update UI immediately
        await refetch();
      } catch (error: any) {
        console.error("Delete failed:", error);

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
  if (item && item.id) {
    handleConfirmDelete(item.id);
  } else {
    console.error("Item or item ID is missing");
    toast.error("Cannot delete item - ID is missing");
  }
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
        Found Items
      </h5>

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="flex flex-row gap-2 sm:gap-4">
          <button
            onClick={openReportModal}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryColor-100  hover:bg-primaryColor-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Found Item
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
                  Location
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
                  Found By
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
                <tr key={item.id || item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={
                            import.meta.env.VITE_API_BASE_URL + item.deviceimage
                          }
                          alt={item.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkMyMC40MTgzIDE2IDI0IDE5LjU4MTcgMjQgMjRDMjQgMjguNDE4MyAyMC40MTgzIDMyIDE2IDMyQzExLjU4MTcgMzIgOCAyOC40MTgzIDggMjRDOCAxOS41ODE3IDExLjU4MTcgMTYgMTYgMTZaIiBmaWxsPSIjOUM5Qzk3Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDIxLjMzMzNWMjIuNjY2N0gyMi42NjY3VjI0SDIxLjMzMzNWMjUuMzMzM0gyMFYyNEgxOC42NjY3VjIyLjY2NjdIMjBWMjEuMzMzM0gyMS4zMzMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-xs w-[15 px] text-gray-500">
                          {item.founderEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.location}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.serialnumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.lastName}</div>
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
