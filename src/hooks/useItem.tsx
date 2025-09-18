// LostItemCard.tsx
import React from "react";
import type { LostItem } from "../type/type";

interface LostItemCardProps {
  item: LostItem;
  title: string;
}

const LostItemCard: React.FC<LostItemCardProps> = ({ item,title }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-80  object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
          {title}: {item.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
          <span className="font-medium">Location:</span> {item.location}
        </p>
        <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors">
          View Lost Item
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;
