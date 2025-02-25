// redux/features/loaderSlice.ts
import { ProductDetail } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDetailState {
  isLoading: boolean;
  productDetail : ProductDetail

}

const initialState: ProductDetailState = {
  isLoading: false,
  productDetail : {
      name: '',
      accreditation_status: '',
      requested: '',
      submit_date: '',
      responce_date: ''
  }
};

const ProductDetailSlice = createSlice({
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

export const { setLoading, setProductDetail } = ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;
