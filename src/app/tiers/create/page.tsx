import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import CreateNewSubscriptionPlan from '@/components/Tiers/CreateTier'
import React from 'react'

const CreateSubscriptionPlan = () => {

    return (

        <DefaultLayout>
            <Breadcrumb pageName="Create New Subscription Plan" />
            

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <CreateNewSubscriptionPlan />

                </div>
            </div>
        </DefaultLayout>

    )
}

export default CreateSubscriptionPlan
