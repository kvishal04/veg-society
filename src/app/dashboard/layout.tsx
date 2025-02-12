"use client";

import "@/styles/globals.css";
import Withadmin from "@/hoc/Withadmin";
import Header from "@/components/Common/Header";



interface AdminLayoutProps {
    children: React.ReactNode;
}
  
    const AdminLayout : React.FC<AdminLayoutProps> = (props) => {
    return (
        <div className="">
             <Header />
            {props.children}
        </div>
    );
}

export default Withadmin(AdminLayout);