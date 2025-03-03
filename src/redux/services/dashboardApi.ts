import { BASE_URL, showToast, ToastMessage } from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IdashboardSummary, IproductCraeteData } from "@/interface/main";
import { CREATE_PRODUCT, DASHBOARD_SUMMARY, DELETE_PRODUCT, PRODUCT_TABLE } from "../API_URL";
import { DataCode } from "@/interface/error";
import { logout } from "@/redux/features/authSlice"; // Import your logout action

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL + "dashboard/",
    prepareHeaders: (headers, { getState }) => {
        const myState: RootState = getState() as RootState;
        const userData = myState.auth;
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        if (userData.token) {
            headers.set("Authorization", `Bearer ${userData.token}`);
        }
        return headers;
    },
});

const baseQueryWithAuthHandling = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        showToast("Session expired. Please log in again.", ToastMessage.SHOW_ERROR);
        api.dispatch(logout()); // Dispatch logout action
    }

    return result;
};

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: baseQueryWithAuthHandling,
    tagTypes: ["productTable", "Delete", "dashboardSummary"],
    endpoints: (builder) => ({
        dashboardSummary: builder.query({
            query: () => DASHBOARD_SUMMARY,
            providesTags: ["dashboardSummary"],
            transformResponse: (_response: { status: number; data: IdashboardSummary; message: string }) => {
                showToast(_response.message, ToastMessage.SHOW_SUCCESS);
                return _response.data;
            },
            transformErrorResponse: (_response: { status: number; data: { message: string } }) => {
                showToast(_response.data.message, ToastMessage.SHOW_ERROR);
                return _response.data.message;
            },
        }),

        productTable: builder.mutation<DataCode, { sort_by: string; sort_dir: "asc" | "desc"; search: string; requested_accreditation: string; accreditation_status: string; per_page: number; page: number }>({
            query: (credentials) => ({
                url: PRODUCT_TABLE,
                method: "POST",
                body: credentials,
            }),
        }),

        productDelete: builder.mutation<DataCode, { id: number }>({
            query: (credentials) => ({
                url: DELETE_PRODUCT + `/${credentials.id}`,
                method: "DELETE",
                invalidatesTags: ["productTable"],
                transformResponse: (_response: { status: number; data: boolean; message: string }) => {
                    showToast(_response.message, ToastMessage.SHOW_SUCCESS);
                    return _response.data;
                },
                transformErrorResponse: (_response: { status: number; data: boolean; message: string }) => {
                    showToast(_response.message, ToastMessage.SHOW_ERROR);
                    return _response.message;
                },
            }),
            
        }),

        productCreate: builder.mutation<DataCode, IproductCraeteData>({
            query: (credentials) => ({
                url: CREATE_PRODUCT,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["productTable"],
            transformResponse: (_response: { status: number; data: any; message: string }) => {
                showToast(_response.message, ToastMessage.SHOW_SUCCESS);
                return _response.data;
            },
            transformErrorResponse: (_response: { status: number; data: any; message: string }) => {
                showToast(_response.message, ToastMessage.SHOW_ERROR);
                return _response.message;
            },
        }),
    }),
});

export const { useDashboardSummaryQuery, useProductTableMutation, useProductDeleteMutation, useProductCreateMutation } = dashboardApi;
