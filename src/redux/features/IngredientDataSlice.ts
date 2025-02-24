// redux/features/loaderSlice.ts
import { IIngredientData } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientDataState {
  isLoading: boolean;
  IngredientTableData: IIngredientData[];
  newData: IIngredientData[];
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

    loadProductIngredientTable: (state, action: PayloadAction<IIngredientData[]>) => {
        state.IngredientTableData = [...action.payload]
    },

    appendNewData:  (state, action: PayloadAction<IIngredientData>) => {
        state.newData.push(action.payload)
    },

    addNonexitingData:  (state, action: PayloadAction<IIngredientData>) => {
        state.newData.push({...action.payload, notExisted: true})
    }

  },
});

export const { setLoading , appendNewData, addNonexitingData, loadProductIngredientTable } = IngredientDataSlice.actions;
export default IngredientDataSlice.reducer;
