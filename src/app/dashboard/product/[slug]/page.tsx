import IngredientTable from '@/components/Productdetail/IngredientTable'
import ProductSummary from '@/components/Productdetail/ProductSummary'
import React from 'react'

const page = () => {
  return (
    <div className='calci'>
        <ProductSummary />
        <IngredientTable />
    </div>
  )
}

export default page