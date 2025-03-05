"use client";

import { PlusIcon } from "lucide-react";
import React from "react";
import Button from "../reusable/Button";
import Paragraph from "../reusable/Paragraph";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useFetchIngredientDataMutation, useSaveIngredientMutation, useSubmitIngredientMutation } from "@/redux/services/productApi";
import useProductDetailDebounceSerach from "@/hooks/useProductDetailDebounceSerach";
import { clearNewData } from "@/redux/features/IngredientDataSlice";


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    title?: string;
    body?: string;
    body2?: string;
    button1?: string;
    button2?: string;
    productID: string
};

const SubmitModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title = 'Submit', body = 'Do you want to send the changes to The Vegetarian Society?', body2 = 'Products will not be able to be edited once they are submitted, the status will be changed to ‘Pending’ until approved or rejected.', button1 = "Submit Changes", button2 = "Later", productID }) => {

    const dispatch = useDispatch()
    const { newData, handleType } = useSelector((state: RootState) => state.IngredientData); 
    const { productDetail: {product_name , requested_accreditation}} = useSelector((state: RootState) => state.productDetailReducer); 
    const [SaveIngredients] = useSaveIngredientMutation()
    const [SubmitIngredients] = useSubmitIngredientMutation()
    const [fetchTableData] = useFetchIngredientDataMutation();
    const debouncedSearch = useProductDetailDebounceSerach(fetchTableData);

    const SaveData = async() => {
        try {
            const data = {
                product_id: productID,
                "ingredient_ids": newData.length === 0 ? [" "] : newData.map((item)=>item.id),
                product_name: product_name,
                requested_accreditation: requested_accreditation
            }
            if(handleType === 'SAVE'){
                await SaveIngredients(data).unwrap();
            }else{
                await SubmitIngredients(data).unwrap();
            }
            dispatch(clearNewData())
            callSearch();
            onSave()
            
        } catch (error) {
            
        }
       
    }

    const callSearch = () => {
        debouncedSearch({
            sort_by:'',
            sort_dir: '',
            search: '',
            requested_accreditation : '',
            per_page: 24,
            page: 1,
            product_id: productID
          }, dispatch)
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-barlow">
            <div className="bg-[#D9D9D9] w-[90%] md:w-[46rem] h-[27.5rem] rounded-xl shadow-lg p-6 relative text-black">
                <div className="bg-white h-full rounded-lg p-6 flex flex-col justify-around">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <PlusIcon className="rotate-45 text-5xl" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="text-black ">
                       <Paragraph className="mb-4 text-sm sm:text-base md:text-lg" > {body} </Paragraph> 
                       <Paragraph className=" text-sm sm:text-base md:text-lg" > {body2} </Paragraph>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-between mt-12 border-t pt-6">
                        <Button onClick={SaveData} variant="dark-green"  className="text-sm md:text-base lg:text-lg  lg:px-[3.5rem] lg:py-3  md:px-8 md:py-3  px-4 py-2 "> {button1}  </Button>
                        <Button onClick={SaveData}  variant="white"  className="text-sm text-darkGreen border-lightGreen md:text-base lg:text-lg  lg:px-[5.5rem] lg:py-3  md:px-16 md:py-3  px-8 py-2 "> {button2} </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SubmitModal;
