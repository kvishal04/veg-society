"use client";

import React, { useEffect, useState } from 'react'
import TableComponent from '@/components/reusable/Table/Table';
import { IngredientData } from '@/FakeJson/tabledata'
import AddIngredientSearchBar from './AddIngredientSearchBar';
import Button from '@/components/reusable/Button';
import Textarea from '@/components/reusable/TextArea';
import { IIngredientData } from '@/interface/main';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const renderAlternativeNamesColumn = (value: IIngredientData, dataLength: number) => {
    return (
        <div className={`text-black text-barlow`} id={`${dataLength}`}>
            {value.alternate_names.map(item=>item.alternate_name).join(', ')}
        </div>  
    );
};


const customData =  (value: IIngredientData, key: 'vegetarian' | 'vegan' | 'plant_based') => {
    let bgColor = "bg-customOrange"; // Default case

    if (value[key] === 1) {
        bgColor = "bg-lightGreen";
    } else if (value[key] === 0) {
        bgColor = "bg-customRed";
    }

    return <div className={`ml-8 h-5 w-5 text-barlow rounded-full ${bgColor}`}></div>;
}

interface IngredientProps {
    openAddIngredietComponent: boolean
    setOpenAddIngredietComponent: Function
}

const AddIngredient: React.FC<IngredientProps> = ({openAddIngredietComponent, setOpenAddIngredietComponent}) => {
    const [selectedRows, setSelectedRows] = useState<IIngredientData[]>([]);
    const [data, setData] = useState<IIngredientData[]>([]);
    const [showNotListedForm, setShowNotListedForm] = useState(false);


    const {IngredientTable : { total } , newData } = useSelector((state: RootState) => state.IngredientData); 

    const onCellClick = (key: string, row: Record<string, any>) => {
        const typedRow = row as IIngredientData; // Explicit type assertion
        setSelectedRows([typedRow]);
    }

    const tableConfig = {
        tableClassName: 'min-w-full bg-white border-none shadow-md rounded-lg',
        tHeadClassName: 'bg-darkGreen text-white border-none rounded-lg sticky top-0 z-10 ',
        thClassName: 'py-2 px-2 text-left border-none cursor-pointer gap-2',
        trClassName:  {
            class: (row: IIngredientData) => `${selectedRows.includes(row) ? 'bg-gray-400 text-white': ''} border-b border-none`
        },
        // trClassName: 'border-b hover:bg-gray-100 border-none',
        thIconClassName: 'flex flex-row items-center gap-2 text-barlow-semi-bold',
        tBodyClassName: '',
        tdClassname: 'py-2 px-4',
        showItemQuantity: 100,
        columns: [
            {
                name: "Ingredient",
                keys: ['ingredient_name'],
                className: "rounded-tl-lg",
            },
            {
                name: "AlternativeNames",
                keys: ['alternate_names'],
                customBodyRender:(value: IIngredientData) => renderAlternativeNamesColumn(value, data.length),
                
            },
            {
                name: "Vegetarian",
                keys: ['vegetarian'],
                customBodyRender: (value: IIngredientData) => {
                    return (
                        customData(value,'vegetarian')
                    );
                },
            },
            {
                name: "Vegan",
                keys: ['vegan'],
                customBodyRender: (value: IIngredientData) => {
                    return (
                        customData(value, 'vegan')
                    );
                },
                rowclassName: '',
            },
            {
                name: "Plant Based",
                keys: ['plant_based'],
                customBodyRender: (value: IIngredientData) => {
                    return (
                        customData(value, 'plant_based')
                    );
                },
                className: "rounded-tr-lg",
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
        setData(IngredientData)
    }, [selectedRows]);


    return (
        <>
        {
            openAddIngredietComponent && <div className='text-barlow h-[28rem] md:h-[16rem] w-full border border-gray-800 mt-7 rounded-lg flex flex-col md:flex-row relative bg-white p-1'>
            
            {/* Main Table Section */}
            {!showNotListedForm  ? (
                <div className="text-barlow w-full md:w-[79%] px-2 bg-white">
                    <div className='sticky top-0 left-0 flex items-center gap-4 md:gap-20 bg-white'>
                        {total + 1} <AddIngredientSearchBar />
                    </div>
                    <div className='bg-white ml-4 md:ml-24 h-[18rem] md:h-[10rem] overflow-y-auto custom-scrollbar mt-2'>
                        <TableComponent 
                            data={data} 
                            config={tableConfig}  
                            showItemQuantity={data.length} 
                            onCellClick={onCellClick}
                        />
                    </div>
                </div>
            ) : (
                /* Not Listed Form Section */
                <div className='w-full bg-white p-4 border border-gray-300 rounded-md '>
                {/* Textarea Group */}
                <div className="w-full flex flex-col lg:flex-row gap-4">
                    {/* Ingredient Name */}
                    <div className="flex flex-col flex-grow basis-1/5 lg:w-full">
                        <label htmlFor='ingredient' className=" font-medium text-gray-700 mb-1 text-lg lg:px-4">Ingredient Name</label>
                        <Textarea  
                            id="ingredient"
                            placeholder="Enter ingredient name"  
                            className="border p-2 mb-2 h-12 lg:h-28 text-lg font-bold underline"
                            value={''} 
                            onChange={(e) => {}} 
                        />
                    </div>
            
                    {/* Alternative Names */}
                    <div className="flex flex-col flex-grow basis-1/5 lg:w-full">
                        <label htmlFor='Alt_Names' className="font-medium text-gray-700 mb-1 text-lg lg:px-4">Alternative Names</label>
                        <Textarea 
                            id="Alt_Names"
                            placeholder="Enter alternative names"  
                            className="border p-2 mb-2  h-16 lg:h-28 text-lg"
                            value={''} 
                            onChange={(e) => {}} 
                        />
                    </div>
            
                    {/* Notes */}
                    <div className="flex flex-col flex-grow basis-3/5 lg:w-full">
                        <label htmlFor='Notes' className="font-medium text-gray-700 mb-1 text-lg lg:px-4">Notes</label>
                        <Textarea  
                            id={'Notes'}
                            placeholder="Enter notes"  
                            className="border p-2 mb-2  h-24 lg:h-28 text-lg"
                            value={''} 
                            onChange={(e) => {}} 
                        />
                    </div>
                    </div>
            
                {/* Buttons Section */}
                    <div className="flex justify-end gap-2 mt-1">
                        <Button className='text-base lg:text-lg lg:px-[4rem] lg:py-3 md:px-8 md:py-3 px-3 py-2' onClick={() => setShowNotListedForm(false)} variant="clear-green">Back</Button>
                        <Button className='text-base lg:text-lg lg:px-[4rem] lg:py-3 md:px-8 md:py-3 px-3 py-2' onClick={() => {setShowNotListedForm(false)}} variant="dark-green">Submit</Button>
                    </div>
                </div>                
            )}
    
            {/* Buttons Section */}
            {!showNotListedForm && (
                <div className='flex flex-row md:flex-col mt-4 md:mt-0 md:sticky justify-start md:justify-evenly md:top-0 md:right-0 gap-4 px-4 py-4'>
                    <Button onClick={() => {}} variant="dark-green" className="flex-grow text-base lg:text-lg lg:px-[4rem] lg:py-3 md:px-8 md:py-3 px-3 py-2"> Next </Button>
    
                    <Button onClick={() => setShowNotListedForm(true)} variant="clear-green" className="flex-grow text-base lg:text-lg lg:px-[4rem] lg:py-3 md:px-8 md:py-3 px-3 py-2"> Not Listed? </Button>
    
                    <Button onClick={() => {setOpenAddIngredietComponent(false)}} variant="clear-green" className="flex-grow text-base lg:text-lg lg:px-[4rem] lg:py-3 md:px-8 md:py-3 px-4 py-3"> Done </Button>
                </div>
            )}
        </div>
        }
        </>
        
    );
    
}

export default AddIngredient;