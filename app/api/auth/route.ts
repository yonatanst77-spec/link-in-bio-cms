import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    // HARDCODED CREDENTIALS
    if (username === "John" && password === "Admin@1234") {
        const cookieStore = await cookies();
        cookieStore.set("auth-session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("auth-session");
    return NextResponse.json({ success: true });
}
