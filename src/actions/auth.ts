import { db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore"; // Import necessary functions


const auth = getAuth();

export async function signinAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  //Basic validation
  if (!email || !password) {
    return { success: false, error: 'Please fill in all fields.' };
  }

  try {
    console.log('Attempting to sign in with email:', email)
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log('User signed in successfully:', user)

    // Ensure the auth state is updated
    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          unsubscribe()
          resolve()
        }
      })
    })

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check user role
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return { success: false, error: 'User data not found.' };
    }
    const userData = userDoc.data();


    return {
      success: true,
      user: {
        email: user.email,
        role: userData.role,
        name: userData.name || 'Admin User'
      }
    }
  } catch (error: any) {
    console.error('Sign in failed:', error)
    return { success: false, error: error.message };
  }
}


async function fetchUserData(uid: string) {
  //This function is no longer needed since we fetch data directly from Firestore in signinAction
}

