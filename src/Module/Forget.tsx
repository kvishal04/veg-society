"use client";

import { useState } from "react";
import Input from "@/components/reusable/Input";
import Button from "@/components/reusable/Button";
import Header from "@/components/Common/Header";
import Paragraph from "@/components/reusable/Paragraph";
import Link from "next/link";

export default function Forget() {
  const [email, setEmail] = useState("kminchelle");

  return (
    
    <div className="bg-[#F2E9DA]">
        <Header title={'Forgot your password?'} />
        <div className="calci flex items-top justify-start pt-4 px-4 ">
            <div className="bg-transparent p-6 w-full md:w-96 sm:mt-12 md:mt-10 sm:ml-12 md:ml-40">
              <form className="w-full md:w-[27rem]">
                <div className="">
                    <Paragraph className="text-darkGreen text-xl" children={`Enter your email address to receive a reset password link.`} text="" />
                    <div className="mt-12">
                        <div className="capitalize text-xl mb-2">
                            <label className="text-darkGreen">Email ID</label>
                        </div>
                        <Input type="email" className="w-full h-12 rounded-md p-4" placeholder="" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="flex justify-start items-center gap-8 my-12">
                        <div className="">
                            <Button children={'Submit'} variant="dark-green" className="w-full text-lg py-3 px-12 md:px-[5.2rem]" /> 
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
