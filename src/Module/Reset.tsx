"use client";

import { Suspense, useCallback, useState } from "react";
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
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [resetUser] = useResetUserMutation();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!checkPassword(password)) {
      return "Password must contain mixed case letters, numbers, and symbols.";
    }
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password !== confirmPassword ? "Passwords do not match." : "";
  };

  const debouncedResetPassword = useCallback(
    debounce(async (password: string, confirmPassword: string) => {
      try {
        dispatch(setLoading(true));
        const response = await resetUser({ email, token, password, password_confirmation: confirmPassword }).unwrap();
        showToast(response.message, "success");
        router.push("/");
      } catch (err) {
        const error = err as ErrorCode;
        const errorInstance = new ApiError(error.data as ErrorData, error.status);
        showToast(errorInstance.globalMessage || "Reset failed", "error");
      } finally {
        dispatch(setLoading(false));
      }
    }, 500),
    [dispatch, resetUser, email, token, router]
  );

  const handleChange = (field: "password" | "confirmPassword", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({
      ...prev,
      [field]: field === "password" ? validatePassword(value) : validateConfirmPassword(formData.password, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    if (passwordError || confirmPasswordError) {
      setErrors({ password: passwordError, confirmPassword: confirmPasswordError });
      return;
    }

    debouncedResetPassword(formData.password, formData.confirmPassword);
  };

  return (
    <div>
       <Suspense fallback={<div>Loading...</div>}>
          <Header title="Reset password" />
       </Suspense>
      <div className="bg-[#F2E9DA] calci flex items-top justify-start p-4 text-barlow">
        <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-16 sm:ml-12 md:ml-40">
          <form className="w-full lg:w-[45rem]" onSubmit={handleSubmit}>
            <Paragraph className="text-darkGreen text-xl">Enter your new password.</Paragraph>
            <Paragraph className="text-darkGreen text-base mt-4 font-henriette">
              (Password must be at least 8 characters long and contain mixed case letters, numbers, and symbols.)
            </Paragraph>

            <div className="md:w-[27rem] mt-8">
              <label htmlFor="password" className="text-darkGreen capitalize text-xl mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full h-12 rounded-md p-4"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="mt-6 md:w-[27rem]">
              <label htmlFor="confirmPassword" className="text-darkGreen capitalize text-xl mb-2">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                className="w-full h-12 rounded-md p-4"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex justify-start items-center gap-8 my-8">
              <Button type="submit" variant="dark-green" className="text-lg py-3 px-12 md:px-[5.2rem]">
                Submit
              </Button>
              <Link href="/" className="text-darkGreen text-base md:text-xl underline">
                Back to log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
