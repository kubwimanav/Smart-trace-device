// LostItemCard.tsx
import React from "react";
interface LostItemCardProps {
  image: string;
  location: string;
  title: string;
}

const LostItemCard: React.FC<LostItemCardProps> = ({ image,location,title }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-80  object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
         Title: {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
          <span className="font-medium">Location:</span> {location}
        </p>
        <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors">
          View Lost Item
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;
