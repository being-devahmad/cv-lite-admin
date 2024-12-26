import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import CreateNewTemplate from '@/components/Templates/CreateTemplate'
import React from 'react'

const CreateTemplate = () => {

    return (

        <DefaultLayout>
            <Breadcrumb pageName="Create New Template" />

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <CreateNewTemplate />

                </div>
            </div>
        </DefaultLayout>

    )
}

export default CreateTemplate
