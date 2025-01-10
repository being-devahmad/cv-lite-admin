// import { db } from "@/lib/firebase"

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserDetails(id: string) {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("data->", data)
            // const convertedData = convertTimestamps(data);

            return { success: true, data };
        } else {
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Failed to fetch User:', error);
        return { success: false, error: 'Failed to fetch User' };
    }
}