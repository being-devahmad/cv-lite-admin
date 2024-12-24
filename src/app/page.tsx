
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableThree from "@/components/Tables/UserTable";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home(data:any) {
 
  console.log("meiw",data)
  
  return (
    <>
      <DefaultLayout>
        <ECommerce />
        <TableThree />
      </DefaultLayout>
    </>
  );
}

