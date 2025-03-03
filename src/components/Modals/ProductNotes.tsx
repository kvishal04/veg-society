"use client";

import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Button from "../reusable/Button";
import Textarea from "../reusable/TextArea";
import { useProductNotesMutation } from "@/redux/services/productApi";
import { setProductNotes } from "@/redux/features/productDetailSlice";
import { ProductNotesArray } from "@/interface/main";
import { format, parseISO } from "date-fns";


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const ProductNotesModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const { productNotes }: { productNotes: ProductNotesArray } = useSelector(
    (state: RootState) => state.productDetailReducer
  );

  const dispatch  = useDispatch()
  
  const returnLocalDate = (utcDate : string) => {
    const localDate = format(parseISO(utcDate), "hh:mma dd/MM/yyyy");
    return localDate
  }

  useEffect(() => {
  }, [])
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[90%] md:w-[46rem] rounded-xl shadow-lg p-6 relative text-black">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Notes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 max-h-[20rem] overflow-y-auto pr-3 text-barlow custom-scrollbar">
          {productNotes?.map((note) => (
            <div key={note.created_at} className="mb-6">
              <p className="text-sm italic mb-4">{note.added_by}:</p>
              <p className="text-lg text-gray-700 mb-4">{note.note}</p>
              <p className="text-sm text-gray-700">{returnLocalDate(note.created_at)}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
            <label htmlFor="notes" className="block text-lg font-medium">Add Note</label>
            <Textarea  id="notes" className="w-full mt-1 p-2 border rounded-lg bg-gray-100 h-32" value={""} onChange={(e)=>console.log('text, area', e.target.value)} ></Textarea>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-start">
          <Button onClick={onSave} variant="dark-green" className="text-lg px-20 py-3">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNotesModal;
