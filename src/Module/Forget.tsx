"use client";

import { useState } from "react";
import { useLoginUserMutation } from "@/redux/services/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { redirect } from "next/navigation";
import Input from "@/components/reusable/CustomInput";
import Button from "@/components/reusable/CustomButton";
import Header from "@/components/Common/Header";
import Paragraph from "@/components/reusable/CustomParagraph";

export default function Forget() {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password }).unwrap();
      dispatch(setUser({ user: { id: response.id, email: response.email }, token: response.token }));
        redirect("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    
    <div>
        <Header title={'Forgot your password?'} />
        <div className="bg-[#F2E9DA] h-screen flex items-top justify-start p-4">
            <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-32 sm:ml-12 md:ml-40 ">
                <form className="w-full md:w-[27rem]" >
                <div>
                    <Paragraph className="text-darkGreen text-xl" children={`Enter your email address to receive a reset password link.`} text="" />
                    <div className="mt-10">
                        <div className="capitalize text-xl mb-2">
                            <label className="text-darkGreen">Email ID</label>
                        </div>
                        <Input className="w-full h-12 rounded-md" placeholder="" value={""} onChange={(e)=> console.log(e)} />
                    </div>
                    <div className="flex justify-start items-center gap-8 my-12">
                        <div className="">
                            <Button children={'Submit'} variant="dark-green" className="w-full text-lg py-4 px-20" /> 
                        </div>
                        <div className="text-darkGreen text-xl underline">
                            <a href="#">Back to log in</a>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>

  );
}
