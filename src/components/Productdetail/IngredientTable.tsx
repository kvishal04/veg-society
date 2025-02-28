"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/reusable/Table/Table";
import Pagination from "@/components/reusable/Table/Pagination";
import { IngredientData } from "@/FakeJson/tabledata";
import IngredientSearchBar from "./IngredientSeach";
import EyeView from "@/styles/logo/Eye";
import AddIngredient from "./AddIngredient/AddIngredient";
import Button from "../reusable/Button";
import { IIngredientData, TableConfig } from "@/interface/main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loadProductIngredientTable } from "@/redux/features/IngredientDataSlice";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoad from "../reusable/Skeleton";



const customBodyRender = (value: IIngredientData, key: "Vegetarian" | "Vegan" | "PlantBased") => {
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
            {value.AlternativeNames.join(', ')}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [openAddIngredietComponent, setOpenAddIngredietComponent] = useState<boolean>(false);
  const { IngredientTableData , newData } = useSelector((state: RootState) => state.IngredientData); 
  const dispatch = useDispatch()

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...IngredientTableData, ...newData].slice(indexOfFirstItem, indexOfLastItem);

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
    showItemQuantity: 20,
    columns: [
      {
        name: "Number",
        keys: ["Number"],
        sortable: true,
        className: "rounded-tl-lg md:max-w-16",
      },
      {
        name: "Ingredient",
        keys: ["Ingredient"],
        sortable: true,
        className: ""
      },
      {
        name: "AlternativeNames",
        keys: ["AlternativeNames"],
        customBodyRender: (value: IIngredientData) => renderAlternativeNamesColumn(value),
        sortable: true,
      },
      {
        name: "Vegetarian",
        keys: ["Vegetarian"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "Vegetarian"),
        sortable: true,
      },
      {
        name: "Vegan",
        keys: ["Vegan"],
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "Vegan"),
        rowclassName: "",
        sortable: true,
      },
      {
        name: "PlantBased",
        keys: ["PlantBased"],
        sortable: true,
        customBodyRender: (value: IIngredientData) => customBodyRender(value, "PlantBased"),
      },
      {
        name: "Date Added",
        keys: ["DateAdded"],
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

  useEffect(() => {
    setTimeout(() => {
      return dispatch(loadProductIngredientTable(IngredientData));
    }, 2000);
  }, [])
  

  return (
    <div className="px-6 2xl:px-52 py-8">
      <IngredientSearchBar />
      <div className="max-h-[28rem] overflow-y-auto custom-scrollbar text-barlow">
        {currentItems.length === 0 ? <SkeletonLoad count={18} /> :
          <TableComponent data={currentItems} config={tableConfig} showItemQuantity={itemsPerPage} />
        }
      </div>
      <AddIngredient openAddIngredietComponent={openAddIngredietComponent} setOpenAddIngredietComponent={setOpenAddIngredietComponent} />

      <div className="flex justify-between mt-8 ">
          <div>
            <Button className='md:px-8 px-4 py-2 md:py-3 text-base md:text-lg' onClick={() => {setOpenAddIngredietComponent(true)}} variant="dark-green"><b>+</b> Add Ingredient</Button>
          </div>

          <div>
            {!openAddIngredietComponent &&
            <Pagination
                totalItems={IngredientTableData.length + newData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page: number) => setCurrentPage(page)}
                onItemsPerPageChange={(items: number) => {
                setItemsPerPage(items);
                setCurrentPage(1);
              }}
              />
            }
          </div>
           
            <div>
              <Button className='md:px-8 px-4 py-2 md:py-3 text-base md:text-lg' onClick={() => {}} variant="dark-green">Submit Changes</Button>
            </div>
        </div>

     
    </div>
  );
};

export default IngredientTable;