"use client";
import React from 'react'
import Paragraph from '../reusable/Paragraph'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SkeletonLoad from '../reusable/Skeleton';

const IngredientNotes = () => {
  const { isLoading, IngredientDetail } = useSelector((state: RootState) => state.IngredientDetailReducer); 

  const renderTableContent = () => {
    if (isLoading) {
        return (
            <div className="min-h-[38rem]">
                <SkeletonLoad count={18} />
            </div>
        );
    }
    
    
    return (
      <Paragraph className='min-h-[39rem]'>
          {IngredientDetail.notes}
      </Paragraph>
    );
  };

  return (

    
    <div className='className=" px-20 xl:px-52 py-8'>
          {renderTableContent()}
    </div>
   
  )
}

export default IngredientNotes