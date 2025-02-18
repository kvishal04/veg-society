"use client";

import { useEffect, ComponentType } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Login from "@/Module/Login";
import Dashboard from "@/app/dashboard/page";

const Withoutadmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithUserData: React.FC<P> = (props) => {
    const userData = useSelector((state: RootState) => state?.auth.token);
    console.log(userData, "userData")
    useEffect(() => {
      if (userData) {
        redirect("/dashboard");
      }
    }, [userData]);

    return userData ? <Dashboard /> : <WrappedComponent {...props} />;
  };

  return WithUserData;
};

export default Withoutadmin;