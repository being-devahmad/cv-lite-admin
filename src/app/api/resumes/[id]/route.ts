import { NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Params {
  params: {
    id: string; // User ID to filter resumes
  };
}

// Fetch resumes by User ID (GET)
export async function GET(req: Request, { params }: Params) {
  const { id } = params; // Extracting the user ID from the request params
  console.log("userId is -->",id)
  if (!id) {
    console.error('User ID is missing');
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const resumesCollection = collection(db, 'resumes'); // Reference to the resumes collection
    const q = query(resumesCollection, where('userId', '==', id)); // Query to filter resumes by id

    console.log("Query constructed:", q);

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No resumes found for user ID: ${id}`);
      return NextResponse.json(
        { error: 'No resumes found for this user' },
        { status: 404 }
      );
    }

    const resumes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Resumes fetched:', resumes);

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}
