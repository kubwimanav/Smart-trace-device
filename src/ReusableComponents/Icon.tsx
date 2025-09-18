import type React from "react";

interface IconProps{
    location: string;
    discription: string;
    icon: any;
}
const Icon: React.FC<IconProps> = ({
    location,
    discription,
    icon
}) => {

    return (
      <div className=" flex gap-5">
        <div className="flex items-center justify-center text-black h-17 w-17 rounded-full p-4 border-[1.8px] border-primaryColor-100">
          <span className="text-3xl">{icon} </span>
        </div>
        <div className=" flex flex-col gap-1">
          <span className=" text-xl font-medium">{location}</span>
          <span>{discription}</span>
        </div>
      </div>
    );
}

export default Icon
