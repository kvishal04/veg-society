"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Button from "../reusable/Button";
import Textarea from "../reusable/TextArea";
import { format, parseISO } from "date-fns";
import { useProductNotesMutation, useSaveNotesMutation } from "@/redux/services/productApi";
import { setProductNotes, setNote } from "@/redux/features/productDetailSlice";

type ModalProps = {
  productID: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const ProductNotesModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, productID }) => {
  const { productNotes, notes } = useSelector((state: RootState) => state.productDetailReducer);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [ProductNotes] = useProductNotesMutation();
  const [SaveNotes] = useSaveNotesMutation();

  const returnLocalDate = (utcDate: string) => {
    return format(parseISO(utcDate), "hh:mma dd/MM/yyyy");
  };

  const loadNotesData = async () => {
    const res = await ProductNotes({ product_id: productID }).unwrap();
    dispatch(setProductNotes(res));
  };

  const uploadNotes = async () => {
    await SaveNotes({ product_id: productID, note: notes }).unwrap();
    loadNotesData();
    dispatch(setNote(""));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
  
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [onClose]);

  useEffect(() => {
    loadNotesData();
  }, [])

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white w-[90%] md:w-[46rem] rounded-xl shadow-lg p-6 relative text-black">
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

        {/* Input Section */}
        <div className="mb-8">
          <label htmlFor="notes" className="block text-lg font-medium">Add Note</label>
          <Textarea
            id="notes"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-100 h-32"
            value={notes}
            onChange={(e) => dispatch(setNote(e.target.value))}
          />
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-start">
          <Button onClick={uploadNotes} variant="dark-green" className="text-lg px-20 py-3">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNotesModal;
