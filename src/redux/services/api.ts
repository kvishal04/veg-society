import { BASE_URL} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { DataCode } from "@/interface/error";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(
    { baseUrl: BASE_URL ,
      prepareHeaders: (headers, { getState }) => {
        const myState: RootState = getState() as RootState;
        const userData = myState.auth
  
        if (userData?.token) {
          headers.set('Authorization', `Bearer ${userData?.token}`);
        }
  
        headers.set('Content-Type', 'application/json');
        return headers;
      },
    },
   
  ), 
  tagTypes: ["Auth"], // Add this line**  
  endpoints: (builder) => ({
    loginUser: builder.mutation<DataCode, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation<DataCode, {}>({
      query: (credentials) => ({
        url: "/logout",
        method: "POST",
        body: credentials,
      }),
    }),
    }),

   
});

export const { useLoginUserMutation, useLogoutUserMutation } = api;
