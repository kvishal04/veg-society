import IngredientTable from '@/components/Productdetail/IngredientTable'
import ProductSummary from '@/components/Productdetail/ProductSummary'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='calci'>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductSummary />
        </Suspense>
        <IngredientTable />
    </div>
  )
}

export default page