"use client";

import { IchartData } from "@/interface/main";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


type ChartProps = {
  chartData : IchartData
};


const CustomPieChart: React.FC<ChartProps> = ({chartData}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only true after mounting on the client
  }, []);

  return (
    <div>
      {isClient && ( // Prevents hydration mismatch
        <PieChart width={150} height={150}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={62}
            innerRadius={0}
            paddingAngle={0}
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color}  />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
        </PieChart>
      )}
    </div>
  );
};

export default CustomPieChart;
