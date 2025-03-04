// redux/features/loaderSlice.ts
import { ProductDetail, ProductNotesArray } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDetailState {
  isLoading: boolean;
  productDetail : ProductDetail;
  productNotes : ProductNotesArray
  notes: string

}

const initialState: ProductDetailState = {
  isLoading: false,
  productDetail : {
    product_name: '',
    accreditation_status: '',
    requested_accreditation: '',
    submitted_on: '',
    response_date: '',
    id: 0,
    current_accreditation: '',
    ready_for_accreditation: false,
    vegetarianStatus: 1,
    veganStatus: 2,
    plantBasedStatus: 0
  },
  productNotes :  [],
  notes: ''
};

const ProductDetailSlice = createSlice({
  name: 'ProductDetail',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setProductDetailSummary: (state, action: PayloadAction<{productDetail : ProductDetail , productNotes : ProductNotesArray }>) => {
        state.productDetail = action.payload.productDetail
        state.productNotes = action.payload.productNotes
    },

    setProductDetail: (state, action: PayloadAction<ProductDetail>) => {
      state.productDetail = action.payload
    },

    setProductNotes: (state, action: PayloadAction<ProductNotesArray>) => {
      state.productNotes = action.payload
    },

    setNote : (state, action: PayloadAction<string>) => {
      state.notes = action.payload
    },
 
  },
});

export const { setLoading, setProductDetail, setProductDetailSummary, setProductNotes, setNote } = ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;
