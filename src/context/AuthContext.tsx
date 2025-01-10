'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { auth, db } from "@/lib/firebase";
import { User } from "@/types";
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (user: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data() as User;
                        setAuthState({
                            user: {
                                id: firebaseUser.uid,
                                email: firebaseUser.email!,
                                name: userData.name,
                                role: userData.role,
                                avatar: userData.avatar
                            },
                            isAuthenticated: true
                        });
                        // User exists, safe to redirect
                        router.push('/');
                    } else {
                        console.error("User document does not exist in Firestore");
                        setAuthState({ user: null, isAuthenticated: false });
                        router.push('/auth/signin');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setAuthState({ user: null, isAuthenticated: false });
                    router.push('/auth/signin');
                }
            } else {
                setAuthState({ user: null, isAuthenticated: false });
                router.push('/auth/signin');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const login = (user: User) => {
        setAuthState({ user, isAuthenticated: true });
        // Don't redirect here, let the effect handle it
    };

    const logout = async () => {
        try {
            await auth.signOut();
            sessionStorage.removeItem('authToken');
            setAuthState({ user: null, isAuthenticated: false });
            router.push('/auth/signin');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

