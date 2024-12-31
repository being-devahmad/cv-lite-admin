import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import UserTable from "@/components/Tables/UserTable";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home(data: any) {

  console.log("meiw", data)

  return (
    <>
      <DefaultLayout>
        {/* {/* <ECommerce /> */}
        <UserTable />
      </DefaultLayout>
    </>
  );
}

