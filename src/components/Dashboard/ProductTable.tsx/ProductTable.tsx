"use client";

import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import ProductSearchBar from '../ProductSearch';
import Pagination from '@/components/reusable/Table/Pagination';
import EyeView from '@/styles/logo/Eye';
import Link from 'next/link';
import { ProductData, TableConfig } from '@/interface/main';
import LogutModal from '@/components/Modals/LogutModal';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentItem, setcurrentPage, setLoading, setProductTable, setSortTableByKey} from '@/redux/features/ProductDataSlice';
import { useProductDeleteMutation, useProductTableMutation } from '@/redux/services/dashboardApi';

import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoad from '@/components/reusable/Skeleton';
import useDasboardDebouncedSearch from '@/hooks/useDasboardDebouncedSearch';



const customStatusRender = (value: ProductData) => {
    return (
            <div className={`${value.accreditation_status === "Pending" ? "text-black text-barlow-bold " : "text-black"}`}>
                {value.accreditation_status}
            </div>
        );
    };
  
  const renderActionColumn = (value: ProductData, openModal: () => void, setSelectedProduct: Function ) => {
    return (
            <div className="flex space-x-4">
                <Link href={`/dashboard/product/${value.id}?mode=0`}>
                    <EyeView  className="text-darkGreen cursor-pointer hover:text-green-500"  />
                </Link>
                <Link href={`/dashboard/product/${value.id}?mode=1`}>
                    <Pencil id={value.product_name} className="text-darkGreen cursor-pointer hover:text-blue-300" size={18} />
                </Link> 
                <button onClick={()=>{setSelectedProduct(value); openModal();}}>
                    <Trash2  id={`${value.id}`}  className="text-darkGreen cursor-pointer hover:text-red-300" size={18} />
                </button>
            </div>
        );
    };
  


const ProductTable: React.FC = () => {


    const dispatch = useDispatch<AppDispatch>();
    const {isLoading, productTable : { current_page, per_page, data, sort_by, sort_dir, requested_accreditation, accreditation_status, search, total } } = useSelector((state: RootState) => state.ProductData); 
  

    const tableData: ProductData[] = [...data];
    const [ productDelete ] = useProductDeleteMutation()


    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData>();
    const closeDeleteModal = () => setDeleteModal(false)

    const deleteProductFunc = async () => {
        await productDelete({id: selectedProduct?.id || 0}).unwrap()
        callSearch();
        setDeleteModal(false);
    }
    const openDeleteModal = () => setDeleteModal(true);

    const [fetchTableData] = useProductTableMutation();
    const debouncedSearch = useDasboardDebouncedSearch(fetchTableData);

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
        columns: [
            {
                name: "Number",
                keys: ['id'],
                className: 'rounded-tl-lg'
            },
            {
                name: "Name",
                keys: ['product_name'],
                sortable: true
            },
            {
                name: "Accreditation",
                keys: ['requested_accreditation'],
                sortable: true
            },
            {
                name: "Submitted",
                keys: ['submitted_on'],
                sortable: true
            },
            {
                name: "Response Date",
                keys: ['response_date'],
                sortable: true
            },
            {
                name: "Status",
                keys: ['accreditation_status'],
                sortable: true,
                customBodyRender: (value: ProductData) => customStatusRender(value)
            },
            {
                name: "Action",
                keys: ['action'],
                sortable: false,
                className: 'rounded-tr-lg',
                customBodyRender: (value: ProductData) => renderActionColumn(value, openDeleteModal, setSelectedProduct)
            },
        ],
        rows: {
            className: ''
        },
        emptyState: {
            text: () => 'N/A'
        },
        sort_by: sort_by,
        sort_dir: sort_dir,
    };
    
    const setSortKey = (key: string , value: string) => {
        dispatch(setSortTableByKey({key, value}))
    }

    const callSearch = () => {
        debouncedSearch({
            sort_by,
            sort_dir ,
            search,
            requested_accreditation,
            accreditation_status,
            per_page,
            page: current_page
        }, dispatch)
    }

    useEffect(()=>{
        dispatch(setProductTable([]));
        dispatch(setLoading(true));
        callSearch();
    },[sort_by, sort_dir, search, requested_accreditation, accreditation_status, per_page, current_page])

    const renderTableContent = () => {
        if (isLoading) {
            return (
                <div className="max-h-[28rem] w-full overflow-y-auto custom-scrollbar text-barlow">
                    <SkeletonLoad count={18} />
                </div>
            );
        }
        
        if (tableData.length === 0) {
            return <div className="text-center text-gray-500 text-lg py-4">No Data Found</div>;
        }
        
        return (
            <div>
                <div className="max-h-[28rem] overflow-y-auto custom-scrollbar text-barlow">
                    <TableComponent data={tableData} config={tableConfig} onSortClick={setSortKey} />
                </div>
                <Pagination 
                    totalItems={total} 
                    itemsPerPage={per_page} 
                    currentPage={current_page} 
                    onPageChange={(page) => dispatch(setcurrentPage(page))} 
                    onItemsPerPageChange={(items) => dispatch(setcurrentItem(items))} 
                />
            </div>
        );
    };

    return (
        <div className='px-6 xl:px-52 py-8'>
            <ProductSearchBar />
            {renderTableContent()}
            {/*  Treated as Deleted Modal */}
            <LogutModal isOpen={deleteModal} itemName={selectedProduct?.product_name}  onClose={() => {closeDeleteModal()}} onSave={() => {deleteProductFunc()}} title='Delete' body='delete'/>
        </div>
    );
}

export default ProductTable;