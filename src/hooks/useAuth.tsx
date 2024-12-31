
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }


    //   const register = async (email: string, password: string) => {
    //     setIsLoading(true);
    //     try {
    //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //       const user = userCredential.user;

    //       // Create a user document in Firestore
    //       await setDoc(doc(db, "users", user.uid), {
    //         email: user.email,
    //         name: email.split('@')[0],
    //         role: 'user',
    //         avatar: DEFAULT_AVATAR,
    //         createdAt: new Date(),
    //       });

    //       toast({
    //         title: "Account Created Successfully.",
    //         description: "Use your email and password to login again anytime.",
    //       });

    //       // Log the user in
    //       context.login({
    //         id: user.uid,
    //         email: user.email!,
    //         name: email.split('@')[0],
    //         role: 'user',
    //         avatar: DEFAULT_AVATAR
    //       });

    //       setIsLoading(false);
    //       return { success: true, user };
    //     } catch (error) {
    //       console.error("Registration error:", error);
    //       setIsLoading(false);
    //       toast({
    //         title: "Error",
    //         description: "Unable to create account right now.",
    //         variant: "destructive",
    //       });
    //       throw error;
    //     }
    //   };



    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                context.login({
                    id: user.uid,
                    email: user.email!,
                    name: userData.name,
                    role: userData.role,
                    avatar: userData.avatar
                });

                // toast({
                //     title: "Login Successful",
                //     description: `Welcome back, ${userData.name}!`,
                // });
            } else {
                throw new Error("User data not found");
            }

            setIsLoading(false);
            return { success: true, user };
        } catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            // toast({
            //     title: "Error",
            //     description: "Unable to log in. Please check your credentials and try again.",
            //     variant: "destructive",
            // });
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setIsLoading(false);
        } catch (error) {
            console.error("Password reset error:", error);
            setIsLoading(false);
            throw error;
        }
    };




    return {
        ...context,
        login, resetPassword,
        isLoading
    };
};

