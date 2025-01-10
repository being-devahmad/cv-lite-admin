import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SignInWithPassword from "@/components/Auth/SigninWithPassword";
import Image from "next/image";

export const metadata: Metadata = {
  title: "CV Lite | Admin Login",
  description: "CV-LITE Admin Panel login page",
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full ">
          <div className="w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <SignInWithPassword />
            </div>
          </div>
          <div className="w-full hidden md:block">
            <div className="w-full flex items-center justify-start p-4 sm:p-12.5 xl:p-15">
              <Image src={'https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?t=st=1736474229~exp=1736477829~hmac=2bbd35c5813bb717bd67e09840a1d958e3cbb921ae7470ee4c4d3be36e879cda&w=740'} width={400} height={400} alt="login" />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
