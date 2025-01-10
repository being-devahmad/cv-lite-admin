import { NextResponse } from 'next/server';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
    try {
        const tiersCollection = collection(db, 'tiers');
        const tiersSnapshot = await getDocs(tiersCollection);
        const tiers = tiersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("tiers-->", tiers)

        return NextResponse.json(tiers);
    } catch (error) {
        console.error('Error fetching tiers:', error);
        return NextResponse.json({ error: 'Failed to fetch tiers' }, { status: 500 });
    }
}
