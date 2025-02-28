// redux/features/loaderSlice.ts
import { ProductDetail, ProductNotes } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDetailState {
  isLoading: boolean;
  productDetail : ProductDetail;
  productNotes : ProductNotes

}

const initialState: ProductDetailState = {
  isLoading: false,
  productDetail : {
      name: '',
      accreditation_status: '',
      requested: '',
      submit_date: '',
      responce_date: ''
  },
  productNotes : {
    data : [],
  }
};

const ProductDetailSlice = createSlice({
  name: 'ProductDetail',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setProductDetailSummary: (state, action: PayloadAction<{productDetail : ProductDetail , productNotes : ProductNotes }>) => {
        state.productDetail = action.payload.productDetail
        state.productNotes = action.payload.productNotes
    },

    setProductDetail: (state, action: PayloadAction<ProductDetail>) => {
      state.productDetail = action.payload
    },

    

  },
});

export const { setLoading, setProductDetail, setProductDetailSummary } = ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;
