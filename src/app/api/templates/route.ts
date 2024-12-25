import { NextResponse } from 'next/server';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
    try {
        const templatesCollection = collection(db, 'templates');
        const templatesSnapshot = await getDocs(templatesCollection);
        const templates = templatesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("templates-->", templates)

        return NextResponse.json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }
}
