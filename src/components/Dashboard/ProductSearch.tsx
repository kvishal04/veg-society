"use client";  // This makes the component a Client Component

import Select from "@/components/reusable/Select";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/reusable/Input";
import { AccreditationData as data, statusData as statusMenu } from "@/FakeJson/tabledata";


const statusData = [...statusMenu]
const AccreditationData = [...data]

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("Accredited");
  const [accreditation, setAccreditation] = useState("Plant");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccreditation(e.target.value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-7 w-full pb-7 rounded-lg">
  {/* Search Input */}
  <div className="relative flex items-center w-full md:col-span-3">
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search"
      className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none placeholder-green-700"
    />
    <Search className="absolute right-3 text-green-700" size={18} />
  </div>

  {/* Accreditation Dropdown */}
  <Select
    className="w-full p-2 pr-10 bg-white border border-darkGreen hover:bg-gray-100 focus:ring-black appearance-none  rounded-lg text-darkGreen outline-none"
    options={AccreditationData}
    value={accreditation}
    onChange={handleSelectChange}
    optionClassName="text-center"
  />

  {/* Status Dropdown */}
  <Select
    className="w-full p-2 pr-10 bg-white border border-darkGreen hover:bg-gray-100 focus:ring-black appearance-none  rounded-lg text-darkGreen outline-none"
    options={statusData}
    value={status}
    onChange={handleSelectChange}
    optionClassName="text-center"
  />
</div>

  );
};

export default ProductSearchBar;
