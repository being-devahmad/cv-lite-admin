

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import CreateNewTemplate from '@/components/Templates/CreateTemplate'
import CreateNewUser from '@/components/Users/CreateUser'
import EditNewUser from '@/components/Users/EditUser'
import React from 'react'

const EditUser = () => {

    return (

        <DefaultLayout>
            <Breadcrumb pageName="Edit New User" />

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <EditNewUser />

                </div>
            </div>
        </DefaultLayout>

    )
}

export default EditUser
