import { useCallback } from "react";
import { debounce } from "lodash";
import { AppDispatch } from "@/redux/store";
import { showToast, ToastMessage } from "@/utils/utills";
import { ErrorCode, ErrorData } from "@/interface/error";
import { ApiError } from "@/utils/customError";
import { setLoading, loadProductIngredientTable, setTotalItem } from "@/redux/features/IngredientDataSlice";
import { IIngredientilterData } from "@/interface/main";

const useIngredientDebounceSerach = (fetchFunction: any, delay: number = 1000) => {
  return useCallback(
    debounce(async (data: IIngredientilterData, dispatch: AppDispatch) => {
      try {
            dispatch(setLoading(true));
            const response = await fetchFunction(data).unwrap();
            console.log("response",response)
            dispatch(loadProductIngredientTable(response.data.ingredients.data));
            dispatch(setTotalItem(response.data.ingredients.total));
            dispatch(setLoading(false));
            showToast(response.message, ToastMessage.SHOW_SUCCESS);
        } catch (err) {
        const error = err as ErrorCode;
        console.log("error", error)
            const errorInstance = new ApiError(error.data as ErrorData, error.status);
            dispatch(loadProductIngredientTable([]));
            dispatch(setTotalItem(0));
            dispatch(setLoading(false));
            showToast(errorInstance.globalMessage || "Login failed", "error");
        }
    }, delay),
    [fetchFunction, delay]
  );
};

export default useIngredientDebounceSerach;