import React, { useState, useEffect } from "react";
import Button from "@/components/reusable/Button";
import Heading from "@/components/reusable/Heading";
import Paragraph from "@/components/reusable/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import ProductCreateModal from "@/components/Modals/ProductCreateModal";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import LogutModal from "../Modals/LogutModal";
import {useLogoutUserMutation } from "@/redux/services/api";
import { setLoading } from "@/redux/features/loaderSlice";
import { showToast } from "@/utils/utills";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Company Name' }) => {

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state?.auth.token);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [productModal, setProductModal] = useState<boolean>(false);
  const openLogoutModal = () => setLogoutModal(true);
  const openModal = () => setProductModal(true);
  const closeLogoutModal = () => setLogoutModal(false);
  const closeModal = () => setProductModal(false);
  const [logoutUser] = useLogoutUserMutation();
  
  const logoutUserFunc = async () => {
    try {
      dispatch(setLoading(true)); // Start loading
      const res  = await logoutUser({}).unwrap()
      dispatch(logout());
      dispatch(setLoading(false)); // End loading
      showToast(res.message, "success");
      router.push("/");
    } catch (err) {
      console.log("isLoading err", err);
      dispatch(setLoading(false)); // End loading
    }
  };
  
  // State to check if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set the isMounted state to true after the component mounts
    setIsMounted(true);
  }, []);

  // Prevent rendering server-side conditional content before client-side mount
  if (!isMounted) return null;

  return (
    <header className="bg-[#002326] text-white">
      {/* Top Bar */}
      <div className="flex justify-end items-center px-6 lg:px-52 py-3 border-b border-white">
        <div className="flex items-center gap-12 text-sm">
          {userData ? (
            <p className="flex items-center gap-1">
              <i className="fas fa-user"></i> Hi Johnny!
            </p>
          ) : null}
          {userData ? <button onClick={openLogoutModal} className="hover:underline">Log out</button> : null}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex md:flex-row md:justify-between flex-col justify-start items-center px-6 lg:px-52 py-8">
        <div className="flex flex-row justify-start items-center gap-8">
          {/* Logo */}
          <div className="border-r-2 border-white w-[150px] md:w-[245px] h-[75px]">
            <Image
              alt="brand"
              property="priority"
              width={100}
              height={100}
              className="w-32 h-full sm:w-32 md:w-44 lg:w-52"
              src={`/assets/images/Group.svg`}
            />
          </div>
          <Heading level={1} className="sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </Heading>
        </div>

        {/* Action Button */}
        {userData ? (
          <div className="flex flex-row gap-8 justify-between items-center mt-4">
            <Paragraph className="underline">Dashboard</Paragraph>
            <Button
              onClick={openModal}
              variant="dark-green"
              className="text-sm md:text-base lg:text-lg lg:px-[2.2rem] lg:py-3 md:px-4 md:py-2 px-3 py-1"
            > Add New Product </Button>
          </div>
        ) : null}
      </div>

      <ProductCreateModal isOpen={productModal}   
      onClose={closeModal}
      onSave={closeModal}    
      />

      <LogutModal isOpen={logoutModal}
        onClose={closeLogoutModal}
        onSave={() => {logoutUserFunc()}}/>
    </header>
  );
};

export default Header;
