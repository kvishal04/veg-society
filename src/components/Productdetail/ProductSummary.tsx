"use client";

import React, { useState } from "react";
import CustomPieChart from "@/components/Charts/Piechart";
import Badge from "@/styles/logo/Badge";
import Paragraph from "@/components/reusable/Paragraph";
import Right from "@/styles/logo/Right";
import Wrong from "@/styles/logo/Wrong";
import Input from "../reusable/Input";

const data = [
  { name: "Vegetarian", value: 25, color: "#A6E3A1" },
  { name: "Vegan", value: 3, color: "#f0f0f0" },
  { name: "Plant Based", value: 2, color: "#032B2F" },
];

const ProductSummary: React.FC = () => {
  const [accreditation, setAccreditation] = useState("Vegetarian");
  const [productName, setProductName] = useState("Product Name 1");

  return (
    <div className="bg-darkGreen text-white p-8 xl:h-auto flex flex-col gap-6 w-full xl:py-8 xl:px-52">
      
      {/* Product Name Label and Input */}
      <div className="flex flex-row w-full items-center">
        <label className="w-40 text-lg font-medium mb-1" htmlFor="productName">
          Product Name:
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 text-darkGreen rounded-md border border-green-600"
        />
      </div>

      <hr className="border-green-700" />

    <div className="flex justify-between gap-8 items-center">
    <div className="flex justify-start gap-8 items-start">
          {/* Accreditation Status */}
      <div className="flex flex-col items-start justify-start border-r-2 border-white px-4 ">
        <div className="flex items-center gap-2">
          <span className="text-md">Accreditation Status:</span>
          <span className="font-semibold">Pending</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span> Vegetarian
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span> Vegan
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Plant-Based
          </span>
        </div>
      </div>

      {/* Requested Accreditation */}
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center  gap-2">
          <span>Requested Accreditation:</span>
          <select
            id="accreditation"
            className="bg-green-800 text-white p-2 rounded border border-green-600"
            value={accreditation}
            onChange={(e) => setAccreditation(e.target.value)}
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Plant-Based">Plant-Based</option>
          </select>
        </div>

        {/* Submission & Response Dates */}
        <div className="text-sm flex justify-start items-start gap-4">
          <p>Submitted on: <span className="font-semibold">23-10-2024</span></p>
          <p>Response Date: <span className="font-semibold">25-10-2024</span></p>
        </div>
      </div>
    </div>
    

      {/* Floating Initials and View Notes Button */}
      <div className="mt-4 flex justify-between items-center">

        <button className="bg-white text-green-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-200">
          📋 View Notes
        </button>
      </div>
    </div>
   

    </div>
  );
};

export default ProductSummary;
