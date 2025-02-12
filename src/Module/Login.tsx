"use client";

import { useState } from "react";
import { useLoginUserMutation } from "@/redux/services/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { redirect } from "next/navigation";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Link from "next/link";

export default function Login() {
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
    
    <div className="">
        <Header title={'Log in'} />
        <div className="bg-[#F2E9DA] calci flex items-top justify-start">
            <div className="bg-transparent px-6 pt-6 h-auto sm:mt-12 md:mt-[7.7rem] sm:ml-12 md:ml-40 ">
                <form className="w-full md:w-[26.7rem]" >
                <div>
                    <div>
                        <div className="capitalize text-xl mb-2">
                            <label className="text-darkGreen">Email ID</label>
                        </div>
                        <Input type="email" className="w-full h-12 rounded-md p-4" placeholder="" value={username} onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <div>
                            <div className="capitalize text-xl mb-2">
                                <label className="text-darkGreen">Password</label>
                            </div>
                            <Input type="password" className="w-full h-12 rounded-md p-4" placeholder="" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-8 mt-8">
                        <div className="">
                            <Button children={'Log in'} variant="dark-green" className="w-full text-lg py-3 px-12 md:px-[5.2rem]" /> 
                        </div>
                        <div className="text-darkGreen text-base md:text-xl underline">
                        <Link href={'/forgot'}>
                            Forgot password?
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
