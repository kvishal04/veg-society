"use client";  // This makes the component a Client Component

import Select from "@/components/reusable/Select";
import React  from "react";
import { Search } from "lucide-react";
import Input from "@/components/reusable/Input";
import { AccreditationData as data, statusData as statusMenu } from "@/FakeJson/tabledata";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setAccreditationStatus, setRequestedAccredation, setSearch } from "@/redux/features/ProductDataSlice";


const statusData = [...statusMenu]
const AccreditationData = [...data]

const ProductSearchBar = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { productTable : { accreditation_status, requested_accreditation, search  } } = useSelector((state: RootState) => state.ProductData);

  const handleSelectChange = (value : string) => {
      dispatch(setRequestedAccredation(value))
  }

  const handleSelectChangeStatus = (value: string) => {
    dispatch(setAccreditationStatus(value))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-7 w-full pb-7 rounded-lg">
  {/* Search Input */}
  <div className="relative flex items-center w-full md:col-span-3">
    <Input
      id="search"
      type="text"
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      placeholder="Search"
      className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none placeholder-green-700"
    />
    <Search className="absolute right-3 text-green-700" size={18} />
  </div>

  {/* Accreditation Dropdown */}
  <Select
    id="accreditation"
    className="text-center w-full px-4 py-2  text-barlow  font-bold bg-white border border-darkGreen focus:ring-black appearance-none  rounded-lg text-darkGreen outline-none"
    options={AccreditationData}
    value={requested_accreditation}
    onChange={handleSelectChange}
    optionClassName="text-center font-bold hover:bg-lightGreen "
  />

  {/* Status Dropdown */}
  <Select
    id="status"
    className="w-full px-4 py-2 text-center  text-barlow font-bold  bg-white border border-darkGreen hover:bg-gray-100 focus:ring-black appearance-none  rounded-lg text-darkGreen outline-none"
    options={statusData}
    value={accreditation_status}
    onChange={handleSelectChangeStatus}
    optionClassName="text-center  font-bold hover:bg-lightGreen"
  />
</div>

  );
};

export default ProductSearchBar;
