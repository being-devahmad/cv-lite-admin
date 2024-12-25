'use client'

import React, { useState } from 'react'

const CreateNewTemplate = () => {

    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);


    return (
        <>
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <form action="">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 p-6.5 ">
                        <div>
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter template name"
                                name='name'
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
                                name='name'
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
                                        className="sr-only"
                                        onChange={() => {
                                            setIsVisible(!isVisible);
                                        }}
                                    />
                                    {/* Toggle Background */}
                                    <div
                                        className={`block w-14 h-8 rounded-full transition ${isVisible
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                            }`}
                                    ></div>
                                    {/* Toggle Knob */}
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
                                        className="sr-only"
                                        onChange={() => {
                                            setIsPaid(!isPaid);
                                        }}
                                    />
                                    {/* Toggle Background */}
                                    <div
                                        className={`block w-14 h-8 rounded-full transition ${isPaid
                                            ? "bg-primary dark:bg-blue-500"
                                            : "bg-gray-300 dark:bg-[#5A616B]"
                                            }`}
                                    ></div>
                                    {/* Toggle Knob */}
                                    <div
                                        className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-transform transform ${isPaid ? "translate-x-6" : ""
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5.5 p-6.5'>
                        <div className='w-full'>
                            <button className='inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90  bg-green text-white  px-10 py-3.5 lg:px-8 xl:px-10'>
                                Create
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateNewTemplate
