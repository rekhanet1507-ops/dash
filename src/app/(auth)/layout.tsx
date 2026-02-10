export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
                {children}
            </div>
        </div>
    );
}
