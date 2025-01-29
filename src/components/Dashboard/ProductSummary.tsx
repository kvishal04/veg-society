"use client";

import React from "react";
import CustomPieChart from "../Charts/Piechart";
import Badge from "@/styles/logo/Badge";
import Paragraph from "../reusable/CustomParagraph";
import Right from "@/styles/logo/Right";
import Wrong from "@/styles/logo/Wrong";

const data = [
  { name: "Vegetarian", value: 25, color: "#A6E3A1" },
  { name: "Vegan", value: 3, color: "#f0f0f0" },
  { name: "Plant Based", value: 2, color: "#032B2F" },
];

const ProductSummary: React.FC = () => {
  return (
    <div className="bg-darkGreen text-white p-6 h-auto flex flex-col lg:flex-row gap-6 w-full xl:px-40">
      {/* Left Section: Pie Chart & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center items-start gap-6 w-full lg:w-2/5">
        <CustomPieChart data={data} />

        <div className="w-full text-sm">
          <div className="border-b-2 border-white mb-4 py-2">
            <Paragraph className="text-xl md:text-3xl">
              Products Accredited
            </Paragraph>
          </div>
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <span
                className="w-5 h-5 inline-block rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full lg:w-3/5">
        {/* Card 1 */}
        <div className="bg-customGreen p-4 rounded-lg flex flex-col items-start">
          <div className="flex items-center gap-2">
            <Badge className="w-14 h-14 lg:w-16 lg:h-16" />
            <Paragraph className="text-5xl font-bold">25</Paragraph>
          </div>
          <Paragraph className="text-sm md:text-base xl:text-lg mt-2">
            Products Accredited
          </Paragraph>
        </div>

        {/* Card 2 */}
        <div className="bg-customOrange p-4 rounded-lg flex flex-col items-start">
          <div className="flex items-center gap-2">
            <Right width={80} height={60} />
            <Paragraph className="text-5xl font-bold">3</Paragraph>
          </div>
          <Paragraph className="text-sm md:text-base xl:text-lg mt-2">
            Products Accredited
          </Paragraph>
        </div>

        {/* Card 3 */}
        <div className="bg-customRed p-4 rounded-lg flex flex-col items-start">
          <div className="flex items-center gap-8">
            <Wrong className="w-14 h-14 lg:w-16 lg:h-16" />
            <Paragraph className="text-5xl font-bold">2</Paragraph>
          </div>
          <Paragraph className="text-sm md:text-base xl:text-lg mt-2">
            Products Accredited
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
