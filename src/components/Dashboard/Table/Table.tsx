"use client";  // This makes the component a Client Component

import React, { useState } from "react";
import { MessageCircle, Eye, Pencil, Trash2, Search } from "lucide-react"; // Importing icons
import SearchBar from "./Search";
import Button from "@/components/reusable/CustomButton";

type TableData = {
  number: number;
  name: string;
  accreditation: string;
  submitted: string;
  response: string;
  status: string;
};

const Table = () => {
  const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: string }>({ key: null, direction: 'asc' });

  const data: TableData[] = [
    { number: 1, name: "Product Name 1", accreditation: "Vegetarian", submitted: "23/10/2024", response: "N/A", status: "Pending" },
    { number: 2, name: "Product Name 2", accreditation: "Vegetarian", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
    { number: 3, name: "Product Name 3", accreditation: "Vegan", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
    { number: 4, name: "Product Name 4", accreditation: "Plant-Based", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
    { number: 5, name: "Product Name 5", accreditation: "Vegan", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
    { number: 6, name: "Product Name 6", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
    { number: 7, name: "Product Name 7", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
    { number: 8, name: "Product Name 8", accreditation: "Vegetarian", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
    { number: 9, name: "Product Name 9", accreditation: "Vegan", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
    { number: 10, name: "Product Name 10", accreditation: "Vegan", submitted: "29/10/2024", response: "30/10/2024", status: "Accredited" },
  ];

  const handleSort = (key: string) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const aValue = a[sortConfig.key as keyof TableData];
    const bValue = b[sortConfig.key as keyof TableData];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Get the keys from the first object in the data to create dynamic headers
  const headers = Object.keys(data[0]);

  return (
    <div className="px-6 lg:px-40 py-8"> 
        <SearchBar />
        <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        {/* Table Head */}
        <thead className="bg-green-800 text-white">
          <tr>
            {headers.map((heading) => (
                <th
                  key={heading}
                  className="py-3 px-4 text-left border-b cursor-pointer"
                  onClick={() => handleSort(heading)}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                  {sortConfig.key === heading && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                </th>
            ))}
            <th className="py-3 px-4 text-left border-b">Action</th>

          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.number} className="border-b hover:bg-gray-100">
              {headers.map((heading) => (
                heading !== "status" && (
                  <td key={heading} className="py-3 px-4">{item[heading as keyof TableData]}</td>
                )
              ))}
              <td className={`py-3 px-4 font-semibold ${
                item.status === "Pending" ? "text-yellow-500" :
                item.status === "Rejected" ? "text-red-500" :
                "text-green-500"
              }`}>
                {item.status}
              </td>
              <td className="py-3 px-4 flex space-x-2">
                <MessageCircle className="text-green-700 cursor-pointer hover:text-green-500" size={18} />
                <Eye className="text-green-700 cursor-pointer hover:text-green-500" size={18} />
                <Pencil className="text-blue-500 cursor-pointer hover:text-blue-300" size={18} />
                <Trash2 className="text-red-500 cursor-pointer hover:text-red-300" size={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-end mt-4">
        <Button children={'View All'} variant="dark-green" className="text-sm md:text-base lg:text-lg  lg:px-16 lg:py-3  px-8 py-2 " />
      </div>
    </div>

    </div>
    
  );
};

export default Table;
