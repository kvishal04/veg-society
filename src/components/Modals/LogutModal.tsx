"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import Select from "../reusable/Select";
import { AccreditationData as data } from "@/FakeJson/tabledata";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import Paragraph from "../reusable/Paragraph";


const AccreditationData = [...data]

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
};

const LogutModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const [accreditation, setAccreditation] = useState("Plant");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAccreditation(e.target.value);
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#D9D9D9] w-[90%] md:w-[46rem] h-[25.5rem] rounded-xl shadow-lg p-6 relative text-black">
                <div className="bg-white h-full rounded-lg p-6 flex flex-col justify-around">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-lg font-semibold">Log out</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <PlusIcon className="rotate-45 text-5xl" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="text-black ">
                       <Paragraph className="mb-8 text-lg" children="You are about to log out "/>
                       <Paragraph className="text-lg" children="Are you sure? "/>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-between mt-6 border-t pt-6">
                        <Button children={'Save'} onClick={onSave} variant="dark-green"  className="text-base lg:text-lg  lg:px-[5.5rem] lg:py-3   md:px-16 md:py-3  px-8 py-2  " />
                        <Button children={'Close'} onClick={onClose}  variant="white"  className="text-sm text-darkGreen border-lightGreen md:text-base lg:text-lg  lg:px-[5.5rem] lg:py-3  md:px-16 md:py-3  px-8 py-2 " />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LogutModal;
