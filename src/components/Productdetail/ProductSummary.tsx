"use client";
import React, { useState } from "react";
import Input from "../reusable/Input";
import Select from "../reusable/Select";
import { AccreditationData as data } from "@/FakeJson/tabledata";
import Details from "@/styles/logo/Details";

const AccreditationData = [...data]
const ProductSummary: React.FC = () => {
  const [accreditation, setAccreditation] = useState("Vegetarian");
  const [productName, setProductName] = useState("Product Name 1");

  return (
    <div className="bg-darkGreen text-white p-2 md:p-8 xl:h-auto flex flex-col gap-2 w-full px-4 md:px-12  xl:py-8 xl:px-52 font-henriette">
      
      {/* Product Name Label and Input */}
      <div className="flex flex-row w-full items-center">
        <label className="w-48 text-2xl font-medium " htmlFor="productName">
          Product Name:
        </label>
        <Input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 text-2xl bg-[#004537] rounded-md border border-green-600"
        />
      </div>

      <hr className="border-white" />

    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start  gap-8 lg:items-center">
      <div className="flex flex-col lg:flex-row justify-start gap-4 items-start  w-full md:w-3/4  xl:w-[80%]">
            {/* Accreditation Status */}
        <div className="flex flex-col items-start justify-start w-full  2xl:w-[55%]">
          <div className="flex items-end gap-2 mt-3 mb-4">
            <div className=" text-lg lg:text-2xl">Accreditation Status:</div>
            <span className="text-xl lg:text-2xl font-semibold">Pending</span>
          </div>

          <div className="flex items-center gap-4 text-sm md:text-xl w-full lg:w-auto">
            <span className="flex items-center gap-2 ">
              <span className="w-5 h-5 bg-green-500 rounded-full"></span> Vegetarian
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 bg-orange-500 rounded-full"></span> Vegan
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 bg-red-500 rounded-full"></span> Plant-Based
            </span>
          </div>
        </div>

        {/* Requested Accreditation */}
        <div className="flex flex-col items-start justify-start border-t-2 pt-4 lg:pt-0 lg:border-t-0 lg:border-l-2 border-white lg:pl-8 w-full">
          <div className="flex items-center gap-1 text-2xl mb-2 w-full">
            <span className="mr-2 text-xl lg:text-lg">Requested Accreditation:</span>
            <div className="">
              <Select
                options={AccreditationData}
                id="accreditation"
                className="w-full hover:bg-slate-400 text-center mt-2 px-4 py-2 gap-4  text-xl bg-[#004537]  border border-darkGreen  focus:ring-black appearance-none  rounded-lg text-white outline-none"
                value={accreditation}
                optionClassName="text-base text-center hover:bg-green-400"
                onChange={(value) => setAccreditation(value)}
              />
            </div>
          
          </div>

          {/* Submission & Response Dates */}
          <div className="flex flex-col xl:flex-row justify-start items-start gap-2 text-base md:text-lg 2xl:text-lg md:w-full">
            <p>Submitted on: <span className="ml-2">23-10-2024</span></p>
            <p className="xl:ml-4">Response Date: <span className="ml-2">25-10-2024</span></p>
          </div>
        </div>
      </div>
    

      {/* Floating Initials and View Notes Button */}
      <div className="mt-4 flex justify-between items-center  w-full md:w-1/4 lg:w-auto">

        <button className= "flex gap-2 justify-start items-center bg-white text-green-900 font-semibold  pr-8 2xl:pr-16 pl-2 2xl:pl-4 p py-2 rounded-lg shadow hover:bg-gray-200">
          <Details className="text-xl text-darkGreen" />
          <span> View Notes </span>
        </button>
      </div>
    </div>
   

    </div>
  );
};

export default ProductSummary;
