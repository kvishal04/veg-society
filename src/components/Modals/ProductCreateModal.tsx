import { CrossIcon, PlusIcon } from "lucide-react";
import React from "react";

type ModalProps = {
  isOpen: boolean ;
  onClose: () => void;
  onSave: () => void;
};

const ProductCreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#D9D9D9] w-[45rem] h-[40rem] rounded-lg shadow-lg p-6 relative text-black">
        <div className="bg-white h-full rounded-lg p-8">
                {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <PlusIcon className="rotate-45 text-5xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 text-black">
          <div className="mb-4">
            <label className="block text-sm font-medium ">Product Name</label>
            <input
              type="text"
              placeholder="Example Product Name"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Requested Accreditation</label>
            <select className="w-full mt-1 p-2 border rounded-lg bg-gray-100">
              <option value="">Please select</option>
              <option value="Accredited">Accredited</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Notes</label>
            <textarea className="w-full mt-1 p-2 border rounded-lg bg-gray-100 h-24"></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between mt-6">
          <button onClick={onSave} className="bg-darkGreen text-white py-2 px-6 rounded-lg">
            Save
          </button>
          <button onClick={onClose} className="border border-darkGreen text-darkGreen py-2 px-6 rounded-lg">
            Cancel
          </button>
        </div>
        </div>
    
      </div>
    </div>
  );
};

export default ProductCreateModal;
