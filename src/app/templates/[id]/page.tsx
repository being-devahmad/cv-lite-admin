'use client'

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import ViewTemplate from '@/components/Templates/VIewTemplate'
import { useParams } from 'next/navigation'
import React from 'react'

const TemplateDetailsPage = () => {
    const { id } = useParams()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="View Template" />

            <div className="flex flex-col gap-10">
                <div className="space-y-4">

                    <ViewTemplate id={id as string} />

                </div>
            </div>
        </DefaultLayout>
    )
}

export default TemplateDetailsPage
