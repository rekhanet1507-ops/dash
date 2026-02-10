"use client";

import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

export default function SignUpPage() {
    const [state, dispatch, isPending] = useActionState(signUp, undefined);

    return (
        <form action={dispatch} className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="p-2 border rounded"
            />
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
            {state?.error && (
                <div className="text-red-500 text-sm">{state.error}</div>
            )}
            <button
                type="submit"
                disabled={isPending}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
                {isPending ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-center text-sm">
                Already have an account? <a href="/login" className="text-blue-500">Log in</a>
            </p>
        </form>
    );
}
