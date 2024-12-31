'use server'

import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const SigninSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
})

export async function signinAction(prevState: any, formData: FormData) {
  const validatedFields = SigninSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.errors.map(err => err.message).join(', ')
    }
  }

  const { email, password } = validatedFields.data

  try {
    console.log('Attempting to sign in with email:', email)
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log('User signed in successfully:', user.uid)

    // Check user role
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    
    if (!userDoc.exists()) {
      console.log('User document not found in Firestore')
      await auth.signOut()
      return { error: 'User data not found. Please contact support.' }
    }

    const userData = userDoc.data()
    console.log('User data from Firestore:', userData)

    if (!userData || userData.role !== 'admin') {
      console.log('User is not an admin. Role:', userData?.role)
      await auth.signOut()
      return { error: 'Access denied. Admin rights required.' }
    }

    // // Set a session cookie
    // const idToken = await user.getIdToken()
    // const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    
    // // Note: createSessionCookie is a server-side operation and might not be available in the client
    // // You may need to create an API route to handle this part
    // const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    
    // cookies().set('session', sessionCookie, {
    //   maxAge: expiresIn,
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   path: '/',
    // })

    // console.log('Session cookie set successfully')

    return { 
      success: true, 
      user: { 
        email: user.email, 
        role: userData.role,
        name: userData.name || 'Admin User'
      } 
    }
  } catch (error: any) {
    console.error('Signin error:', error)

    if (error.code === 'auth/invalid-credential') {
      return { error: 'Invalid email or password. Please check your credentials and try again.' }
    } else if (error.code === 'auth/user-not-found') {
      return { error: 'User not found. Please check your email or sign up for a new account.' }
    } else if (error.code === 'auth/too-many-requests') {
      return { error: 'Too many failed login attempts. Please try again later or reset your password.' }
    } else {
      return { error: `An unexpected error occurred: ${error.message}. Please try again or contact support.` }
    }
  }
}

