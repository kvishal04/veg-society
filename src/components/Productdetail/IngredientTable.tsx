"use client";

import { Eye } from 'lucide-react';
import React, { useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import Pagination from '@/components/reusable/Table/Pagination';
import { IngredientData } from '@/FakeJson/tabledata'
import IngredientSearchBar from './IngredientSeach';


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

const customBodyRender =  (value: TableData, key: 'Vegetarian' | 'Vegan' | 'PlantBased') => {
    let bgColor = "bg-customOrange"; // Default case

    if (value[key] === 1) {
        bgColor = "bg-lightGreen";
    } else if (value[key] === 0) {
        bgColor = "bg-customRed";
    }

    return <div className={`h-5 w-5 text-barlow rounded-full ${bgColor}`}></div>;
}

const tableConfig = {
    tableClassName: 'min-w-full bg-white border border-gray-200 shadow-md rounded-lg',
    tHeadClassName: 'bg-darkGreen text-white border rounded-lg sticky top-0 z-10 ',
    thClassName: 'py-2 px-4 text-left border-b cursor-pointer gap-2',
    trClassName: 'border-b hover:bg-gray-100 border-b-lightGreen',
    thIconClassName: 'flex flex-row items-center gap-2 text-barlow-semi-bold',
    tBodyClassName: '',
    tdClassname: 'py-2 px-4',
    showItemQuantity: 20,
    columns: [
        {
            name: "Number",
            keys: ['Number'],
            sortable: true,
            className: 'rounded-tl-lg'
        },
        {
            name: "Ingredient",
            keys: ['Ingredient'],
            sortable: true
        },
        {
            name: "AlternativeNames",
            keys: ['AlternativeNames'],
            customBodyRender: (value: TableData) => {
                return (
                    <div className={`text-black text-barlow`}>
                        {value.AlternativeNames.join(', ')}
                    </div>
                );
            },

            sortable: true
        },
        {
            name: "Vegetarian",
            keys: ['Vegetarian'],
            customBodyRender: (value: TableData) => {
                return (
                    customBodyRender(value,'Vegetarian')
                );
            },
            sortable: true
        },
        {
            name: "Vegan",
            keys: ['Vegan'],
            customBodyRender: (value: TableData) => {
                return (
                    customBodyRender(value, 'Vegan')
                );
            },
            sortable: true
        },
        {
            name: "PlantBased",
            keys: ['PlantBased'],
            sortable: true,
            customBodyRender: (value: TableData) => {
                return (
                   customBodyRender(value, 'PlantBased')
                );
            },
        },
        {
            name: "action",
            keys: ['action'],
            sortable: false,
            className: 'rounded-tr-lg',
            customBodyRender: (value: TableData) => {
                return (
                    <div className="flex space-x-4">
                        <Eye id={value.Ingredient} className="text-darkGreen cursor-pointer hover:text-green-500" size={18} />
                    </div>
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





const IngredientTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);
    const data: TableData[] = [...IngredientData];

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='px-6 xl:px-52 py-8'>
            <IngredientSearchBar />
            <div className="max-h-[28rem] overflow-y-auto custom-scrollbar text-barlow">
                <TableComponent data={currentItems} config={tableConfig}  showItemQuantity={itemsPerPage} />
            </div>
            <Pagination 
                totalItems={data.length} 
                itemsPerPage={itemsPerPage} 
                currentPage={currentPage} 
                onPageChange={(page: number) => setCurrentPage(page)} 
                onItemsPerPageChange={(items: number) => {setItemsPerPage(items); setCurrentPage(1)}}
            />
        </div>
    );
}

export default IngredientTable;
