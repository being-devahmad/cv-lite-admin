'use server'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function createInitialAdmin(prevState: any, formData: FormData) {
    try {
        const adminsCollection = collection(db, 'users');

        const adminData = {
            email: formData.get('email'),
            password: formData.get('password'),
            role: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(adminsCollection, adminData);

        return { success: true, id: docRef.id, message: 'admin created successfully' };
    } catch (error) {
        console.error('Error creating admin:', error);
        return { success: false, error: 'Failed to create admin' };
    }
}

