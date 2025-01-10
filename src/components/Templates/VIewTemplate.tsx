'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getTemplateById } from '@/actions/getTemplateById'

interface ViewTemplateProps {
    id: string;
}

const ViewTemplate: React.FC<ViewTemplateProps> = ({ id }) => {
    const [template, setTemplate] = useState<any>(null);
    const router = useRouter()

    const fetchTemplateData = async () => {
        const result = await getTemplateById(id)
        if (result.success && result.data) {
            setTemplate(result.data)
        } else {
            console.error('Failed to fetch template:', result.error)
        }
    }

    useEffect(() => {
        fetchTemplateData()
    }, [id ])

    if (!template) {
        return <div className="text-center p-6">Loading...</div>
    }

    return (
        <>
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 p-6.5 ">
                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Name
                        </label>
                        <div className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                            {template.name}
                        </div>
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Author
                        </label>
                        <div className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                            {template.author}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Visibility Status
                        </label>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div
                                    className={`block w-14 h-8 rounded-full transition ${
                                        template.isVisible
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                    }`}
                                ></div>
                                <div
                                    className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-transform transform ${
                                        template.isVisible ? "translate-x-6" : ""
                                    }`}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {template.isVisible ? 'Visible' : 'Not Visible'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Paid Status
                        </label>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div
                                    className={`block w-14 h-8 rounded-full transition ${
                                        template.isPaid
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                    }`}
                                ></div>
                                <div
                                    className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-transform transform ${
                                        template.isPaid ? "translate-x-6" : ""
                                    }`}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {template.isPaid ? 'Paid' : 'Free'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Created At
                        </label>
                        <div className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray-100 px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                            {new Date(template.createdAt).toLocaleString()}
                        </div>
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Updated At
                        </label>
                        <div className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray-100 px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                            {new Date(template.updatedAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-5.5 p-6.5'>
                    <div className='w-full flex justify-between'>
                        <button
                            onClick={() => router.push('/templates')}
                            className='inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 bg-gray-500 text-white px-10 py-3.5 lg:px-8 xl:px-10'
                        >
                            Back to Templates
                        </button>
                        <button
                            onClick={() => router.push(`/templates/${id}/edit`)}
                            className='inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 bg-green text-white px-10 py-3.5 lg:px-8 xl:px-10'
                        >
                            Edit Template
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTemplate

