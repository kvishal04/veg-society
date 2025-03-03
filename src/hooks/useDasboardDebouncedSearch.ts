import { useCallback } from "react";
import { debounce } from "lodash";
import { AppDispatch } from "@/redux/store";
import { showToast, ToastMessage } from "@/utils/utills";
import { ErrorCode, ErrorData } from "@/interface/error";
import { ApiError } from "@/utils/customError";
import { setLoading, setProductTable, setTotalItem } from "@/redux/features/ProductDataSlice";
import { IdashboardFilterData } from "@/interface/main";

const useDasboardDebouncedSearch = (fetchFunction: any, delay: number = 1000) => {
  return useCallback(
    debounce(async (data: IdashboardFilterData, dispatch: AppDispatch) => {
      try {
        const response = await fetchFunction(data).unwrap();
            dispatch(setProductTable(response.data.data));
            dispatch(setTotalItem(response.data.total));
            dispatch(setLoading(false));
            showToast(response.message, ToastMessage.SHOW_SUCCESS);
        } catch (err) {
        const error = err as ErrorCode;
            const errorInstance = new ApiError(error.data as ErrorData, error.status);
            dispatch(setProductTable([]));
            dispatch(setTotalItem(0));
            dispatch(setLoading(false));
            showToast(errorInstance.globalMessage || "Login failed", "error");
        }
    }, delay),
    [fetchFunction, delay]
  );
};

export default useDasboardDebouncedSearch;