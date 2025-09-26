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

const LostItemCard: React.FC<LostItemCardProps> = ({ image,id, location, title }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/lost-items/${id}`);
    };
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-55  object-cover"
        />
      </div>
      <div className="p-4 border-t-1 border-gray-400">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
         Title: {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
          <span className="font-medium">Location:</span> {location}
        </p>
        <button
          onClick={handleCardClick}
          className=" w-full text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors">
          View Lost Item
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin, Calendar } from "lucide-react";

// interface LostItemCardProps {
//   id: string; // Add id prop to navigate to detail page
//   title: string;
//   image: string;
//   location: string;
//   dateLost?: string; // Optional date prop
//   category?: string; // Optional category prop
// }

// const LostItemCard: React.FC<LostItemCardProps> = ({ 
//   id, 
//   title, 
//   image, 
//   location, 
//   dateLost,
//   category 
// }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/lost-items/${id}`);
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return null;
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   return (
//     <div 
//       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
//       onClick={handleCardClick}
//     >
//       <div className="relative">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-48 object-cover"
//           onError={(e) => {
//             const target = e.target as HTMLImageElement;
//             target.src = '/placeholder-image.jpg'; // Fallback image
//           }}
//         />
//         {category && (
//           <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
//             {category}
//           </div>
//         )}
//       </div>
      
//       <div className="p-4">
//         <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
//           {title}
//         </h3>
        
//         <div className="flex items-center text-gray-600 mb-2">
//           <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
//           <span className="text-sm truncate">{location}</span>
//         </div>
        
//         {dateLost && (
//           <div className="flex items-center text-gray-600 mb-3">
//             <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
//             <span className="text-sm">{formatDate(dateLost)}</span>
//           </div>
//         )}
        
//         <button 
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent card click when button is clicked
//             handleCardClick();
//           }}
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LostItemCard;