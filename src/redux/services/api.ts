import { BASE_URL} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { dataCode } from "@/interface/error";

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
  endpoints: (builder) => ({
    loginUser: builder.mutation<dataCode, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = api;
