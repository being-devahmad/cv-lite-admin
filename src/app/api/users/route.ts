import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
    try {
        // const authHeader = request.headers.get('Authorization');
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        // }

        // const idToken = authHeader.split('Bearer ')[1];
        // const decodedToken = await auth.verifyIdToken(idToken);
        // const currentUserId = decodedToken.uid;

        // console.log("currentUserId-->", currentUserId)


        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // console.log("users-->", users)

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

