'use server'

import { db } from "@/lib/firebase"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

export async function updateProfile(prevState: any, formData: FormData) {
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const phone = formData.get('phoneNumber') as string
    const email = formData.get('emailAddress') as string
    const city = formData.get('City') as string
    const country = formData.get('Country') as string

    // Validate required fields
    if (!userId || !name || !email) {
        return {
            message: 'User ID, name, and email are required',
            success: false
        }
    }

    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            name,
            phone,
            email,
            city,
            country,
            updatedAt: serverTimestamp(),
        });
        console.log("Profile updated successfully for user:", userId);
        return { message: 'Profile updated successfully', success: true }
    } catch (error) {
        console.error('Error updating profile:', error)
        return { message: 'Failed to update profile', success: false }
    }
}
