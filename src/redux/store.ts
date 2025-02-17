import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/redux/services/api";
import authReducer from "@/redux/features/authSlice";
import loaderReducer from "@/redux/features/loaderSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      loader: loaderReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
