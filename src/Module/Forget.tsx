"use client";

import { useCallback, useState } from "react";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Paragraph from "@/components/reusable/Paragraph";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useForgetUserMutation } from "@/redux/services/api";
import { debounce } from "lodash";
import { setLoading } from "@/redux/features/loaderSlice";
import { checkEmail, showToast } from "@/utils/utills";
import { ApiError } from "@/utils/customError";
import { ErrorCode, ErrorData } from "@/interface/error";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const [forgetUser] = useForgetUserMutation();

  const debouncedLogin = useCallback(
    debounce(
      async (email: string) => {
        try {
          dispatch(setLoading(true)); // Start loading
          const response = await forgetUser({ email }).unwrap();
          showToast(response.message, 'success')
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
    [dispatch, forgetUser]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!checkEmail(email)){
      setEmailError("Invalid email");
      return 
    }else{
      setEmailError(null);
    }
    debouncedLogin(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Email validation
    if(!checkEmail(emailValue)){
      setEmailError("Invalid email");
    }else{
      setEmailError(null);
    }
  };

  return (
    
    <div className="bg-[#F2E9DA]">
        <Header title={'Forgot your password?'} />
        <div className="calci flex items-top justify-start pt-4 px-4 text-barlow">
            <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-10 sm:ml-12 md:ml-40">
              <form onSubmit={handleSubmit} className="w-full md:w-[27rem]">
                <div className="">
                    <Paragraph className="text-darkGreen text-xl" > Enter your email address to receive a reset password link. </Paragraph>
                    <div className="mt-12">
                        <div className="capitalize text-xl mb-2">
                            <label htmlFor="email" className="text-darkGreen">Email ID</label>
                        </div>
                        <Input id="email" type="email" className="w-full h-12 rounded-md p-4" placeholder="" value={email} onChange={handleEmailChange} />
                          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="flex justify-start items-center gap-8 my-12">
                        <div className="">
                            <Button  disabled={!!emailError}  type="submit" variant="dark-green" className="w-full text-lg py-3 px-12 md:px-[5.2rem]">    Submit </Button>
                        </div>
                        <div className="text-darkGreen text-base md:text-xl underline">
                        <Link href={'/'}>
                            Back to log in ?
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
