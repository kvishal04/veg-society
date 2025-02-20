"use client";
import React, { useState } from "react";
import Input from "../reusable/Input";
import Select from "../reusable/Select";
import { AccreditationData as data } from "@/FakeJson/tabledata";
import Image from "next/image";
import Details from "@/styles/logo/Details";

const AccreditationData = [...data]
const ProductSummary: React.FC = () => {
  const [accreditation, setAccreditation] = useState("Vegetarian");
  const [productName, setProductName] = useState("Product Name 1");

  return (
    <div className="bg-darkGreen text-white p-8 xl:h-auto flex flex-col gap-2 w-full xl:py-8 xl:px-52 font-henriette">
      
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

    <div className="flex justify-between gap-8 items-center">
    <div className="flex justify-start gap-8 items-start">
          {/* Accreditation Status */}
      <div className="flex flex-col items-start justify-start border-r-2 border-white pr-4 ">
        <div className="flex items-end gap-2 mt-3 mb-4">
          <div className="text-2xl">Accreditation Status:</div>
          <span className="text-2xl font-semibold">Pending</span>
        </div>

        <div className="flex items-center gap-4 text-xl">
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
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center gap-1 text-2xl mb-2">
          <span className="w-[18rem]">Requested Accreditation:</span>
          <div className="w-36">
            <Select
              options={AccreditationData}
              id="accreditation"
              className="w-full py-2 text-xl px-2 bg-[#004537]  border border-darkGreen  focus:ring-black appearance-none  rounded-lg text-white outline-none"
              value={accreditation}
              onChange={(e) => setAccreditation(e.target.value)}
            />
          </div>
         
        </div>

        {/* Submission & Response Dates */}
        <div className="flex justify-start items-start gap-4 text-xl">
          <p>Submitted on: <span className="ml-3">23-10-2024</span></p>
          <p>Response Date: <span className="ml-3">25-10-2024</span></p>
        </div>
      </div>
    </div>
    

      {/* Floating Initials and View Notes Button */}
      <div className="mt-4 flex justify-between items-center">

        <button className= "flex gap-2 justify-start items-center bg-white text-green-900 font-semibold pr-16 pl-4 p py-2 rounded-lg shadow hover:bg-gray-200">
          <Details className="text-xl text-darkGreen" />
          <span> View Notes </span>
        </button>
      </div>
    </div>
   

    </div>
  );
};

export default ProductSummary;
