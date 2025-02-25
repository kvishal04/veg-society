import React, { useState, useEffect } from "react";
import Button from "@/components/reusable/Button";
import Heading from "@/components/reusable/Heading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import ProductCreateModal from "@/components/Modals/ProductCreateModal";
import { logout } from "@/redux/features/authSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogutModal from "../Modals/LogutModal";
import {useLogoutUserMutation } from "@/redux/services/api";
import { setLoading } from "@/redux/features/loaderSlice";
import { showToast } from "@/utils/utills";
import User from "@/styles/logo/User";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Company Name' }) => {

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const {user, token} = useSelector((state: RootState) => state?.auth);
  const [productModal, setProductModal] = useState<boolean>(false);
  const openModal = () => setProductModal(true);
  const closeModal = () => setProductModal(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const closeLogoutModal = () => setLogoutModal(false);
  const openLogoutModal = () => setLogoutModal(true);
  const [logoutUser] = useLogoutUserMutation();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const mode = searchParams.get("mode");
  const isProductPage = pathname.includes("/product/");
  
  const logoutUserFunc = async () => {
    try {
      dispatch(setLoading(true)); // Start loading
      dispatch(setLoading(false)); // End loading
      const res  = await logoutUser().unwrap()
      showToast(res.message, "success");
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.log("isLoading err", err);
      dispatch(setLoading(false)); // End loading
      dispatch(logout());
    }
  };

  const renderButton = () => {
    switch (true) {
      case isProductPage && mode === "0":
        return (
          <Link
            className="bg-darkGreen hover:bg-green-800 rounded-lg border-2 border-lightGreen text-sm md:text-base lg:text-lg lg:px-[2.2rem] lg:py-3 md:px-4 md:py-2 px-3 py-1"
            href={`${pathname}?mode=1`}
          >
            Edit Product
          </Link>
        );
  
      case isProductPage:
        return (
          <Button
            onClick={openModal}
            variant="dark-green"
            className="text-sm md:text-base lg:text-lg lg:px-[2.2rem] lg:py-3 md:px-4 md:py-2 px-3 py-1"
          >
            Save
          </Button>
        );
  
      default:
        return (
          <Button
            onClick={openModal}
            variant="dark-green"
            className="text-sm md:text-base lg:text-lg lg:px-[2.2rem] lg:py-3 md:px-4 md:py-2 px-3 py-1"
          >
            Add New Product
          </Button>
        );
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
      <div className="flex justify-end items-center px-6 lg:px-52 py-3 border-b h-10 border-white text-barlow">
        <div className="flex items-center gap-12 text-sm">
          {token ? (
            <p className="flex items-center gap-2">
              <User className="h-5 w-4"/> Hi {user?.name}!
            </p>
          ) : null}
          {token ? <button onClick={openLogoutModal} className="hover:underline font-bold">Log out</button> : null}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex md:flex-row justify-between flex-col items-center px-6 md:px-6 lg:px-52 md:py-8 py-2">
        <div className="flex flex-row justify-end items-center gap-8 ">
          {/* Logo */}
          <div className="border-r-2 border-white w-[150px] md:w-[245px] mt-2 md:mt-0 h-10 md:h-[75px]">
            <Image
              alt="brand"
              property="priority"
              width={100}
              height={100}
              className="w-32 h-full sm:w-32 md:w-44 lg:w-52"
              src={`/assets/images/Group.svg`}
            />
          </div>
          <Heading level={1} className="font-henriette sm:text-xl md:text-3xl lg:text-3xl xl:text-5xl">
            {title}
          </Heading>
        </div>

        {/* Action Button */}
        {token ? (
          <div className="flex flex-row gap-8 justify-between items-center mt-4  w-full md:w-auto">
            <Link href={'/dashboard'} className="underline">Dashboard</Link>
              {renderButton()}
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
