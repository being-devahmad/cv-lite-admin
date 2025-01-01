import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params; // Extracting the user ID from the request params

  try {
    const userDoc = doc(db, 'users', id); // Reference to the specific user document
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };

    // console.log('User data:', userData);

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
