import { BASE_URL} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { DataCode } from "@/interface/error";
import { FORGET_PASSWORD, LOGIN, LOGOUT, RESET_PASSWORD } from "../API_URL";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(
    { baseUrl: BASE_URL ,
      prepareHeaders: (headers, { getState }) => {
        const myState: RootState = getState() as RootState;
        const userData = myState.auth;
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        if (userData.token) {
          headers.set('Authorization', `Bearer ${userData.token}`);
        }

        return headers;
      },
    },
  ), 
  tagTypes: ["Auth", "Forget"], // Add this line**  
  endpoints: (builder) => ({
    loginUser: builder.mutation<DataCode, { email: string; password: string }>({
      query: (credentials) => ({
        url: LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation<DataCode, void>({
      query: () => ({
        url: LOGOUT,
        method: "POST"
      }),
    }),  
    
    forgetUser: builder.mutation<DataCode, {email: string}>({
      query: (credentials) => ({
        url: FORGET_PASSWORD,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Forget'],
    }),

    resetUser: builder.mutation<DataCode, {email: string, token: string, password: string, password_confirmation: string}>({
      query: (credentials) => ({
        url: RESET_PASSWORD,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Forget'],
    }),


    }),

   
});

export const { useLoginUserMutation, useLogoutUserMutation, useForgetUserMutation, useResetUserMutation } = api;
