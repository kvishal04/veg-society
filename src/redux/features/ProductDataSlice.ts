import { IproductCraeteData, IproductTable, ProductData } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDataState {
  isLoading: boolean;
  productData: IproductCraeteData
  productTable: IproductTable
}

const initialState: ProductDataState = {
  isLoading: false,
  productData: {
    product_name: '',
    requested_accreditation: '',
    notes: '',
  },
  productTable: {
    data: [],
    current_page: 1,
    per_page: 24,
    last_page: 0,
    total: 0,
    sort_dir: 'asc',
    sort_by: '',
    search: '',
    requested_accreditation: '',
    accreditation_status: '',

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
      state.productTable.accreditation_status = action.payload;
    },

    setSearch : (state, action: PayloadAction<string>) => {
      state.productTable.search = action.payload;
    },

    setRequestedAccredation : (state, action: PayloadAction<string>) => {
      state.productTable.requested_accreditation = action.payload;
    },

    setAccreditationStatus : (state, action: PayloadAction<string>) => {
      state.productTable.accreditation_status = action.payload;
    },

    setSortTableByKey : (state, action: PayloadAction<{key: string, value: 'asc'| 'desc'}>) => {
      state.productTable.sort_by = action.payload.key;
      state.productTable.sort_dir = action.payload.value;
    },

    setcurrentPage :  (state,action: PayloadAction<number>) => {
      state.productTable.current_page = action.payload || 1;
    },

    setcurrentItem :  (state,action: PayloadAction<number>) => {
      state.productTable.per_page = action.payload || 24;
      state.productTable.current_page = 1;
    },

    setTotalItem : (state,action: PayloadAction<number>) => {
      state.productTable.total = action.payload || 0;
    },

    resetFilterItem : (state) => {
      state.productTable.current_page = 1;
      state.productTable.per_page = 24;
      state.productTable.sort_by = '';
      state.productTable.requested_accreditation = '';
      state.productTable.accreditation_status = '';
    },


    setCreateProductData :  (state,action: PayloadAction<{key : 'product_name' | 'requested_accreditation' |'notes', value: string}>) => {
      state.productData[action.payload.key] = action.payload.value
    },


    setProductTablePagination: (
      state,
      action: PayloadAction<{
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
      }>
    ) => {
      state.productTable.current_page = action.payload.current_page;
      state.productTable.per_page = action.payload.per_page;
      state.productTable.last_page = action.payload.last_page;
      state.productTable.total = action.payload.total;
    },
  },
});

export const { setLoading, setProductDetail, appendProductTable, setProductTable, setProductTablePagination, setSelectedTile, setSearch, setRequestedAccredation, setAccreditationStatus, setSortTableByKey, setcurrentPage , setcurrentItem, setTotalItem, resetFilterItem, setCreateProductData } =  ProductDataSlice.actions;

export default ProductDataSlice.reducer;
