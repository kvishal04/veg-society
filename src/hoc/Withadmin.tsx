"use client";

import { useEffect, useState, ComponentType } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const WithAdmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithUserData: React.FC<P> = (props) => {
    const userData = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
    
      if (!userData) {
        router.replace("/"); // Redirect if no token
      } else {
        setIsChecked(true);
      }

    }, [userData, router, dispatch]);

    if (!isChecked) {
      return null; // Avoid rendering anything until authentication check is done
    }

    return <WrappedComponent {...props} />;
  };

  return WithUserData;
};

export default WithAdmin;
