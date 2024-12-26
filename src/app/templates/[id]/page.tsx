'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const TemplateDetailsPage = () => {
    const { id } = useParams()
    return (
        <div>
            this is template {id}
        </div>
    )
}

export default TemplateDetailsPage
