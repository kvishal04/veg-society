"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";


interface PieData {
    data: {name: string, value: number, color: string}[]
}

const CustomPieChart: React.FC <PieData>= ({data}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only true after mounting on the client
  }, []);

  return (
  
      <div>
              {isClient && ( // Prevents hydration mismatch
          <PieChart width={150} height={150}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={20}
              paddingAngle={2}
              
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </div>
    
  );
};

export default CustomPieChart
