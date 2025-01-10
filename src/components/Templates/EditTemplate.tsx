'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { getTemplateById } from '@/actions/getTemplateById'
import { updateTemplate } from '@/actions/updateTemplate'

const initialState = {
    success: false,
    error: '',
    message: undefined
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className='inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 bg-green
        text-white px-10 py-3.5 lg:px-8 xl:px-10 disabled:opacity-50'>
            {pending ? 'Updating...' : 'Update'}
        </button>
    )
}

interface EditTemplateProps {
    id: string;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ id }) => {
    const [name, setName] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [createdAt, setCreatedAt] = useState<string>('');
    const [updatedAt, setUpdatedAt] = useState<string>('');
    const router = useRouter()

    const [state, formAction] = useFormState(updateTemplate, initialState)

    const fetchTemplateData = async () => {
        const result = await getTemplateById(id)
        if (result.success && result.data) {
            setName(result.data.name)
            setAuthor(result.data.author)
            setIsPaid(result.data.isPaid)
            setIsVisible(result.data.isVisible)
            setCreatedAt(result.data.createdAt)
            setUpdatedAt(result.data.updatedAt)
        } else {
            console.error('Failed to fetch template:', result.error)
        }
    }

    useEffect(() => {
        fetchTemplateData()
    }, [id ])

    useEffect(() => {
        if (state.success) {
            router.push('/templates')
        }
    }, [state.success , router])

    return (
        <>
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <form action={formAction}>
                    {/* {state.error && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {state.error}
                        </div>
                    )}
                    {state.success && (
                        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            {state.message}
                        </div>
                    )} */}
                    <input type="hidden" name="id" value={id} />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 p-6.5 ">
                        <div>
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter template name"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Author
                            </label>
                            <input
                                type="text"
                                placeholder="Enter author name"
                                name='author'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
                        <div>
                            <label
                                htmlFor="isVisible"
                                className="flex items-center cursor-pointer space-x-3"
                            >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Visibility Status
                                </span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="isVisible"
                                        name="isVisible"
                                        className="sr-only"
                                        checked={isVisible}
                                        onChange={() => setIsVisible(!isVisible)}
                                    />
                                    <div
                                        className={`block w-14 h-8 rounded-full transition ${isVisible
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                            }`}
                                    ></div>
                                    <div
                                        className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-transform transform ${isVisible ? "translate-x-6" : ""
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        </div>

                        <div>
                            <label
                                htmlFor="isPaid"
                                className="flex items-center cursor-pointer space-x-3"
                            >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Paid Status
                                </span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="isPaid"
                                        name="isPaid"
                                        className="sr-only"
                                        checked={isPaid}
                                        onChange={() => setIsPaid(!isPaid)}
                                    />
                                    <div
                                        className={`block w-14 h-8 rounded-full transition ${isPaid
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                            }`}
                                    ></div>
                                    <div
                                        className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-transform transform ${isPaid ? "translate-x-6" : ""
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Created At
                            </label>
                            <input
                                type="text"
                                value={new Date(createdAt).toLocaleString()}
                                readOnly
                                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray-100 px-5.5 py-3 text-dark outline-none transition disabled:cursor-not-allowed dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Updated At
                            </label>
                            <input
                                type="text"
                                value={new Date(updatedAt).toLocaleString()}
                                readOnly
                                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray-100 px-5.5 py-3 text-dark outline-none transition disabled:cursor-not-allowed dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5.5 p-6.5'>
                        <div className='w-full'>
                            <SubmitButton />
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default EditTemplate

