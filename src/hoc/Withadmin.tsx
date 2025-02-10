"use client";

import { useEffect, ComponentType } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Login from "@/Module/Login";

const Withadmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithUserData: React.FC<P> = (props) => {
    const userData = useSelector((state: RootState) => state?.auth.token);

    useEffect(() => {
      if (userData) {
        redirect("/");
      }
    }, [userData]);

    return userData ? <Login/> : <WrappedComponent {...props} />;
  };

  return WithUserData;
};

export default Withadmin;