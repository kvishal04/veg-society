import { useCallback } from "react";
import { debounce } from "lodash";
import { AppDispatch } from "@/redux/store";
import { showToast, ToastMessage } from "@/utils/utills";
import { ErrorCode, ErrorData } from "@/interface/error";
import { ApiError } from "@/utils/customError";
import { loadLiveIngredientTable } from "@/redux/features/IngredientDataSlice";

const useIngredientDebounceSerach = (fetchFunction: any, delay: number = 1000) => {
  return useCallback(
    debounce(async (search : string, dispatch: AppDispatch) => {
      try {
            const response = await fetchFunction({search}).unwrap();
            dispatch(loadLiveIngredientTable(response.data));
            showToast(response.message, ToastMessage.SHOW_SUCCESS);
          
        } catch (err) {
        const error = err as ErrorCode;
        console.log("error", error)
            const errorInstance = new ApiError(error.data as ErrorData, error.status);
            dispatch(loadLiveIngredientTable([]));
            showToast(errorInstance.globalMessage || "Login failed", "error");
        }
    }, delay),
    [fetchFunction, delay]
  );
};

export default useIngredientDebounceSerach;