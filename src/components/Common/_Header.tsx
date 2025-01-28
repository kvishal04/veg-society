import React from "react";
import Link from "next/link";
import CustomButton from "../reusable/CustomButton";
import Logo from "@/styles/logo/_Logo";
import CustomTextarea from "../reusable/CustomTesxtArea";
import CustomHeading from "../reusable/CustomHeading";
import CustomParagraph from "../reusable/CustomParagraph";



const Header = () => {
  return (
    <header className="bg-[#002326] text-white">
      {/* Top Bar */}
      <div className="flex justify-end items-center px-6 lg:px-20 py-2 border-b border-white">
        
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <i className="fas fa-user"></i> Hi Johnny!
          </span>
          <CustomParagraph className="hover:underline ">Log out</CustomParagraph>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-row justify-between items-center px-6 lg:px-20 py-8">

        <div className="flex flex-row justify-start items-center gap-4 ">
            {/* Logo */}
            <div className="flex items-center gap-2 p-4 ">
                <Logo  width={60} height={60}/>
                <div className=" border-r-2 border-white pr-8">
                    <CustomParagraph className="text-2xl lg:text-3xl font-bold">Vegetarian</CustomParagraph>
                    <CustomParagraph className="text-2xl lg:text-3xl font-bold">Society</CustomParagraph>
                </div>
            </div>

            <CustomHeading level={1} children={'Company Name'} className="text-2xl lg:text-4xl"></CustomHeading>
        </div>
    
        {/* Action Button */}
        <CustomButton children={'Add New Product'} variant="dark-green" size="lg" />
      </div>
    </header>
  );
};

export default Header;
