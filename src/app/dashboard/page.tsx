import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name}</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <p>This is the user dashboard. You are logged in as a <strong>{session?.user?.role}</strong>.</p>
            </div>
        </div>
    );
}
