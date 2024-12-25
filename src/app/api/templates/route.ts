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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const templatesCollection = collection(db, 'templates');

        // Add the new template to Firestore
        const docRef = await addDoc(templatesCollection, body);

        console.log("New template added with ID: ", docRef.id);

        // Return the new template's ID
        return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
    } catch (error) {
        console.error('Error creating template:', error);
        return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }
}