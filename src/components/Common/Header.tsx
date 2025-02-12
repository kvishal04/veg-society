"use client";

import React from "react";
import Button from "@/components/reusable/Button";
import Heading from "@/components/reusable/Heading";
import Paragraph from "@/components/reusable/Paragraph";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import ProductCreateModal from "@/components/Modals/ProductCreateModal";


interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Company Name'
}) => {
  const userData = useSelector((state: RootState) => state?.auth.token);

  return (
    <header className="bg-[#002326] text-white">
      {/* Top Bar */}
      <div className="flex justify-end items-center px-6 lg:px-40 py-3 border-b border-white">
        <div className="flex items-center gap-12 text-sm">
        {!userData? 
          <span className="flex items-center gap-1">
            <i className="fas fa-user"></i> Hi Johnny!
          </span>
        : <></>}
        {!userData? 
          <Paragraph className="hover:underline ">Log out</Paragraph>
          : <></>}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex md:flex-row md:justify-between flex-col justify-start items-center px-6 lg:px-40 py-8">

        <div className="flex flex-row justify-start items-center gap-8">
            {/* Logo */}
            <div className="  border-r-2 border-white  w-[150px] md:w-[245px] h-[75px]">
              <Image alt='brand' width={100} height={100} className="w-32 h-full sm:w-32 md:w-44 lg:w-52  " src={`assets/images/Group.svg`} />
            </div>
            <Heading level={1} children={title} className=" sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl"></Heading>
            
        </div>
    
        {/* Action Button */}
        {!userData  ?
        <div className="flex flex-row gap-8 justify-between items-center mt-4">
          <Paragraph className="underline "> Dashboard </Paragraph>
          <Button children={'Add New Product'} variant="dark-green"  className="text-sm md:text-base lg:text-lg  lg:px-[2.2rem] lg:py-3  md:px-4 md:py-2  px-3 py-1 " />
        </div>
        : <></>}
      </div>

      <>
          <ProductCreateModal isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } onSave={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </>
    </header>
  );
};

export default Header;
