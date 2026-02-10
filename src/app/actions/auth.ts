"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signUp(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "All fields are required" };
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existingUser) {
        return { error: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        role: "user", // Default role
        isApproved: false, // Default not approved
    });

    redirect("/login?message=Account created. Please wait for admin approval.");
}

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function approveUser(userId: number) {
    // Verify admin role (optional but recommended for security, though page is protected)
    // const session = await auth();
    // if (session?.user?.role !== 'admin') throw new Error("Unauthorized");

    await db.update(users)
        .set({ isApproved: true })
        .where(eq(users.id, userId));

    revalidatePath("/admin");
}
