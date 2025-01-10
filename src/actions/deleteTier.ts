'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export async function deleteTier(id: string) {
  try {
    const tierRef = doc(db, 'tiers', id)
    await deleteDoc(tierRef)

    // Revalidate the tiers page to reflect the changes
    revalidatePath('/tiers')

    return { success: true, message: 'Tier deleted successfully' }
  } catch (error) {
    console.error('Error deleting tier:', error)
    return { success: false, message: 'Failed to delete tier. Please try again.' }
  }
}
