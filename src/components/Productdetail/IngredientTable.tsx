"use client";

import React, { useEffect, useRef, useState } from "react";
import TableComponent from "@/components/reusable/Table/Table";
import Pagination from "@/components/reusable/Table/Pagination";
import IngredientSearchBar from "./IngredientSeach";
import EyeView from "@/styles/logo/Eye";
import AddIngredient from "./AddIngredient/AddIngredient";
import Button from "../reusable/Button";
import { IIngredientData, TableConfig } from "@/interface/main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeHandleType, removeFromNewData, setcurrentItem, setcurrentPage, setSortTableByKey } from "@/redux/features/IngredientDataSlice";

import SkeletonLoad from "../reusable/Skeleton";
import { useFetchIngredientDataMutation, useRemoveIngredientMutation } from "@/redux/services/productApi";
import useProductDetailDebounceSerach from "@/hooks/useProductDetailDebounceSerach";
import { useParams, useSearchParams } from "next/navigation";
import { Trash2 } from "lucide-react";
import SubmitModal from "../Modals/SubmitModal";
import LogutModal from "../Modals/LogutModal";
import Link from "next/link";



const customBodyRender = (value: IIngredientData, key: "vegetarian" | "vegan" | "plant_based") => {
  let bgColor = "bg-customOrange"; // Default case

  if (value[key] === 1) {
    bgColor = "bg-lightGreen";
  } else if (value[key] === 0) {
    bgColor = "bg-customRed";
  }

  return <div className={`ml-8 h-5 w-5 text-barlow rounded-full ${bgColor}`}></div>;
};


const renderAlternativeNamesColumn = (value: IIngredientData,) => {
    return (
        <div className={`text-black text-barlow`}>
            {value.alternate_names.map((item)=> item.alternate_name).join(', ')}
        </div>  
    );
};

const renderActionColumn = (value: IIngredientData, mode : string,  openModal: () => void, setSelectedProduct: Function, productID: string) => {
    return (
        <div className="flex space-x-4">
          <Link href={`/dashboard/product/${productID}/ingredient/${value.id}`}>
            <EyeView className="text-darkGreen cursor-pointer hover:text-green-500" />
          </Link>
            {mode === '1' ? 
              <button onClick={()=>{setSelectedProduct(value); openModal();}}>
                      <Trash2  id={`${value.id}`}  className="text-darkGreen cursor-pointer hover:text-red-300" size={18} />
              </button>
              : <> </>
            } 
        </div>
    );
};

const customIdRender = (index: number) => {
  return (
          <div className={`rounded-tl-lg md:max-w-16`}>
              {index+1}
          </div>
      );
  };

  



const IngredientTable: React.FC = () => {

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const productID = useParams()?.slug as string;
  const [openAddIngredietComponent, setOpenAddIngredietComponent] = useState<boolean>(false);
  const {isLoading, IngredientTable : { IngredientTableData, sort_by, sort_dir, search ,current_page,  per_page, requested_accreditation, total } , newData } = useSelector((state: RootState) => state.IngredientData); 
  const dispatch = useDispatch()

  const [deleteIngredient] = useRemoveIngredientMutation();
  const [fetchTableData] = useFetchIngredientDataMutation();
  const debouncedSearch = useProductDetailDebounceSerach(fetchTableData);

  const lastRowRef = useRef<HTMLTableRowElement | null>(null);
  const scrollToBottom = () => {
    lastRowRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", // Ensures only table scroll moves
      inline: "nearest", // Prevents main page from scrolling
    });
  };

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
      const [selectedIngredient, setSelectedIngredient] = useState<IIngredientData>();
      const closeDeleteModal = () => setDeleteModal(false)
      const openDeleteModal = () => setDeleteModal(true);
  
      const deleteIngredientFunc = async () => {
        try {
          await deleteIngredient({ingredient_id: selectedIngredient?.id || 0, product_id: productID}).unwrap()
          dispatch(removeFromNewData(selectedIngredient?.id || 0))
          callSearch();
          setDeleteModal(false);
          scrollToBottom();
        } catch (error) {
          
        }
          
      }

    const [submitModal, setSubmitModal] = useState<boolean>(false);

  const tableConfig: TableConfig = {
    tableClassName: "min-w-full bg-white border border-gray-200 shadow-md rounded-lg",
    tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10 ",
    thClassName: "py-2 px-2 text-left border-b cursor-pointer gap-2",
    trClassName: {
      class: (row: IIngredientData) => `${!row.is_verified ? 'bg-gray-400 bg-opacity-50': 'hover:bg-gray-100'} border-b  border-b-lightGreen`,
    },
    thIconClassName: "flex flex-row items-center gap-2 text-barlow-semi-bold",
    tBodyClassName: "",
    tdClassname: "py-2 px-4",
    columns: [
      {
        name: "Number",
        keys: ["id"],
        customBodyRender: (value: IIngredientData, index: number) => customIdRender(index)
      },
      {
        name: "Ingredient",
        keys: ["ingredient_name"],
        sortable: true,
        className: ""
      },
      {
        name: "Alternative Names",
        keys: ["alternate_names"],
        customBodyRender: (value: IIngredientData) => renderAlternativeNamesColumn(value),
      },
      {
        name: "Vegetarian",
        keys: ["vegetarian"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "vegetarian"),
      },
      {
        name: "Vegan",
        keys: ["vegan"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "vegan"),
        rowclassName: "",
      },
      {
        name: "Plant Based",
        keys: ["plant_based"],
        sortable: true,
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "plant_based"),
      },
      {
        name: "Date Added",
        keys: ["date_added"],
        sortable: true,
      },
      {
        name: "Action",
        keys: ["action"],
        sortable: false,
        className: "rounded-tr-lg",
        customBodyRender: (value: IIngredientData) => renderActionColumn(value, mode || "0", openDeleteModal, setSelectedIngredient, productID ),
      },
    ],
    rows: {
      className: "",
    },
    emptyState: {
      text: () => "N/A",
    },
  };

  const setSortKey = (key: string , value: string) => {
        dispatch(setSortTableByKey({key, value}))
  }
    const callSearch = () => {
      debouncedSearch({
        sort_by,
        sort_dir,
        search,
        requested_accreditation,
        per_page,
        page: current_page,
        product_id: productID
      }, dispatch)
    }
  

  useEffect(() => {
    callSearch();
  }, [sort_by, sort_dir, search, requested_accreditation, per_page, current_page, productID])
  

  const renderTableContent = () => {
    if (isLoading) {
        return (
            <div className="max-h-[28rem] w-full overflow-y-auto custom-scrollbar text-barlow">
                <SkeletonLoad count={18} />
            </div>
        );
    }
    
    if ([...IngredientTableData, ...newData].length === 0) {
        return <div className="text-center text-gray-500 text-lg py-4">No Data Found</div>;
    }
    
    return (
        <div>
            <div className="max-h-[28rem] overflow-y-auto custom-scrollbar text-barlow">
              <TableComponent data={[...IngredientTableData, ...newData]} config={tableConfig} onSortClick={setSortKey} scrollRef={lastRowRef}  /> 
            </div>
        </div>
    );
  };

  const renderPaginationContent = () => {
    if (isLoading) {
        return (
            <div className="max-h-[28rem] w-full overflow-y-auto custom-scrollbar text-barlow">
                <SkeletonLoad count={18} />
            </div>
        );
    }
    
    return (
      <div>
        {(!openAddIngredietComponent && [...IngredientTableData, ...newData].length > 0)  &&
        <Pagination
            totalItems={total + newData.length}
            itemsPerPage={per_page}
            currentPage={current_page}
            onPageChange={(page) => dispatch(setcurrentPage(page))} 
            onItemsPerPageChange={(items) => dispatch(setcurrentItem(items))} 
          />
        }
      </div>
    );
  };


  return (
    <div className="px-6 2xl:px-52 py-8">
      <IngredientSearchBar />
        {renderTableContent()}
        <AddIngredient 
          openAddIngredietComponent={openAddIngredietComponent} 
          setOpenAddIngredietComponent={setOpenAddIngredietComponent} 
          scrollToBottom={scrollToBottom}
          />

        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          {mode === '1' &&
            <div className="flex justify-between sm:w-1/5 w-full">
              <Button 
                className="md:px-4 px-4 py-2 md:py-3 text-base md:text-lg" 
                onClick={() => setOpenAddIngredietComponent(true)} 
                variant="dark-green"
              >
                <b>+</b> Add Ingredient
              </Button>
              
              <Button 
                className="md:px-8 px-4 py-2 md:py-3 text-base md:text-lg sm:hidden" 
                onClick={() => {}} 
                variant="dark-green"
              >
                Submit Changes
              </Button>
            </div>
          }

          <div className={`w-full ${mode=== '0' ? '' : 'sm:w-3/5'} `}>{renderPaginationContent()}</div>
          {mode === '1' &&
            <div className="hidden w-1/5 sm:flex sm:justify-end">
              <Button 
                className="md:px-8 px-4 py-2 md:py-3 text-base md:text-lg" 
                onClick={() => { dispatch(changeHandleType('SUBMIT')); setSubmitModal(true)}} 
                variant="dark-green"
              >
                Submit Changes
              </Button>
            </div>
          }
        </div>


        <SubmitModal isOpen={submitModal}  onClose={() => {setSubmitModal(false)}} onSave={() => {setSubmitModal(false)}} button1="Submit Changes" productID={productID} />
        <LogutModal isOpen={deleteModal} itemName={selectedIngredient?.ingredient_name}  onClose={() => {closeDeleteModal()}} onSave={() => {deleteIngredientFunc()}} title='Delete' body='delete'/>
    </div>
  );
};

export default IngredientTable;