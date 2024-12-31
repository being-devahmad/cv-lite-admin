import { auth, db } from "@/lib/firebase";
import { AuthState, User } from "@/types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType extends AuthState {
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
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
                }
            } else {
                setAuthState({ user: null, isAuthenticated: false });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (user: User) => {
        setAuthState({ user, isAuthenticated: true });
    };

    const logout = () => {
        setAuthState({ user: null, isAuthenticated: false });
    };

    if (loading) {
        return (
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            </>
        )
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
};
