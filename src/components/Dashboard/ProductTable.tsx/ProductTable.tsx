"use client";

import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import ProductSearchBar from '../ProductSearch';
import Pagination from '@/components/reusable/Table/Pagination';
import { producttabledata } from '@/FakeJson/tabledata'
import EyeView from '@/styles/logo/Eye';
import Link from 'next/link';
import { ProductData, TableConfig } from '@/interface/main';

const tableConfig : TableConfig = {
    tableClassName: 'min-w-full bg-white border border-gray-200 shadow-md rounded-lg',
    tHeadClassName: 'bg-darkGreen text-white border rounded-lg sticky top-0 z-10 ',
    thClassName: 'py-2 px-4 text-left border-b cursor-pointer gap-2',
    trClassName:  {
        class: () => 'border-b hover:bg-gray-100 border-b-lightGreen'
    },
    thIconClassName: 'flex flex-row items-center gap-2 text-barlow-semi-bold',
    tBodyClassName: '',
    tdClassname: 'py-2 px-4',
    showItemQuantity: 20,
    columns: [
        {
            name: "Number",
            keys: ['number'],
            sortable: true,
            className: 'rounded-tl-lg'
        },
        {
            name: "Name",
            keys: ['name'],
            sortable: true
        },
        {
            name: "Accreditation",
            keys: ['accreditation'],
            sortable: true
        },
        {
            name: "Submitted",
            keys: ['submitted'],
            sortable: true
        },
        {
            name: "Response",
            keys: ['response'],
            sortable: true
        },
        {
            name: "Status",
            keys: ['status'],
            sortable: true,
            customBodyRender: (value: ProductData) => {
                return (
                    <div className={`${value.status === "Pending" ? "text-black text-barlow-bold " : "text-black"}`}>
                        {value.status}
                    </div>
                );
            },
        },
        {
            name: "Action",
            keys: ['action'],
            sortable: false,
            className: 'rounded-tr-lg',
            customBodyRender: (value: ProductData) => {
                return (
                    <div className="flex space-x-4">
                        <Link href={`/dashboard/product/${value.number}?mode=0`}>
                            <EyeView  className="text-darkGreen cursor-pointer hover:text-green-500"  />
                        </Link>
                        <Link href={`/dashboard/product/${value.number}?mode=1`}>
                            <Pencil id={value.name} className="text-darkGreen cursor-pointer hover:text-blue-300" size={18} />
                        </Link>
                        <Trash2 id={value.name}  className="text-darkGreen cursor-pointer hover:text-red-300" size={18} />
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



const ProductTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);
    const data: ProductData[] = [...producttabledata];

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='px-6 xl:px-52 py-8'>
            <ProductSearchBar />
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

export default ProductTable;