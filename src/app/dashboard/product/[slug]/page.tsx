import ProductTable from '@/components/Dashboard/ProductTable.tsx/ProductTable'
import ProductSummary from '@/components/Productdetail/ProductSummary'
import React from 'react'

const page = () => {
  return (
    <div className='calci'>
        <ProductSummary />
        <ProductTable />
    </div>
  )
}

export default page