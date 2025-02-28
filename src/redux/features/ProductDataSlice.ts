import { IdashboardSummary, IproductCraeteData, IproductTable, ProductData } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDataState {
  isLoading: boolean;
  productData: IproductCraeteData
  selectedTile : string
  productTable: IproductTable
}

const initialState: ProductDataState = {
  isLoading: false,
  productData: {
    name: '',
    requested_accreditation: '',
    notes: '',
  },
  selectedTile: '',
  productTable: {
    data: [],
    currentPage: 0,
    currentItem: 0,
    lastPage: 0,
    totalItem: 0,
  },
};

const ProductDataSlice = createSlice({
  name: 'ProductData',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setProductDetail: (state, action: PayloadAction<ProductDataState['productData']>) => {
      state.productData = action.payload;
    },

    appendProductTable: (state, action: PayloadAction<ProductData>) => {
      state.productTable.data = [...state.productTable.data, action.payload]; // Avoid direct mutation
    },

    setProductTable: (state, action: PayloadAction<ProductData[]>) => {
      state.productTable.data = action.payload;
    },

    setSelectedTile : (state, action: PayloadAction<string>) => {
      state.selectedTile = action.payload;
    },


    setProductTablePagination: (
      state,
      action: PayloadAction<{
        currentPage: number;
        currentItem: number;
        lastPage: number;
        totalItem: number;
      }>
    ) => {
      state.productTable.currentPage = action.payload.currentPage;
      state.productTable.currentItem = action.payload.currentItem;
      state.productTable.lastPage = action.payload.lastPage;
      state.productTable.totalItem = action.payload.totalItem;
    },
  },
});

export const { setLoading, setProductDetail, appendProductTable, setProductTable, setProductTablePagination, setSelectedTile } =
  ProductDataSlice.actions;

export default ProductDataSlice.reducer;
