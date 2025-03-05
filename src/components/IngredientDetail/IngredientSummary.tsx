"use client";
import React, { useEffect } from "react";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFetchLiveIngredientDeatilMutation } from "@/redux/services/ingredientApi";
import { setIngredientDetail, setLoading } from "@/redux/features/IngredientDetailSice";
import { returnLocalDate } from "@/utils/utills";



const customSpanRender = (value: number ) => {
  let bgColor = "bg-customOrange"; // Default case

  if (value === 1) {
    bgColor = "bg-lightGreen";
  } else if (value === 0) {
    bgColor = "bg-customRed";
  }

  return <span className={`h-5 w-5 rounded-full ${bgColor}`}></span>;
};

const IngredientSummary: React.FC = () => {

  const { IngredientDetail } = useSelector((state: RootState) => state.IngredientDetailReducer); 
  const IngredientId = useParams()?.iid as string;
  const dispatch = useDispatch()

  const [fetchIngreditentDetail] = useFetchLiveIngredientDeatilMutation()

  const loadData = async() => {
    try {
      dispatch(setLoading(true))
      const res = await fetchIngreditentDetail({
        ingredient_id: IngredientId
      }).unwrap()
      dispatch(setIngredientDetail(res.data))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  


  

  return (
    <div className="bg-darkGreen text-white p-2 md:p-8 xl:h-auto flex flex-col gap-2 w-full px-4 md:px-12  xl:py-8 xl:px-52 font-henriette">
      
      {/* Product Name Label and Input */}
      <div className="flex flex-row w-full items-center">
        <label className="w-56 text-lg  md:text-2xl font-medium " htmlFor="ingredientName">
          Ingredient Name:
        </label>
            <p id="ingredientName" className="w-full p-3 text-lg md:text-2xl bg-transparent"> {IngredientDetail.ingredient_name} </p> 
      </div>

      <hr className="border-white" />

      <div className="flex flex-row w-full items-center mt-4">
        <label className="w-64  text-lg md:text-2xl font-medium " htmlFor="alt_name">
        Alternative Names:
        </label>
            <p id="alt_name" className="w-full p-3  text-lg md:text-2xl   bg-transparent"> {IngredientDetail.alternate_names.map((item)=>item.alternate_name).join(', ')} </p>
      </div>

      <div className="flex flex-row justify-start w-full mt-4">
        <div className="flex flex-col   lg:flex-row justify-start gap-4 items-start w-full ">
              {/* Accreditation Status */}
            <div className="flex  items-center gap-4 text-xl  lg:text-xl w-full lg:w-[25rem] lg:border-r-2 lg:border-white">
              <span className="flex items-center gap-2 ">
                {customSpanRender(IngredientDetail.vegetarian)} Vegetarian
              </span>
              <span className="flex items-center gap-2">
                {customSpanRender(IngredientDetail.vegan)}  Vegan
              </span>
              <span className="flex items-center gap-2">
              {customSpanRender(IngredientDetail.plant_based)}  Plant-Based
              </span>
            </div>

            <div className="flex flex-row justify-start items-start gap-2 text-lg ">
              <p>Submitted on: <span className="ml-2">{returnLocalDate(IngredientDetail?.created_at || new Date().toISOString(),  'dd/MM/yyyy')}</span></p>
              <p className="xl:ml-4">Response Date: <span className="ml-2">{returnLocalDate(IngredientDetail?.updated_at || new Date().toISOString(),  'dd/MM/yyyy') || 'N/A'}</span></p>
            </div>
          
        </div>
      

        {/* Floating Initials and View Notes Button */}
      </div>

      {/* Product Notes Modal */}
    </div>
  );
};

export default IngredientSummary;
