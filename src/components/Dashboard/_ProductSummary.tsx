"use client";

import React from "react";
import CustomPieChart from "../Charts/_Piechart";
import Badge from "@/styles/logo/_Badge";

const data = [
  { name: "Products Accredited", value: 25, color: "#A6E3A1" },
  { name: "Products Rejected", value: 2, color: "#032B2F" },
];

const ProductSummary: React.FC = () => {


  return (
    <div className="bg-darkGreen text-white p-6  h-auto flex flex-col px-6 lg:px-20 lg:flex-row justify-between items-center gap-6 w-full">
      {/* Pie Chart - Render only on client */}
      <div className="flex flex-row items-center gap-4">
        <CustomPieChart data={data} />

        <div className="text-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 line">
              <span
                className="w-5 h-5 inline-block rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name} 
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-customGreen pt-4 rounded-lg  w-[224px] h-[125px]">
            <div className=" flex items-center gap-1 justify-start">
                <Badge width={80} height={60} />
                <div>
                    <p className="text-5xl font-bold">25</p>
                </div>
            </div>
            <p className="text-xl m-2">Products Accredited</p>
        </div>
          
        <div className="bg-customGreen pt-4 rounded-lg  w-[224px] h-[125px]">
            <div className=" flex items-center gap-1 justify-start">
                <Badge width={80} height={60} />
                <div>
                    <p className="text-5xl font-bold">25</p>
                </div>
            </div>
            <p className="text-xl m-2">Products Accredited</p>
        </div>

        <div className="bg-customGreen pt-4 rounded-lg  w-[224px] h-[125px]">
            <div className=" flex items-center gap-1 justify-start">
                <Badge width={80} height={60} />
                <div>
                    <p className="text-5xl font-bold">25</p>
                </div>
            </div>
            <p className="text-xl m-2">Products Accredited</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary
