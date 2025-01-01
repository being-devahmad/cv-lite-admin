import { NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Params {
  params: {
    userId: string; // User ID to filter resumes
  };
}

// Fetch resumes by User ID (GET)
export async function GET(req: Request, { params }: Params) {
  const { userId } = params; // Extracting the user ID from the request params
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }
  try {
    const resumesCollection = collection(db, 'resumes'); // Reference to the resumes collection
    const q = query(resumesCollection, where('userId', '==', userId)); // Query to filter resumes by userId
    console.log("testing2:",q)
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'No resumes found for this user' },
        { status: 404 }
      );
    }

    const resumes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Resumes:', resumes);

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}
