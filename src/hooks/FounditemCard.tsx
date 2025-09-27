// LostItemCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
interface LostItemCardProps {
  id: string;
  image: string;
  location: string;
  title: string;
  type?: "lost" | "found"; // Optional type prop
}

const FoundItemCard: React.FC<LostItemCardProps> = ({
  image,
  id,
  location,
  title,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/founddetails/${id}`);
  };
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full bg-gray-100">
        <img src={image} alt={title} className="w-full h-55  object-cover" />
      </div>
      <div className="py-4 px-1 border-t-1 border-gray-400">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
          Title: {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
          <span className="font-medium">Location:</span> {location}
        </p>
        <button
          onClick={handleCardClick}
          className=" w-full bg-primaryColor-100 rounded-md py-2 text-white hover:bg-blue-900 text-xs sm:text-sm font-medium transition-colors"
        >
          View Item Details
        </button>
      </div>
    </div>
  );
};

export default FoundItemCard;

