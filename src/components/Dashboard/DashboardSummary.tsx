"use client";

import React from "react";
import CustomPieChart from "@/components/Charts/Piechart";
import Badge from "@/styles/logo/Badge";
import Paragraph from "@/components/reusable/Paragraph";
import Right from "@/styles/logo/Right";
import Wrong from "@/styles/logo/Wrong";

const data = [
  { name: "Vegetarian", value: 25, color: "#A6E3A1" },
  { name: "Vegan", value: 3, color: "#f0f0f0" },
  { name: "Plant Based", value: 2, color: "#032B2F" },
];

const DashboardSummary: React.FC = () => {
  return (
    <div className="font-henriette bg-darkGreen text-white p-2 md:p-8 xl:h-[11.5rem] flex flex-col lg:flex-row gap-6 w-full xl:py-8 xl:px-52">
      {/* Left Section: Pie Chart & Legend */}
      <div className="flex flex-row lg:items-center items-start gap-6 w-full lg:w-2/5">
        <CustomPieChart data={data} />

        <div className="w-full text-sm">
          <div className="border-b-2 border-white mb-4 py-2">
            <Paragraph className="text-2xl lg:text-xl xl:text-3xl">
              Products Accredited
            </Paragraph>
          </div>
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
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
      <div className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3 gap-4 w-full lg:w-3/5 ">
        {/* Card 1 */}
        <div className="bg-customGreen p-4 rounded-lg flex flex-col gap-4 items-start justify-evenly xl:justify-between   xl:h-32">
          <div className="flex items-center gap-2 md:gap-2 ">
            <Badge className="w-10 h-14 md:w-16 md:h-16" />
            <Paragraph className="text-3xl md:text-5xl  font-bold">25</Paragraph>
          </div>
          <Paragraph className="text-sm md:text-base lg:text-[12px] 2xl:text-lg">
            Products Accredited
          </Paragraph>
        </div>

        {/* Card 2 */}
        <div className="bg-customOrange p-4 rounded-lg flex flex-col items-start gap-4 justify-evenly xl:justify-between   xl:h-32">
          <div className="flex items-center gap-4 md:gap-8 ">
            <Right className="w-10 h-10 md:w-16 md:h-16" />
            <Paragraph className="text-3xl md:text-5xl font-bold">3</Paragraph>
          </div>
          <Paragraph className="text-sm md:text-base lg:text-[12px] 2xl:text-lg">
            Products Pending
          </Paragraph>
        </div>

        {/* Card 3 */}
        <div className="bg-customRed p-4 rounded-lg flex flex-col items-start gap-2 md:gap-4 justify-evenly xl:justify-between  xl:h-32">
          <div className="flex items-center gap-4 md:gap-8 ">
            <Wrong className="w-10 h-10 md:w-16 md:h-16" />
            <Paragraph className="text-2xl md:text-5xl font-bold">2</Paragraph>
          </div>
          <Paragraph className="text-base lg:text-[12px] xl:text-[12px] 2xl:text-lg ">
            Products Rejected
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
