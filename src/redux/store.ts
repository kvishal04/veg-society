import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/redux/services/api";
import authReducer from "@/redux/features/authSlice";
import loaderReducer from "@/redux/features/loaderSlice";
import ProductDetailReducer from "@/redux/features/productDetailSlice";
import IngredientDataReducer from "@/redux/features/IngredientDataSlice";
import ProductDataReducer from "@/redux/features/ProductDataSlice";
import { dashboardApi } from "@/redux/services/dashboardApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      loader: loaderReducer,
      productDetailReducer : ProductDetailReducer,
      IngredientData: IngredientDataReducer,
      ProductData: ProductDataReducer, 
      [api.reducerPath]: api.reducer,
      [dashboardApi.reducerPath]: dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(api.middleware).concat(dashboardApi.middleware)
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
