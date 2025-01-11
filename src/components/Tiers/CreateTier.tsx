'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { PlusCircle, Trash2 } from 'lucide-react'
import { createTier } from '@/actions/createTier'

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
            className='w-full  bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {pending ? 'Creating...' : 'Create Tier'}
        </button>
    )
}

interface TierType {
    type: string;
    price: string;
    features: string[];
}

const CreateTier = () => {
    const [tierName, setTierName] = useState<string>('');
    const [tierTypes, setTierTypes] = useState<TierType[]>([{ type: '', price: '', features: [''] }]);
    const router = useRouter()

    const [state, formAction] = useFormState(createTier, initialState)

    useEffect(() => {
        if (state.success) {
            router.push('/tiers')
        }
    }, [state.success, router])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.set('tierName', tierName)
        formData.set('tierTypes', JSON.stringify(tierTypes))
        formAction(formData)
    }

    const addTierType = () => {
        setTierTypes([...tierTypes, { type: '', price: '', features: [''] }]);
    }

    const removeTierType = (index: number) => {
        const newTierTypes = tierTypes.filter((_, i) => i !== index);
        setTierTypes(newTierTypes);
    }

    const updateTierType = (index: number, field: keyof TierType, value: string) => {
        const newTierTypes = [...tierTypes];
        newTierTypes[index][field] = value as never;
        setTierTypes(newTierTypes);
    }

    const addFeature = (typeIndex: number) => {
        const newTierTypes = [...tierTypes];
        newTierTypes[typeIndex].features.push('');
        setTierTypes(newTierTypes);
    }

    const updateFeature = (typeIndex: number, featureIndex: number, value: string) => {
        const newTierTypes = [...tierTypes];
        newTierTypes[typeIndex].features[featureIndex] = value;
        setTierTypes(newTierTypes);
    }

    const removeFeature = (typeIndex: number, featureIndex: number) => {
        const newTierTypes = [...tierTypes];
        newTierTypes[typeIndex].features = newTierTypes[typeIndex].features.filter((_, i) => i !== featureIndex);
        setTierTypes(newTierTypes);
    }

    return (
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <form onSubmit={handleSubmit} className="p-8">
                {state.error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{state.error}</p>
                    </div>
                )}

                <div className="mb-6">
                    <label htmlFor="tierName" className="block text-sm font-medium text-dark dark:text-white mb-2">
                        Tier Name
                    </label>
                    <input
                        id="tierName"
                        type="text"
                        placeholder="Enter tier name"
                        value={tierName}
                        onChange={(e) => setTierName(e.target.value)}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                    />
                </div>

                {tierTypes.map((tierType, typeIndex) => (
                    <div key={typeIndex} className="mb-8 bg-gray-50 dark:border-dark-3 dark:bg-gray-800 dark:shadow-card rounded-lg p-6 shadow-inner">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-dark dark:text-white">
                                Tier Type {typeIndex + 1}
                            </h3>
                            {typeIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeTierType(typeIndex)}
                                    className="text-green-500 hover:text-green-700 transition duration-300"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor={`tierType-${typeIndex}`} className="block text-sm font-medium text-dark dark:text-white mb-2">
                                    Type
                                </label>
                                <input
                                    id={`tierType-${typeIndex}`}
                                    type="text"
                                    placeholder="e.g., monthly, yearly, lifetime"
                                    value={tierType.type}
                                    onChange={(e) => updateTierType(typeIndex, 'type', e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                                />
                            </div>
                            <div>
                                <label htmlFor={`tierPrice-${typeIndex}`} className="block text-sm font-medium text-dark dark:text-white mb-2">
                                    Price
                                </label>
                                <input
                                    id={`tierPrice-${typeIndex}`}
                                    type="text"
                                    placeholder="Enter price"
                                    value={tierType.price}
                                    onChange={(e) => updateTierType(typeIndex, 'price', e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-md font-medium text-dark dark:text-white mb-2">Features</h4>
                            {tierType.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        placeholder="Enter feature"
                                        value={feature}
                                        onChange={(e) => updateFeature(typeIndex, featureIndex, e.target.value)}
                                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(typeIndex, featureIndex)}
                                        className="ml-2 text-green-500 hover:text-green-700 transition duration-300"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addFeature(typeIndex)}
                                className="mt-2 text-green-600 hover:text-green-800 flex items-center transition duration-300"
                            >
                                <PlusCircle size={20} className="mr-2" />
                                Add Feature
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addTierType}
                    className="mb-6 w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Add Tier Type
                </button>

                <div className='mt-8'>
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}

export default CreateTier

