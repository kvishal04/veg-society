"use client";

import React, { useEffect, useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import { IngredientData } from '@/FakeJson/tabledata'
import AddIngredientSearchBar from './AddIngredientSearchBar';
import Button from '@/components/reusable/Button';



interface TableData {
    Number: number;
    Ingredient: string;
    AlternativeNames: string[];
    Vegetarian: number;
    Vegan: number;
    PlantBased: number;
    DateAdded: string;
    isDisable?: boolean;
};

const renderNumberColumn = (value: TableData, dataLength: number) => {
    return (
        <div className="text-black text-barlow">
            {value.Number === 1 ? `${dataLength + 1}` : ""}
        </div>
    );
};

const renderAlternativeNamesColumn = (value: TableData, dataLength: number) => {
    return (
        <div className={`text-black text-barlow`}>
            {value.AlternativeNames.join(', ')}
        </div>  
    );
};


const customData =  (value: TableData, key: 'Vegetarian' | 'Vegan' | 'PlantBased') => {
    let bgColor = "bg-customOrange"; // Default case

    if (value[key] === 1) {
        bgColor = "bg-lightGreen";
    } else if (value[key] === 0) {
        bgColor = "bg-customRed";
    }

    return <div className={`ml-8 h-5 w-5 text-barlow rounded-full ${bgColor}`}></div>;
}

const AddIngredient: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<TableData[]>([]);
    const [data, setData] = useState<TableData[]>([]);



    const onCellClick = (key: string, row: Record<string, any>) => {
        const typedRow = row as TableData; // Explicit type assertion
    
        setSelectedRows((prevSelectedRows) => {
            const isAlreadySelected = prevSelectedRows.some(selected => selected.Number === typedRow.Number);
            return isAlreadySelected ? prevSelectedRows.filter(selected => selected.Number !== typedRow.Number) : [...prevSelectedRows, typedRow];
        });
    }

    const tableConfig = {
        tableClassName: 'min-w-full bg-white border-none shadow-md rounded-lg',
        tHeadClassName: 'invisible bg-darkGreen text-white border-none rounded-lg sticky top-0 z-10 ',
        thClassName: 'py-2 px-4 text-left border-none cursor-pointer gap-2',
        trClassName:  {
            class: (row: TableData) => `${selectedRows.includes(row) ? 'bg-gray-400 text-white': ''} border-b border-none`
        },
        // trClassName: 'border-b hover:bg-gray-100 border-none',
        thIconClassName: 'flex flex-row items-center gap-2 text-barlow-semi-bold',
        tBodyClassName: '',
        tdClassname: 'py-2 px-4',
        showItemQuantity: 20,
        columns: [
            {
                name: "Number",
                keys: ['Number'],
                sortable: true,
                className: 'rounded-tl-lg',
                customBodyRender: (value: TableData) => renderNumberColumn(value, data.length),
            },
            {
                name: "Ingredient",
                keys: ['Ingredient'],
                sortable: true
            },
            {
                name: "AlternativeNames",
                keys: ['AlternativeNames'],
                customBodyRender:(value: TableData) => renderAlternativeNamesColumn(value, data.length),
                sortable: true
            },
            {
                name: "Vegetarian",
                keys: ['Vegetarian'],
                customBodyRender: (value: TableData) => {
                    return (
                        customData(value,'Vegetarian')
                    );
                },
                sortable: true
            },
            {
                name: "Vegan",
                keys: ['Vegan'],
                customBodyRender: (value: TableData) => {
                    return (
                        customData(value, 'Vegan')
                    );
                },
                rowclassName: '',
                sortable: true
            },
            {
                name: "PlantBased",
                keys: ['PlantBased'],
                sortable: true,
                customBodyRender: (value: TableData) => {
                    return (
                        customData(value, 'PlantBased')
                    );
                },
            },
          
        ],
        rows: {
            className: ''
        },
        emptyState: {
            text: () => 'N/A'
        }
    };

    useEffect(() => {
        console.log("Selected Rows:", selectedRows);
        setData(IngredientData)
    }, [selectedRows]);

    return (
        <div className='max-h-[16rem] w-full border border-gray-800 mt-7 rounded-lg overflow-y-auto custom-scrollbar flex flex-row relative'>
            
            <div className="text-barlow w-[79%] p-2 ">
                <div className=''>
                    <div className='sticky top-0 mt-2'>
                        <AddIngredientSearchBar />
                    </div>
                    <TableComponent 
                        data={data} 
                        config={tableConfig}  
                        showItemQuantity={data.length} 
                        onCellClick={onCellClick}
                    />
                    
                </div>
            </div>
            <div className='flex flex-col justify-evenly sticky top-0 right-0 gap-4 p-4'>
                        <Button onClick={()=>{}} variant="dark-green"  className="text-base lg:text-lg  lg:px-[4rem] lg:py-3   md:px-16 md:py-3  px-8 py-2  "> Next </Button>

                        <Button  onClick={()=>{}}  variant="dark-green"  className="text-base lg:text-lg  lg:px-[4rem] lg:py-3   md:px-16 md:py-3  px-8 py-2  "> Not Listed? </Button>

                        <Button  onClick={()=>{}}  variant="light-green"  className="text-base lg:text-lg  lg:px-[4rem] lg:py-3   md:px-16 md:py-3  px-8 py-2  "> Done </Button>
                </div>
          
        </div>
    );
}

export default AddIngredient;
