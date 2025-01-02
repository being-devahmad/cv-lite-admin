'use server'

import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/lib/firebase';

export async function createUser(prevState: any, formData: FormData) {
    try {
        const auth = getAuth();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Create user in Firebase Authentication
        const authUser = await createUserWithEmailAndPassword(auth, email, password);

        // Save user data in Firestore with UID as document ID
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email,
            role: formData.get('role'),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await setDoc(doc(db, 'users', authUser.user.uid), userData);

        return { success: true, uid: authUser.user.uid, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}
