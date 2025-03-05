// redux/features/loaderSlice.ts
import { IIngredientData, IIngredientTable } from '@/interface/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientDataState {
  isLoading: boolean;
  IngredientTable: IIngredientTable;
  liveIngredientSearchTableData: {
    liveSearch : string;
    tableData : IIngredientData[]
  }
  newData: IIngredientData[];
  handleType: 'SAVE' | 'SUBMIT'
}

const initialState: IngredientDataState = {
  isLoading: false,
  IngredientTable: {
    IngredientTableData: [],
    current_page: 1,
    per_page: 24,
    last_page: 0,
    total: 0,
    sort_dir: '',
    sort_by: '',
    search: '',
    requested_accreditation: '',
  },

  liveIngredientSearchTableData: {
    liveSearch: '',
    tableData: []
  },
  newData: [],
  handleType: 'SAVE'
};

const IngredientDataSlice = createSlice({
  name: 'IngredientData',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    loadProductIngredientTable: (state, action: PayloadAction<IIngredientData[]>) => {
        state.IngredientTable.IngredientTableData = [...action.payload]
    },

    loadLiveIngredientTable: (state, action: PayloadAction<IIngredientData[]>) => {
      state.liveIngredientSearchTableData.tableData = [...action.payload]
    },

    appendNewData:  (state, action: PayloadAction<IIngredientData>) => {
        state.newData.push(action.payload)
    },

    removeFromNewData :  (state, action: PayloadAction<number>) => {
      state.newData = state.newData.filter((item)=>item.id !== action.payload)
    },

    clearNewData: (state) => {
      state.newData = [];
    },

    addNonexitingData:  (state, action: PayloadAction<IIngredientData>) => {
        state.newData.push({...action.payload, notExisted: true})
    },

    setSearch : (state, action: PayloadAction<string>) => {
      state.IngredientTable.search = action.payload;
    },

    setLiveSearch : (state, action: PayloadAction<string>) => {
      state.liveIngredientSearchTableData.liveSearch = action.payload;
    },

    setRequestedAccredation : (state, action: PayloadAction<string>) => {
      state.IngredientTable.requested_accreditation = action.payload;
    },

    setSortTableByKey : (state, action: PayloadAction<{key: string, value: string}>) => {
      state.IngredientTable.sort_by = action.payload.key;
      state.IngredientTable.sort_dir = action.payload.value;
    },

    setcurrentPage :  (state,action: PayloadAction<number>) => {
      state.IngredientTable.current_page = action.payload || 1;
    },

    setcurrentItem :  (state,action: PayloadAction<number>) => {
      state.IngredientTable.per_page = action.payload || 24;
      state.IngredientTable.current_page = 1;
    },

    setTotalItem : (state,action: PayloadAction<number>) => {
      state.IngredientTable.total = action.payload || 0;
    },

    resetFilterItem : (state) => {
      state.IngredientTable.current_page = 1;
      state.IngredientTable.per_page = 24;
      state.IngredientTable.sort_by = '';
      state.IngredientTable.requested_accreditation = '';
    },

    changeHandleType :(state,action: PayloadAction<'SAVE' | 'SUBMIT'>) => {
      state.handleType = action.payload;
    },


  },
});

export const { setLoading , appendNewData, addNonexitingData, loadProductIngredientTable, resetFilterItem,setRequestedAccredation, setSearch, setSortTableByKey, setTotalItem, setcurrentItem, setcurrentPage, loadLiveIngredientTable, setLiveSearch, removeFromNewData , clearNewData, changeHandleType} = IngredientDataSlice.actions;
export default IngredientDataSlice.reducer;
