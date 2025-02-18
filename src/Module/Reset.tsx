"use client";

import { useCallback, useState } from "react";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Link from "next/link";
import Paragraph from "@/components/reusable/Paragraph";
import { checkPassword, showToast } from "@/utils/utills";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useResetUserMutation } from "@/redux/services/api";
import { debounce } from "lodash";
import { setLoading } from "@/redux/features/loaderSlice";
import { ErrorCode, ErrorData } from "@/interface/error";
import { ApiError } from "@/utils/customError";

export default function Reset() {
  const [password, setPassword] = useState("ASUS@rog00");
  const [resetPassword, setResetPassword] = useState("ASUS@rog00");
  const [passwordError, setPasswordError] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Fetch query parameters

  const token = searchParams.get("token")?? '';
  const email = searchParams.get("email")?? '';

  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const [resetUser] = useResetUserMutation();

  const debouncedLogin = useCallback(
    debounce(
      async (password: string, password_confirmation: string) => {
        try {
          dispatch(setLoading(true)); // Start loading
          const response = await resetUser({ email: email , token: token , password, password_confirmation}).unwrap();
          showToast(response.message, 'success')
          router.push('/')
          dispatch(setLoading(false)); // End loading
        } catch (err) {
          dispatch(setLoading(false)); // End loading
          const error  =  err as ErrorCode
          const errorInstance = new ApiError(error.data as ErrorData, error.status);
          showToast(errorInstance.globalMessage || "Login failed", "error");
        }
      },
      500 // 500ms debounce time
    ),
    [dispatch, resetUser]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
        return
    } else {
      setPasswordError("");
    }

    if(!checkPassword(password)){
        setPasswordError("Password must contain mixed case letters, numbers and symbols");
        return
    }else {
        setPasswordError("");
    }

    if (password !== resetPassword) {
      setResetPasswordError("Passwords do not match.");
      return
    } else {
      setResetPasswordError("");
    }
    debouncedLogin(password, resetPassword)
  };
  

  

  return (
    <div>
      <Header title={'Reset password'} />
      <div className="bg-[#F2E9DA] calci flex items-top justify-start p-4">
        <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-16 sm:ml-12 md:ml-40">
          <form className="w-full lg:w-[45rem]" onSubmit={handleSubmit}>
            <div>
                <Paragraph className="text-darkGreen text-xl" > Enter your new password.</Paragraph>
                <Paragraph className="text-darkGreen text-base mt-4" > (Password must be atleast 8 characters long and contain mixed case letters, numbers and symbols.) </Paragraph>
              <div className="md:w-[27rem] mt-8">
                <div className="capitalize text-xl mb-2">
                  <label htmlFor="password" className="text-darkGreen">Password</label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="w-full h-12 rounded-md p-4" 
                  placeholder="" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <div className="mt-6 md:w-[27rem]">
                <div className="capitalize text-xl mb-2">
                  <label htmlFor="password_confirmation" className="text-darkGreen">Confirm password</label>
                </div>
                <Input 
                  id="password_confirmation" 
                  type="password" 
                  className="w-full h-12 rounded-md p-4" 
                  placeholder="" 
                  value={resetPassword} 
                  onChange={(e) => setResetPassword(e.target.value)} 
                />
                {resetPasswordError && <p className="text-red-500 text-sm mt-1">{resetPasswordError}</p>}
              </div>
              <div className="flex justify-start items-center gap-8 my-8">
                <div>
                  <Button type="submit" variant="dark-green" className="w-full text-lg py-3 px-12 md:px-[5.2rem]">
                    Submit
                  </Button>
                </div>
                <div className="text-darkGreen text-base md:text-xl underline">
                  <Link href={'/'}>
                    Back to log in
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
