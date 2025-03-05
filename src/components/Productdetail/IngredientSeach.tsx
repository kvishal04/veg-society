"use client";  // This makes the component a Client Component

import Select from "@/components/reusable/Select";
import React from "react";
import { Search } from "lucide-react";
import Input from "@/components/reusable/Input";
import { AccreditationData as data, } from "@/FakeJson/tabledata";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRequestedAccredation, setSearch } from "@/redux/features/IngredientDataSlice";

const AccreditationData = [...data]

const IngredientSearchBar = () => {

  const { IngredientTable : { search, requested_accreditation } } = useSelector((state: RootState) => state.IngredientData); 
  const dispatch = useDispatch()

  const handleSelectChange = (value: string) => {
    dispatch(setRequestedAccredation(value))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-7 w-full pb-7 rounded-lg">
  {/* Search Input */}
  <div className="relative flex items-center w-full md:col-span-4">
    <Input
      id="search"
      type="text"
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      placeholder="Search"
      className="w-full p-2 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none placeholder-green-700"
    />
    <Search className="absolute right-3 text-green-700" size={18} />
  </div>

  {/* Accreditation Dropdown */}
  <Select
    id="accreditation"
    className="w-full text-center mt-2 px-4 py-2   bg-white border border-darkGreen  focus:ring-black appearance-none  rounded-lg text-darkGreen outline-none"
    options={AccreditationData}
    value={requested_accreditation}
    onChange={handleSelectChange}
    optionClassName="text-center hover:bg-green-400 "
  />

  {/* Status Dropdown */}

</div>

  );
};

export default IngredientSearchBar;
