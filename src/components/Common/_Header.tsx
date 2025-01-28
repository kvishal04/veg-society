import React from "react";
import Button from "../reusable/CustomButton";
import Logo from "@/styles/logo/_Logo";
import Heading from "../reusable/CustomHeading";
import Paragraph from "../reusable/CustomParagraph";



const Header = () => {
  return (
    <header className="bg-[#002326] text-white">
      {/* Top Bar */}
      <div className="flex justify-end items-center px-6 lg:px-40 py-2 border-b border-white">
        
        <div className="flex items-center gap-12 text-sm">
          <span className="flex items-center gap-1">
            <i className="fas fa-user"></i> Hi Johnny!
          </span>
          <Paragraph className="hover:underline ">Log out</Paragraph>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex md:flex-row md:justify-between flex-col justify-start items-center px-6 lg:px-40 py-8">

        <div className="flex flex-row justify-between items-center md:gap-4 ">
            {/* Logo */}
            <div className="flex items-center gap-2 p-4 ">
                <Logo  width={50} height={60}/>
                <div className=" border-r-2 border-white pr-4 lg:pr-8">
                    <Paragraph className="sm:text-xl md:text-2xl lg:text-3xl font-bold">Vegetarian</Paragraph>
                    <Paragraph className="sm:text-xl md:text-2xl lg:text-3xl font-bold">Society</Paragraph>
                </div>
            </div>
            <Heading level={1} children={'Company Name'} className="sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl"></Heading>
        </div>
    
        {/* Action Button */}
        <div className="flex flex-row gap-8 justify-between items-center">
          <Paragraph className="underline "> Dashboard </Paragraph>
          <Button children={'Add New Product'} variant="dark-green"  className="text-sm md:text-base lg:text-lg  lg:px-5 lg:py-3  md:px-4 md:py-2  px-3 py-1 " />
        </div>
      </div>
    </header>
  );
};

export default Header;
