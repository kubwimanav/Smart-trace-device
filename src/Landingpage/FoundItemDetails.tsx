import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  Tag,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { useGetFoundbyidMutation } from "../Api/founditem";

const FoundItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [getLostById, { data: item, isLoading, error }] =
    useGetFoundbyidMutation();

  useEffect(() => {
    if (id) {
      getLostById(id);
    }
  }, [id, getLostById]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Item Not Found
        </h1>
        <p className="text-gray-600 text-center mb-6">
          The item you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "found":
        return "bg-green-100 text-green-800 border-green-200";
      case "lost":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Lost Items
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {item.title}
            </h1>

            {item.status && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  item.status
                )} capitalize`}
              >
                {item.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.image ? (
                <img
                  src={import.meta.env.VITE_API_BASE_URL + item.image}
                  alt={item.title}
                  className="w-full h-80 md:h-96 object-cover"
                />
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-200 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Item Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-gray-500">Category:</span>
                    <p className="font-medium">
                      {item.category || "Not specified"}
                    </p>
                  </div>
                </div>

                {item.brand && (
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm text-gray-500">Brand:</span>
                      <p className="font-medium">{item.brand}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-gray-500">
                      Address Found:
                    </span>
                    <p className="font-medium">{item.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-gray-500">Location:</span>
                    <p className="font-medium">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Contact Info Card */}
            {item.contactInfo && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="flex items-center gap-3">
                  {item.contactInfo.includes("@") ? (
                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                  <p className="font-medium text-blue-600">
                    {item.contactInfo}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Found This Item?
              </h2>
              <p className="text-gray-600 mb-4">
                If you have found this item or have information about it, please
                contact the owner using the information provided above.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {item.contactInfo && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {item.contactInfo.includes("@") ? (
                      <>
                        <Mail className="w-4 h-4" />
                        Send Email
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        Call Owner
                      </>
                    )}
                  </button>
                )}

                <button className="px-4 py-2 bg-primaryColor-100 text-white hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Claim Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemDetail;
