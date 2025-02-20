"use client";  // This makes the component a Client Component

import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/reusable/Input";

const AddIngredientSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-7 w-full  mt-2 rounded-lg">
  {/* Search Input */}
  <div className="relative flex items-center w-full md:col-span-5">
    <Input
      id="search"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search"
      className="w-full p-2 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none placeholder-green-700"
    />
    <Search className="absolute right-3 text-green-700" size={18} />
  </div>

</div>

  );
};

export default AddIngredientSearchBar;
