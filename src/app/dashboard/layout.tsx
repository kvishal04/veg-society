"use client";

import "@/styles/globals.css";
import Withadmin from "@/hoc/Withadmin";



interface AdminLayoutProps {
    children: React.ReactNode;
}
  
    const AdminLayout : React.FC<AdminLayoutProps> = (props) => {
    return (
        <div className="">
            {props.children}
        </div>
    );
}

export default Withadmin(AdminLayout);