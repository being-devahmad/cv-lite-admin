// 'use server'

// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export async function createUser(prevState: any, formData: FormData) {
//     try {
//         const usersCollection = collection(db, 'users');

//         const userData = {
//             firstName: formData.get('firstName'),
//             lastName: formData.get('lastName'),
//             email: formData.get('email'),
//             password: formData.get('password'),
//             role: formData.get('role'),
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp()
//         };

//         const docRef = await addDoc(usersCollection, userData);

//         return { success: true, id: docRef.id, message: 'User created successfully' };
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return { success: false, error: 'Failed to create user' };
//     }
// }

'use server'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/lib/firebase';

export async function createUser(prevState: any, formData: FormData) {
    try {
        const auth = getAuth();

        // Firebase Authentication
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const authUser = await createUserWithEmailAndPassword(auth, email, password);

        // Firestore
        const usersCollection = collection(db, 'users');
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email,
            role: formData.get('role'),
            uid: authUser.user.uid, // Store Firebase Authentication UID
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(usersCollection, userData);

        return { success: true, id: docRef.id, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}
