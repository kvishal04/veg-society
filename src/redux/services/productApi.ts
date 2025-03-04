import { BASE_URL, showToast, ToastMessage,} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { FETCH_PRODUCT_DETAILS, NOTES, SAVE } from "../API_URL";
import { DataCode } from "@/interface/error";
import { logout } from "@/redux/features/authSlice"; // Import your logout action
import { ProductNotesArray } from "@/interface/main";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL + "products/",
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
        api.dispatch(logout()); // Dispatch logout action
    }

    return result;
};

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: baseQueryWithAuthHandling,
    endpoints: (builder) => ({
       
        ProductNotes: builder.mutation<ProductNotesArray, { product_id: string }>({
            query: (credentials) => ({
              url: NOTES,
              method: "POST",
              body: credentials,
            }),
            transformResponse: (_response: { status: number; data: any; message: string }) => {
              showToast(_response.message, ToastMessage.SHOW_SUCCESS);
              return _response.data as ProductNotesArray;  // Ensure compatibility here
            },
            transformErrorResponse: (_response: { status: number; data: { message: string } }) => {
                showToast(_response.data.message, ToastMessage.SHOW_ERROR);
                return [];
            },
        }),

        SaveNotes: builder.mutation<DataCode, { product_id : string , note: string}>({
            query: (credentials) => ({
                url: NOTES + SAVE,
                method: "POST",
                body: credentials,
                transformResponse: (_response: { status: number; data: ProductNotesArray; message: string }) => {
                    console.log("_response", _response);
                    showToast(_response.message, ToastMessage.SHOW_SUCCESS);
                    return _response.data;
                },
                transformErrorResponse: (_response: { status: number; data: { message: string } }) => {
                    showToast(_response.data.message, ToastMessage.SHOW_ERROR);
                    return [];
                },
            }),
        }),

        fetchIngredientData: builder.mutation<DataCode, { product_id: string, sort_by: string; sort_dir: string; search: string; requested_accreditation: string; per_page: number; page: number }>({
            query: (credentials) => ({
              url: FETCH_PRODUCT_DETAILS,
              method: "POST",
              body: credentials,
            })
        }),

        fetchLiveIngredientData: builder.mutation<DataCode, { search: string }>({
            query: (credentials) => ({
              url: FETCH_PRODUCT_DETAILS,
              method: "POST",
              body: credentials,
            })
        }),

       
    }),
});

export const { useProductNotesMutation, useSaveNotesMutation, useFetchIngredientDataMutation } = productApi;
