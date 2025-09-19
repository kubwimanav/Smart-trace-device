import type React from "react";
interface ServiceCardProps { 
icon: any;
title: string;
description: string;
}
const ServiceCard: React.FC< ServiceCardProps> =({
  icon,
  title,
  description  
}) => {
    return (
        <div className="text-center">

        <div className="w-17 h-17 mx-auto mb-2 text-2xl border-2 border-[#3A7196] rounded-full flex items-center justify-center">
                {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-small text-[#3A7196] mb-4">
                { title}
        </h3>
        <p className="text-gray-600 text-[11px] sm:text-base leading-relaxed max-w-xs mx-auto">
           {description}
        </p>
      </div>
    );
}
export default ServiceCard;