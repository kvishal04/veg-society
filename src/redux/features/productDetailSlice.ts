// redux/features/loaderSlice.ts
import { IIngredientData, ProductDetail } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productDetailState {
  isLoading: boolean;
  IngredientTableData: IIngredientData[];
  newData: IIngredientData[];
  productDetail : ProductDetail

}

const initialState: productDetailState = {
  isLoading: false,
  IngredientTableData: [],
  newData: [],
  productDetail : {
      name: '',
      accreditation_status: '',
      requested: '',
      submit_date: '',
      responce_date: ''
  }
};

const productDetailSlice = createSlice({
  name: 'ProductDetail',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setProductDetail: (state, action: PayloadAction<ProductDetail>) => {
        state.productDetail = action.payload
    },

  },
});

export const { setLoading, setProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
