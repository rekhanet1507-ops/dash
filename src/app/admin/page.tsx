import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { approveUser } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await auth();

    if (session?.user?.role !== "admin") {
        return <div>Access Denied. Admins only.</div>;
    }

    const pendingUsers = await db.select().from(users).where(eq(users.isApproved, false));

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <h2 className="text-xl mb-4">Pending Approvals</h2>

            {pendingUsers.length === 0 ? (
                <p>No pending approvals.</p>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {pendingUsers.map((user) => (
                            <li key={user.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <form
                                    action={async () => {
                                        "use server";
                                        await approveUser(user.id);
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
