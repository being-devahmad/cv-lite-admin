'use client'

import { useParams } from 'next/navigation'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import EditTemplate from '@/components/Templates/EditTemplate';

const TemplateDetailsEditPage = () => {
    const { id } = useParams()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Template" />

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <EditTemplate id={id as string} />

                </div>
            </div>
        </DefaultLayout>
    );
};

export default TemplateDetailsEditPage;
