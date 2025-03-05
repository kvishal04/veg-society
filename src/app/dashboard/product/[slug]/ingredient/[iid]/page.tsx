import IngredientNotes from '@/components/IngredientDetail/IngredientNotes'
import IngredientSummary from '@/components/IngredientDetail/IngredientSummary'
import React from 'react'

const page = () => {
  return (
    <div>

        <IngredientSummary />
        <IngredientNotes />
    </div>
  )
}

export default page