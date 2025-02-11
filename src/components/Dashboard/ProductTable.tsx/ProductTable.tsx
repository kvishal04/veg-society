"use client";

import { Eye, MessageCircle, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import ProductSearchBar from '../ProductSearch';
import Pagination from '@/components/reusable/Table/Pagination';

const tableConfig = {
    tableClassName:  'min-w-full bg-white border border-gray-200 shadow-md rounded-lg',
    tHeadClassName: 'bg-darkGreen text-white border rounded-lg sticky top-0 z-10 ',
    thClassName: 'py-3 px-4 text-left border-b cursor-pointer  gap-2',
    trClassName: 'border-b hover:bg-gray-100',
    thIconClassName: 'flex flex-row items-center gap-2',
    tBodyClassName: '',
    tdClassname:'py-3 px-4',
    showItemQuantity : 20,
    columns: [
        {
            name: "number",
            keys: ['number'],
            sortable: true,
            className: 'rounded-tl-lg'
            
        },
        {
            name: "name",
            keys: ['name'],
            sortable: true
        },
        {
            name: "accreditation",
            keys: ['accreditation'],
            sortable: true
        },
        {
            name: "submitted",
            keys: ['submitted'],
            sortable: true
        },
        {
            name: "response",
            keys: ['response'],
            sortable: true
        },
        {
            name: "status",
            keys: ['status'],
            sortable: true,
            customBodyRender: (value: TableData) => {
                return <>
                    <div className={`font-semibold ${
                            value.status === "Pending" ? "text-yellow-500" :
                            value.status === "Rejected" ? "text-red-500" :
                            "text-green-500"
                            }`}>
                                {value.status}
                    </div>
                </>
                   
            },

        },
        {
            name: "action",
            keys: ['action'],
            sortable: false,
            className: 'rounded-tr-lg',
            customBodyRender: (value: TableData) => {
                return <> <div className="flex space-x-2">
                <Eye className="text-green-700 cursor-pointer hover:text-green-500" size={18} />
                <Pencil className="text-blue-500 cursor-pointer hover:text-blue-300" size={18} />
                <Trash2 className="text-red-500 cursor-pointer hover:text-red-300" size={18} />
              </div></>;
            },
        },

    ],
    rows: {
        className: ''
    },

    emptyState: {
        text: () => 'N/A'
    }
}

type TableData = {
    number: number;
    name: string;
    accreditation: string;
    submitted: string;
    response: string;
    status: string;
    isDisable?: boolean
  };

const ProductTable: React.FC = () => {

      const data: TableData[] = [
        { number: 1, name: "Product Name 1", accreditation: "Vegetarian", submitted: "23/10/2024", response: "N/A", status: "Pending" },
        { number: 2, name: "Product Name 2", accreditation: "Vegetarian", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 3, name: "Product Name 3", accreditation: "Vegan", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 4, name: "Product Name 4", accreditation: "Plant-Based", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 5, name: "Product Name 5", accreditation: "Vegan", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 6, name: "Product Name 6", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 7, name: "Product Name 7", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 8, name: "Product Name 8", accreditation: "Vegetarian", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
        { number: 9, name: "Product Name 9", accreditation: "Vegan", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
        { number: 10, name: "Product Name 10", accreditation: "Vegan", submitted: "29/10/2024", response: "30/10/2024", status: "Accredited" },
        { number: 11, name: "Product Name 1", accreditation: "Vegetarian", submitted: "23/10/2024", response: "N/A", status: "Pending" },
        { number: 12, name: "Product Name 2", accreditation: "Vegetarian", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 13, name: "Product Name 3", accreditation: "Vegan", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 14, name: "Product Name 4", accreditation: "Plant-Based", submitted: "25/10/2024", response: "26/10/2024", status: "Accredited" },
        { number: 15, name: "Product Name 5", accreditation: "Vegan", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 16, name: "", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 17, name: "Product Name 7", accreditation: "Vegetarian", submitted: "27/10/2024", response: "28/10/2024", status: "Accredited" },
        { number: 18, name: "Product Name 8", accreditation: "Vegetarian", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
        { number: 19, name: "Product Name 9", accreditation: "Vegan", submitted: "29/10/2024", response: "29/10/2024", status: "Rejected" },
        { number: 20, name: "Product Name 10", accreditation: "Vegan", submitted: "29/10/2024", response: "30/10/2024", status: "Accredited" },
    ];
    

  
    return (
        <div className='px-6 lg:px-40 py-8'>
            <ProductSearchBar />
            <div className="max-h-[40rem] overflow-y-auto custom-scrollbar">
                <TableComponent data={data} config={tableConfig} />
            </div>
            <Pagination totalItems={data.length} itemsPerPage={20} currentPage={1} onPageChange={function (page: number): void {
                console.log(page);
                
            } } onItemsPerPageChange={function (items: number): void {
                console.log(items);
            } } />
            
        </div>
    )
}

export default ProductTable