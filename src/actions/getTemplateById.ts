'use server'

import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

function convertTimestamps(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }

  for (const key in obj) {
    obj[key] = convertTimestamps(obj[key]);
  }

  return obj;
}

export async function getTemplateById(id: string) {
  try {
    const docRef = doc(db, 'templates', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const convertedData = convertTimestamps(data);
      return { success: true, data: { id: docSnap.id, ...convertedData } };
    } else {
      return { success: false, error: 'Template not found' };
    }
  } catch (error) {
    console.error('Failed to fetch template:', error);
    return { success: false, error: 'Failed to fetch template' };
  }
}

