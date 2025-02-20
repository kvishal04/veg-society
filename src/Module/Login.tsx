"use client";

import { useState } from "react";
import { useLoginUserMutation } from "@/redux/services/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Link from "next/link";
import { checkEmail, showToast } from "@/utils/utills";
import { debounce } from "lodash";
import { ErrorCode, ErrorData } from "@/interface/error";
import { ApiError } from "@/utils/customError";
import { setLoading } from "@/redux/features/loaderSlice";
import Withoutadmin from "@/hoc/Withoutadmin";



// Debounced login function outside component to prevent re-creation on every render
const debouncedLogin = debounce(
  async (email: string, password: string, dispatch: AppDispatch, loginUser: any, router: any) => {
    try {
      dispatch(setLoading(true));
      const response = await loginUser({ email, password }).unwrap();
      dispatch(setUser({ user: { id: response.data.id, email, name: response.data.name, role: response.data.role }, token: response.data.token }));
      showToast(response.message, "success");
      dispatch(setLoading(false));
      router.push("/dashboard");
    } catch (err) {
      dispatch(setLoading(false));
      const error = err as ErrorCode;
      const errorInstance = new ApiError(error.data as ErrorData, error.status);
      showToast(errorInstance.globalMessage || "Login failed", "error");
    }
  },
  500
);

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    if (id === "email") {
      setErrors((prev) => ({ ...prev, email: checkEmail(value) ? "" : "Invalid email" }));
    } else if (id === "password") {
      setErrors((prev) => ({ ...prev, password: value.length ? "" : "Password is empty" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!checkEmail(email) || !password.length) {
      setErrors({
        email: checkEmail(email) ? "" : "Invalid email",
        password: password.length ? "" : "Password is empty",
      });
      return;
    }

    debouncedLogin(email, password, dispatch, loginUser, router);
  };

  return (
    <div className="login">
      <Header title="Log in" />
      <div className="bg-[#F2E9DA] calci flex items-top justify-start text-barlow">
        <div className="bg-transparent px-6 pt-6 h-auto sm:mt-12 md:mt-[7.7rem] sm:ml-12 md:ml-40">
          <form onSubmit={handleSubmit} className="w-full md:w-[26.7rem]">
            <div>
              <div>
                <label htmlFor="email" className="capitalize text-xl mb-2 text-darkGreen">
                  Email ID
                </label>
                <Input
                  id="email"
                  type="email"
                  className={`w-full h-12 rounded-md p-4 ${errors.email ? "border-red-500" : ""} text-barlow`}
                  placeholder=""
                  value={credentials.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mt-6">
                <label htmlFor="password" className="capitalize text-xl mb-2 text-darkGreen">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  className="w-full h-12 rounded-md p-4"
                  placeholder=""
                  value={credentials.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex justify-start items-center gap-8 mt-8">
                <Button
                  type="submit"
                  variant="dark-green"
                  className="text-lg py-3 px-12 md:px-[4.5rem]"
                  disabled={!!errors.email || !!errors.password}
                >
                  Log in
                </Button>
                <Link href="/forgot" className="text-darkGreen text-base md:text-xl underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withoutadmin(Login);
