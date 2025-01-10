'use server';

import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function updateUser(userId: string, formData: FormData) {
    try {
      console.log("Received userId:", userId); // Log userId
  
      if (typeof userId !== "string" || userId.trim() === "") {
        console.error("Invalid userId:", userId);
        return { success: false, error: "Invalid user ID" };
      }
  
      const userDoc = doc(db, 'users', userId); // Reference to the specific user document
  
      const docSnap = await getDoc(userDoc);
      if (!docSnap.exists()) {
        console.log("User document does not exist:", userId);
        return { success: false, error: "User does not exist" };
      }
  
      const updatedData: Record<string, any> = {
        updatedAt: serverTimestamp(),
      };
  
      ['firstName', 'lastName', 'email', 'password', 'role'].forEach((field) => {
        const value = formData.get(field);
        if (value) {
          updatedData[field] = value;
          console.log(`Updating field: ${field} with value: ${value}`);
        }
      });
  
      await updateDoc(userDoc, updatedData); // Update the document
  
      console.log("User updated successfully.");
      return { success: true, message: 'User updated successfully' };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Failed to update user' };
    }
  }
  
