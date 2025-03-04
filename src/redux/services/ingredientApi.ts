import { BASE_URL} from "@/utils/utills";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { SEARCH } from "../API_URL";
import { DataCode } from "@/interface/error";
import { logout } from "@/redux/features/authSlice"; // Import your logout action


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL + "ingredients/",
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

export const ingredientApi = createApi({
    reducerPath: "ingredientApi",
    baseQuery: baseQueryWithAuthHandling,
    endpoints: (builder) => ({

        fetchLiveIngredientData: builder.mutation<DataCode, { search: string }>({
            query: (credentials) => ({
              url: SEARCH,
              method: "POST",
              body: credentials,
            })
        }),

       
    }),
});

export const { useFetchLiveIngredientDataMutation } = ingredientApi;
