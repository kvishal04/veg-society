"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import Select from "../reusable/Select";
import { AccreditationData as data } from "@/FakeJson/tabledata";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import Textarea from "../reusable/TextArea";


const AccreditationData = [...data]

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
};

const ProductCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [accreditation, setAccreditation] = useState("Plant"); // ✅ Move this to the top
  
    if (!isOpen) return null; // ✅ This can stay, but hooks must be above it
  
    const handleSelectChange = (value : string) => {
      setAccreditation(value);
    };
  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#D9D9D9] w-[90%] md:w-[46rem] h-[40.5rem] rounded-xl shadow-lg p-6 relative text-black">
                <div className="bg-white h-full rounded-lg py-4 px-6">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-lg font-semibold">Add New Product</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <PlusIcon className="rotate-45 text-5xl" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="mt-4 text-black border-b">
                        <div className="mb-4">
                            <label htmlFor="product_name" className="block text-lg font-medium ">Product Name</label>
                            <Input
                                id="product_name"
                                type="text"
                                value={''}
                                onChange={(e) => console.log(e.target.value)}
                                placeholder="Example Product Name"
                                className="w-full mt-2 p-3 border-2 rounded-lg focus:ring-2 bg-gray-100 focus:ring-black outline-none placeholder-gray-500"
                            />
                        </div>

                        <div className="my-8">
                            <label htmlFor="accreditation" className="block text-lg font-medium">Requested Accreditation</label>
                            <Select
                                id="accreditation"
                                className="w-full  mt-2 px-4 py-2  border-2 focus:ring-2  hover:bg-gray-100 focus:ring-black appearance-none  rounded-lg text-black outline-none"
                                options={AccreditationData}
                                value={accreditation}
                                onChange={handleSelectChange}
                                optionClassName="hover:bg-lightGreen"
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="notes" className="block text-lg font-medium">Notes</label>
                            <Textarea  id="notes" className="w-full mt-1 p-2 border rounded-lg bg-gray-100 h-32" value={""} onChange={(e)=>console.log('text, area', e.target.value)} ></Textarea>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-between mt-6 ">
                        <Button onClick={onSave} variant="dark-green"  className="text-base lg:text-lg  lg:px-[5.5rem] lg:py-3   md:px-16 md:py-3  px-8 py-2 "> Save </Button>
                        <Button  onClick={onClose}  variant="white"  className="text-sm text-darkGreen border-lightGreen md:text-base lg:text-lg  lg:px-[5.5rem] lg:py-3  md:px-16 md:py-3  px-8 py-2 " > Close </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCreateModal;
