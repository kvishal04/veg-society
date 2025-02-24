// redux/features/loaderSlice.ts
import { ingredientData } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientDataState {
  isLoading: boolean;
  IngredientTableData: ingredientData[];
  newData: ingredientData[];
}

const initialState: IngredientDataState = {
  isLoading: false,
  IngredientTableData: [],
  newData: []
};

const IngredientDataSlice = createSlice({
  name: 'IngredientData',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    loadProductIngredientTable: (state, action: PayloadAction<ingredientData[]>) => {
        state.IngredientTableData = [...action.payload]
    },

    appendNewData:  (state, action: PayloadAction<ingredientData>) => {
        state.newData.push(action.payload)
    },

    addNonexitingData:  (state, action: PayloadAction<ingredientData>) => {
        state.newData.push({...action.payload, notExisted: true})
    }

  },
});

export const { setLoading , appendNewData, addNonexitingData, loadProductIngredientTable } = IngredientDataSlice.actions;
export default IngredientDataSlice.reducer;
