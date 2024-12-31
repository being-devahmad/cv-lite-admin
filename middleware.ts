import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import app from "@/lib/firebase";

// Initialize Firebase Auth
const auth = getAuth(app);

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const user = auth.currentUser;
    console.log("user--->", user)

    // If user is not authenticated, redirect to login page
    if (!user) {
        url.pathname = "/auth/signin"; // Redirect to the login page
        return NextResponse.redirect(url);
    }

    // Proceed to the requested route if authenticated
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/:path*"], // Add protected routes
};
