'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export async function deleteTemplate(id: string) {
  try {
    const templateRef = doc(db, 'templates', id)
    await deleteDoc(templateRef)

    // Revalidate the templates page to reflect the changes
    revalidatePath('/templates')

    return { success: true, message: 'Template deleted successfully' }
  } catch (error) {
    console.error('Error deleting template:', error)
    return { success: false, message: 'Failed to delete template. Please try again.' }
  }
}
