"use client";

import "@/styles/globals.css";
import Withadmin from "@/hoc/Withadmin";
import Header from "@/components/Common/Header";
import { Suspense, useEffect, useState } from "react";



interface AdminLayoutProps {
    children: React.ReactNode;
}
  
const AdminLayout : React.FC<AdminLayoutProps> = (props) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return null; // Prevent rendering on the server
}
        return (
            <div className="nooooo">
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
              </Suspense>
              {props.children}
            </div>
          );
}

export default Withadmin(AdminLayout);