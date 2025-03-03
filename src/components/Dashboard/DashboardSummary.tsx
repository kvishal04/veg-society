"use client";

import React, { useEffect, useState } from "react";
import CustomPieChart from "@/components/Charts/Piechart";
import Badge from "@/styles/logo/Badge";
import Paragraph from "@/components/reusable/Paragraph";
import Right from "@/styles/logo/Right";
import Wrong from "@/styles/logo/Wrong";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useDashboardSummaryQuery } from "@/redux/services/dashboardApi";
import { IchartData } from "@/interface/main";
import { setSelectedTile } from "@/redux/features/ProductDataSlice";

const DashboardSummary: React.FC = () => {
  const { data: productdata } = useDashboardSummaryQuery(0);
  const dispatch = useDispatch<AppDispatch>();
  const { productTable : { accreditation_status } } = useSelector((state: RootState) => state.ProductData); 

  const [chartData, setChartData] = useState<IchartData>([
    { name: "Vegetarian", value: 25, color: "#A6E3A1" },
    { name: "Vegan", value: 3, color: "#f0f0f0" },
    { name: "Plant Based", value: 2, color: "#032B2F" },
  ]);

  useEffect(() => {
    if (productdata) {
      setChartData([
        { name: "Vegetarian", value: productdata.accredited || 1, color: "#A6E3A1" },
        { name: "Vegan", value: productdata.vegan || 1, color: "#f0f0f0" },
        { name: "Plant Based", value: productdata.plant_based || 1, color: "#032B2F" },
      ]);
    }
  }, [productdata]);

  const onTileClick = (value: string) => {
    dispatch(setSelectedTile(accreditation_status === value ? '' : value));
  };

  const cardData = [
    {
      bgColor: "bg-customGreen",
      icon: <Badge className="w-10 h-14 md:w-16 md:h-16" />,
      value: productdata?.accredited,
      label: 'Accredited',
      text: "Products Accredited",
    },
    {
      bgColor: "bg-customOrange",
      icon: <Right className="w-10 h-10 md:w-16 md:h-16" />,
      value: productdata?.pending,
      label: 'Pending',
      text: "Products Pending",
    },
    {
      bgColor: "bg-customRed",
      icon: <Wrong className="w-10 h-10 md:w-16 md:h-16" />,
      value: productdata?.rejected,
      label: 'Rejected',
      text: "Products Rejected",
    },
  ];

  return (
    <div className="font-henriette bg-darkGreen text-white p-2 md:p-8 xl:h-[11.5rem] flex flex-col lg:flex-row gap-6 w-full xl:py-8 xl:px-52">
      {/* Left Section: Pie Chart & Legend */}
      <div className="flex flex-row lg:items-center items-start gap-6 w-full lg:w-2/5">
        <CustomPieChart chartData={chartData} />

        <div className="w-full text-sm">
          <div className="border-b-2 border-white mb-4 py-2">
            <Paragraph className="text-2xl lg:text-xl xl:text-3xl">Products Accredited</Paragraph>
          </div>
          {chartData.map((item) => (
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
      <div className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3 gap-4 w-full lg:w-3/5">
        {cardData.map(({ bgColor, icon, value, text, label }) => (
          <button
            key={text}
            onClick={() => onTileClick(label)}
            className={`${bgColor} p-4 rounded-lg flex flex-col gap-4 items-start justify-evenly xl:justify-between xl:h-32 
              ${accreditation_status && accreditation_status !== label ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-2 md:gap-8">
              {icon}
              <Paragraph className="text-3xl md:text-5xl font-bold">{value}</Paragraph>
            </div>
            <Paragraph className="text-sm md:text-base lg:text-[12px] 2xl:text-lg">{text}</Paragraph>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
