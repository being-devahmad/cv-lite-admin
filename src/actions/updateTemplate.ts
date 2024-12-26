'use server'

import { db } from '@/lib/firebase'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'

export async function updateTemplate(prevState: any, formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const author = formData.get('author') as string
    const isVisible = formData.get('isVisible') === 'on'
    const isPaid = formData.get('isPaid') === 'on'

    try {
        const docRef = doc(db, 'templates', id);
        await updateDoc(docRef, {
            name,
            author,
            isVisible,
            isPaid,
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Template updated successfully' }
    } catch (error) {
        console.error('Failed to update template:', error)
        return { success: false, error: 'Failed to update template' }
    }
}
