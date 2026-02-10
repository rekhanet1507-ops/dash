"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <form action={dispatch} className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-2 border rounded"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="p-2 border rounded"
            />
            <div className="text-red-500 text-sm h-4">{errorMessage}</div>
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Log in
            </button>
            <p className="text-center text-sm">
                Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
            </p>
        </form>
    );
}
