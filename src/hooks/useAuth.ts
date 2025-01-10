import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  const [authError, setAuthError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setAuthError(null); // Reset error state
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Retrieve and store token in session storage
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem('authToken', token);

      console.log('Token stored in session:', token);
      // Don't redirect here, let AuthContext handle it
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem('authToken');
      console.log('Token removed from session');
    } catch (err: any) {
      console.error('Sign out failed:', err);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!sessionStorage.getItem('authToken');
  };

  return { user, loading, error: authError || error, signIn, signOut, isAuthenticated };
}

