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
              outerRadius={62}
              innerRadius={0}
              paddingAngle={0}
              
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </div>
    
  );
};

export default CustomPieChart
