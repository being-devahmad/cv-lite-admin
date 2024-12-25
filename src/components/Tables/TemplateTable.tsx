'use client'

import { useEffect, useState } from "react";
import { Check, PlusCircle, X } from 'lucide-react';
import Table from "./Table";
import ButtonDefault from "../Buttons/ButtonDefault";

interface Template {
    id: string;
    name: string;
    isVisible: boolean;
    isPaid: boolean;
    author: string
}

const TemplateTable = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setIsLoading(true);
                // Replace this with your actual API endpoint for templates
                const response = await fetch('/api/templates');
                if (!response.ok) {
                    throw new Error('Failed to fetch templates');
                }
                const data = await response.json();
                setTemplates(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load templates. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const columns = [
        {
            key: 'template',
            header: 'Template',
            render: (template: Template) => (
                <div className="flex items-center">
                    <div>
                        <h5 className="text-dark dark:text-white font-semibold">
                            {template.name}
                        </h5>
                    </div>
                </div>
            ),
        },
        {
            key: 'author',
            header: 'Author',
            render: (template: Template) => (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {template.author}
                </span>
            ),
        },
        {
            key: 'isVisible',
            header: 'Is Visible',
            render: (template: Template) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.isVisible === true ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                </span>
            ),
        },
        {
            key: 'isPaid',
            header: 'Is Paid',
            render: (template: Template) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.isPaid === true ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                </span>
            ),
        },
       
    ];

    if (isLoading) {
        return <div className="text-center py-4">Loading templates...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
                <div className="flex justify-between items-center">
                    <ButtonDefault
                        label="Create Template"
                        link="/templates/create"
                        customClasses="bg-green text-white py-[11px] px-6"
                    >
                        <PlusCircle className="h-4 w-4" />
                    </ButtonDefault>
                </div>
            </div>

            <Table data={templates} columns={columns} />
        </div>
    );
};

export default TemplateTable;