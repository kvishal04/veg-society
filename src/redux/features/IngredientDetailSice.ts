// redux/features/loaderSlice.ts
import { IIngredientData } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientDetailState {
  isLoading: boolean;
  IngredientDetail : IIngredientData;

}

const initialState: IngredientDetailState = {
  isLoading: false,
  IngredientDetail :{ 
    alternate_names: [],
    date_added: '',
    id: 0,
    ingredient_name: '',
    plant_based: 2,
    vegan: 2,
    vegetarian: 2,
    added_by: '',
    created_at: '',
    is_verified: false,
    notes: '',
    user_id: 0
  },
};

const IngredientDetailSlice = createSlice({
  name: 'IngredientDetail',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },


    setIngredientDetail: (state, action: PayloadAction<IIngredientData>) => {
      state.IngredientDetail = action.payload
    },

  },
});

export const { setLoading, setIngredientDetail} = IngredientDetailSlice.actions;
export default IngredientDetailSlice.reducer;
