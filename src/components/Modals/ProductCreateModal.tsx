"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import Select from "../reusable/Select";
import { AccreditationData as data } from "@/FakeJson/tabledata";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import Textarea from "../reusable/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetFilterItem, setCreateProductData, resertProdctCreateForm } from "@/redux/features/ProductDataSlice";
import { useProductCreateMutation } from "@/redux/services/dashboardApi";

const AccreditationData = [...data];

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
};

const ProductCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const { productData: { product_name, notes, requested_accreditation } } = useSelector(
        (state: RootState) => state.ProductData
    );
    const dispatch = useDispatch();
    const [createProduct] = useProductCreateMutation();

    const [errors, setErrors] = useState<{ product_name?: string; notes?: string; requested_accreditation?: string }>({});

    const validateForm = () => {
        const newErrors: any = {};
        if (!product_name) newErrors.product_name = "Product name is required";
        if (!notes) newErrors.notes = "Notes are required";
        if (!requested_accreditation) newErrors.requested_accreditation = "Accreditation is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitData = async () => {
        if (!validateForm()) return;
        await createProduct({ product_name, notes, requested_accreditation }).unwrap();
        dispatch(resetFilterItem(), resertProdctCreateForm());
        onSave();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#D9D9D9] w-[90%] md:w-[46rem] h-[44.5rem] rounded-xl shadow-lg p-6 relative text-black">
                <div className="bg-white h-full rounded-lg py-4 px-6">
                    <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-lg font-semibold">Add New Product</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <PlusIcon className="rotate-45 text-5xl" />
                        </button>
                    </div>

                    <div className="mt-4 text-black border-b">
                        <div className="mb-4">
                            <label htmlFor="product_name" className="block text-lg font-medium">Product Name</label>
                            <Input
                                id="product_name"
                                type="text"
                                value={product_name}
                                onChange={(e) => {
                                    dispatch(setCreateProductData({ key: 'product_name', value: e.target.value }));
                                    setErrors((prev) => ({ ...prev, product_name: "" }));
                                }}
                                placeholder="Example Product Name"
                                className={`w-full mt-2 p-3 border-2 rounded-lg focus:ring-2 outline-none placeholder-gray-500 ${errors.product_name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}
                        </div>

                        <div className="my-8">
                            <label htmlFor="accreditation" className="block text-lg font-medium">Requested Accreditation</label>
                            <Select
                                id="accreditation"
                                className={`w-full mt-2 px-4 py-2 border-2 appearance-none rounded-lg outline-none ${errors.requested_accreditation ? 'border-red-500' : 'border-gray-300'}`}
                                options={AccreditationData.filter((item) => item.label !== 'All')}
                                value={requested_accreditation}
                                onChange={(value) => {
                                    dispatch(setCreateProductData({ key: 'requested_accreditation', value }));
                                    setErrors((prev) => ({ ...prev, requested_accreditation: "" }));
                                }}
                                optionClassName="hover:bg-lightGreen"
                            />
                            {errors.requested_accreditation && <p className="text-red-500 text-sm">{errors.requested_accreditation}</p>}
                        </div>

                        <div className="mb-8">
                            <label htmlFor="notes" className="block text-lg font-medium">Notes</label>
                            <Textarea
                                id="notes"
                                className={`w-full mt-1 p-2 border rounded-lg bg-gray-100 h-32 ${errors.notes ? 'border-red-500' : 'border-gray-300'}`}
                                value={notes}
                                onChange={(e) => {
                                    dispatch(setCreateProductData({ key: 'notes', value: e.target.value }));
                                    setErrors((prev) => ({ ...prev, notes: "" }));
                                }}
                            />
                            {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button onClick={submitData} variant="dark-green" className="text-base lg:text-lg lg:px-[5.5rem] lg:py-3 md:px-16 md:py-3 px-8 py-2"> Save </Button>
                        <Button onClick={onClose} variant="white" className="text-sm text-darkGreen border-lightGreen md:text-base lg:text-lg lg:px-[5.5rem] lg:py-3 md:px-16 md:py-3 px-8 py-2"> Close </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateModal;
