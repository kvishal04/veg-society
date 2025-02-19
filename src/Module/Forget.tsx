"use client";

import { useCallback, useRef, useState } from "react";
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
  const dispatch = useDispatch<AppDispatch>();
  const [forgetUser] = useForgetUserMutation();

  // Using useRef to persist debounce function across renders
  const debouncedForgetUser = useRef(
    debounce(async (email: string) => {
      dispatch(setLoading(true));
      try {
        const response = await forgetUser({ email }).unwrap();
        showToast(response.message, "success");
      } catch (err) {
        const error = err as ErrorCode;
        const errorInstance = new ApiError(error.data as ErrorData, error.status);
        showToast(errorInstance.globalMessage || "Login failed", "error");
      } finally {
        dispatch(setLoading(false));
      }
    }, 500)
  ).current;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    setEmailError(null);
    debouncedForgetUser(email);
  };

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(checkEmail(emailValue) ? null : "Invalid email");
  }, []);

  return (
    <div className="bg-[#F2E9DA]">
      <Header title="Forgot your password?" />
      <div className="calci flex items-top justify-start pt-4 px-4 text-barlow">
        <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-10 sm:ml-12 md:ml-40">
          <form onSubmit={handleSubmit} className="w-full md:w-[27rem]">
            <Paragraph className="text-darkGreen text-xl">
              Enter your email address to receive a reset password link.
            </Paragraph>
            <div className="mt-12">
              <label htmlFor="email" className="capitalize text-xl mb-2 text-darkGreen block">
                Email ID
              </label>
              <Input
                id="email"
                type="email"
                className="w-full h-12 rounded-md p-4"
                placeholder=""
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div className="flex justify-start items-center gap-8 my-12">
              <Button
                disabled={!!emailError}
                type="submit"
                variant="dark-green"
                className="text-lg py-3 px-12 md:px-[5.2rem]"
              >
                Submit
              </Button>
              <Link href="/" className="text-darkGreen text-base md:text-xl underline">
                Back to log in?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
