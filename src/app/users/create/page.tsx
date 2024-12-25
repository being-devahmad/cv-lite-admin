

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import CreateNewTemplate from '@/components/Templates/CreateTemplate'
import CreateNewUser from '@/components/Users/CreateUser'
import React from 'react'

const CreateUser = () => {

    return (

        <DefaultLayout>
            <Breadcrumb pageName="Create New User" />

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <CreateNewUser />

                </div>
            </div>
        </DefaultLayout>

    )
}

export default CreateUser
