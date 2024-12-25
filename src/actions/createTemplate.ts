'use server'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function createTemplate(prevState: any, formData: FormData) {
    try {
        const templatesCollection = collection(db, 'templates');

        const templateData = {
            name: formData.get('name'),
            author: formData.get('author'),
            isVisible: formData.get('isVisible') === 'true',
            isPaid: formData.get('isPaid') === 'true',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(templatesCollection, templateData);

        return { success: true, id: docRef.id, message: 'Template created successfully' };
    } catch (error) {
        console.error('Error creating template:', error);
        return { success: false, error: 'Failed to create template' };
    }
}

