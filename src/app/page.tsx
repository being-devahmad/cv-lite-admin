import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import UserTable from "@/components/Tables/UserTable";

export default function Home(data: any) {


  return (
    <>
      <DefaultLayout>
        {/* {/* <ECommerce /> */}
        <UserTable />
      </DefaultLayout>
    </>
  );
}

