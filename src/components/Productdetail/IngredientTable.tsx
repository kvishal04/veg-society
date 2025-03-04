"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/reusable/Table/Table";
import Pagination from "@/components/reusable/Table/Pagination";
import IngredientSearchBar from "./IngredientSeach";
import EyeView from "@/styles/logo/Eye";
import AddIngredient from "./AddIngredient/AddIngredient";
import Button from "../reusable/Button";
import { IIngredientData, TableConfig } from "@/interface/main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setcurrentItem, setcurrentPage, setSortTableByKey } from "@/redux/features/IngredientDataSlice";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoad from "../reusable/Skeleton";
import { useFetchIngredientDataMutation } from "@/redux/services/productApi";
import useProductDetailDebounceSerach from "@/hooks/useProductDetailDebounceSerach";
import { useParams } from "next/navigation";



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

const renderActionColumn = (value: IIngredientData ) => {
    return (
        <div className="flex space-x-4">
            <EyeView className="text-darkGreen cursor-pointer hover:text-green-500" />
        </div>
    );
};




const IngredientTable: React.FC = () => {
  const productID = useParams()?.slug as string;
  const [openAddIngredietComponent, setOpenAddIngredietComponent] = useState<boolean>(false);
  const {isLoading, IngredientTable : { IngredientTableData, sort_by, sort_dir, search ,current_page,  per_page, requested_accreditation, total } , newData } = useSelector((state: RootState) => state.IngredientData); 
  const dispatch = useDispatch()

  const [fetchTableData] = useFetchIngredientDataMutation();
  const debouncedSearch = useProductDetailDebounceSerach(fetchTableData);


  const tableConfig: TableConfig = {
    tableClassName: "min-w-full bg-white border border-gray-200 shadow-md rounded-lg",
    tHeadClassName: "bg-darkGreen text-white border rounded-lg sticky top-0 z-10 ",
    thClassName: "py-2 px-2 text-left border-b cursor-pointer gap-2",
    trClassName: {
      class: () => "border-b hover:bg-gray-100 border-b-lightGreen",
    },
    thIconClassName: "flex flex-row items-center gap-2 text-barlow-semi-bold",
    tBodyClassName: "",
    tdClassname: "py-2 px-4",
    columns: [
      {
        name: "Number",
        keys: ["id"],
        sortable: true,
        className: "rounded-tl-lg md:max-w-16",
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
        sortable: true,
      },
      {
        name: "Vegetarian",
        keys: ["vegetarian"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "vegetarian"),
        sortable: true,
      },
      {
        name: "Vegan",
        keys: ["vegan"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "vegan"),
        rowclassName: "",
        sortable: true,
      },
      {
        name: "PlantBased",
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
        customBodyRender: (value: IIngredientData) => renderActionColumn(value),
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
              <TableComponent data={[...IngredientTableData, ...newData]} config={tableConfig} onSortClick={setSortKey} /> 
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
        {(!openAddIngredietComponent && total > 0)  &&
        <Pagination
            totalItems={IngredientTableData.length + newData.length}
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
        <AddIngredient openAddIngredietComponent={openAddIngredietComponent} setOpenAddIngredietComponent={setOpenAddIngredietComponent} />

      <div className="flex justify-between mt-8 ">
          <div>
            <Button className='md:px-8 px-4 py-2 md:py-3 text-base md:text-lg' onClick={() => {setOpenAddIngredietComponent(true)}} variant="dark-green"><b>+</b> Add Ingredient</Button>
          </div>

            {renderPaginationContent()}
            <div>
              <Button className='md:px-8 px-4 py-2 md:py-3 text-base md:text-lg' onClick={() => {}} variant="dark-green">Submit Changes</Button>
            </div>
        </div>

     
    </div>
  );
};

export default IngredientTable;