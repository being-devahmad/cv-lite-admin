import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UserTable from "@/components/Tables/UserTable";

const Users = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />

            <div className="flex flex-col gap-10">
                <UserTable />
            </div>
        </DefaultLayout>
    );
};

export default Users;
