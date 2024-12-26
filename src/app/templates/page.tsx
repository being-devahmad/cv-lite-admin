import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TemplateTable from "@/components/Tables/TemplateTable";

const Templates = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Templates" />

            <div className="flex flex-col gap-10">
                <TemplateTable />
            </div>
        </DefaultLayout>
    );
};

export default Templates;
