"use client";  // This makes the component a Client Component

import Select from "@/components/reusable/Select";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/reusable/Input";


const statusData = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Accredited', label: 'Accredited' },
  { value: 'Rejected', label: 'Rejected' },
]

const AccreditationData = [
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Plant', label: 'Plant' },
  { value: 'Vegan', label: 'Vegan' },
]

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accreditation, setAccreditation] = useState("Plant");
  const [status, setStatus] = useState("Accredited");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccreditation(e.target.value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full py-8 rounded-lg">
  {/* Search Input */}
  <div className="relative flex items-center w-full md:col-span-3">
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search"
      className="w-full p-4 pl-4 pr-8 border-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-green-700"
    />
    <Search className="absolute right-3 text-green-700" size={18} />
  </div>

  {/* Accreditation Dropdown */}
  <Select
    className="w-full p-4 border-2 border-green-700 rounded-md bg-white text-green-700 outline-none"
    options={AccreditationData}
    value={accreditation}
    onChange={handleSelectChange}
  />

  {/* Status Dropdown */}
  <Select
    className="w-full p-4 border-2 border-green-700 rounded-md bg-white text-green-700 outline-none"
    options={statusData}
    value={status}
    onChange={handleSelectChange}
  />
</div>

  );
};

export default ProductSearchBar;
