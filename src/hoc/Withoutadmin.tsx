"use client";

import { useEffect, useState, ComponentType } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Withoutadmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithUserData: React.FC<P> = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const userData = useSelector((state: RootState) => state?.auth.token);
    const router = useRouter();

    useEffect(() => {
      if (userData !== undefined) {
        if (userData) {
          router.replace("/dashboard"); // Redirect if logged in
        } else {
          setIsChecked(true); // Allow rendering if not logged in
        }
      }
    }, [userData, router]);

    if (!isChecked) return null; // Avoid hydration issues by waiting

    return <WrappedComponent {...props} />;
  };

  return WithUserData;
};

export default Withoutadmin;
