import { BASE_URL, showToast, ToastMessage} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IdashboardSummary } from "@/interface/main";
import { DASHBOARD_SUMMARY, PRODUCT_TABLE } from "../API_URL";
import { DataCode } from "@/interface/error";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery(
    { baseUrl: BASE_URL + 'dashboard/',
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
  tagTypes: ["Create", "Delete"], // Add this line**  
  endpoints: (builder) => ({
    dashboardSummary: builder.query({
        query: () => DASHBOARD_SUMMARY,
        providesTags: ['Create'],
        transformResponse: (_response: { status: number, data: IdashboardSummary, message: string }) => {
            showToast( _response.message, ToastMessage.SHOW_SUCCESS);
            return _response.data
          },
        // Pick out error and prevent nested properties in a hook or selector
        transformErrorResponse: (_response: { status: number, data: { message: string } }) => {
            showToast( _response.data.message, ToastMessage.SHOW_ERROR);
            return _response.data.message
        }

    }),

    productTable: builder.mutation<DataCode, {sort_by: string, sort_dir: 'asc' | 'desc', search: string, requested_accreditation: string, accreditation_status: string, per_page: number, page: number }>({
          query: (credentials) => ({
            url: PRODUCT_TABLE,
            method: "POST",
            body: credentials,
          }),
        }),
    }),

   
});

export const { useDashboardSummaryQuery , useProductTableMutation } = dashboardApi;
