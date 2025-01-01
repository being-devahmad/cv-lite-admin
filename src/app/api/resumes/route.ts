import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
    try {
        const resumesCollection = collection(db, 'resumes'); // Reference to 'resumes' collection
        const resumesSnapshot = await getDocs(resumesCollection); // Fetch all documents
        const resumes = resumesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("resumes-->", resumes);

        return NextResponse.json(resumes); // Return the resumes as JSON
    } catch (error) {
        console.error('Error fetching resumes:', error);
        return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
    }
}
