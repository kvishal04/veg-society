"use client";

import { useCallback, useState, useEffect } from "react";
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
const Login: React.FC = () => {
  const [email, setEmail] = useState("vishal.kumar@123789.org");
  const [password, setPassword] = useState("Test@123");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const debouncedLogin = useCallback(
    debounce(
      async (email: string, password: string) => {
        try {
          dispatch(setLoading(true)); // Start loading
          const response = await loginUser({ email, password }).unwrap();
          dispatch(setUser({ user: { id: response.data.id, email: email }, token: response.data.token }));
          showToast(response.message, 'success')
          dispatch(setLoading(false)); // End loading
          router.push("/dashboard");
        } catch (err) {
          console.log("isLoading err", err);
          dispatch(setLoading(false)); // End loading
          const error  =  err as ErrorCode
          const errorInstance = new ApiError(error.data as ErrorData, error.status);
          showToast(errorInstance.globalMessage || "Login failed", "error");
        }
      },
      500 // 500ms debounce time
    ),
    [dispatch, loginUser]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!checkEmail(email)){
      setEmailError("Invalid email");
      return
    }

    if(!password.length){
      setPasswordError("Paswword is empty");
      return
    }
    
    else{
      setEmailError(null);
    }

    debouncedLogin(email, password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Email validation
    // Email validation
        if(!checkEmail(emailValue)){
          setEmailError("Invalid email");
        }else{
          setEmailError(null);
        }
  };
  

  // State to check if component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set the isMounted state to true after the component mounts
    setIsMounted(true);
  }, []);

  // Prevent rendering server-side conditional content before client-side mount
  if (!isMounted) return null;

  return (
    <div className="">
      <Header title={"Log in"} />
      <div className="bg-[#F2E9DA] calci flex items-top justify-start text-barlow">
        <div className="bg-transparent px-6 pt-6 h-auto sm:mt-12 md:mt-[7.7rem] sm:ml-12 md:ml-40 ">
          <form onSubmit={handleSubmit} className="w-full md:w-[26.7rem]">
            <div>
              <div>
                <div className="capitalize text-xl mb-2">
                  <label htmlFor="email" className="text-darkGreen ">Email ID</label>
                </div>
                <Input
                  id="email"
                  type="email"
                  className={`w-full h-12 rounded-md p-4 ${emailError ? 'border-red-500' : ''} text-barlow`}
                  placeholder=""
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div className="mt-6">
                <div>
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
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
              </div>
              <div className="flex justify-start items-center gap-8 mt-8">
                <div className="">
                  <Button
                    type="submit"
                    variant="dark-green"
                    className="w-full text-lg py-3 px-12 md:px-[4.5rem]"
                    disabled={!!emailError} // Disable button if email is invalid
                  > Log in </Button>
                </div>
                <div className="text-darkGreen text-base md:text-xl underline">
                  <Link href={"/forgot"}>Forgot password?</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login