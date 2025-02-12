"use client";

import { useState } from "react";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Link from "next/link";

export default function Reset() {
  const [resetpassword, setResetPassword] = useState("");
  const [password, setPassword] = useState("");



  return (
    
    <div>
        <Header title={'Reset password'} />
        <div className="bg-[#F2E9DA] h-screen flex items-top justify-start p-4">
            <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-32 sm:ml-12 md:ml-40 ">
                <form className="w-full md:w-[27rem]" >
                <div>
                    <div>
                        <div className="capitalize text-xl mb-2">
                            <label className="text-darkGreen">Password</label>
                        </div>
                        <Input type="password" className="w-full h-12 rounded-md p-4" placeholder="" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <div>
                            <div className="capitalize text-xl mb-2">
                                <label className="text-darkGreen">Confirm password</label>
                            </div>
                            <Input type="password" className="w-full h-12 rounded-md p-4" placeholder="" value={resetpassword} onChange={(e)=> setResetPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-8 my-8">
                        <div className="">
                            <Button children={'Submit'} variant="dark-green" className="w-full text-lg py-3 px-12 md:px-[5.2rem]" /> 
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
