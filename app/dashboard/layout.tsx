import Sidebar from '@/components/shared/Sidebar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Optionally pre-validate here, but middleware handles it
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background transition-colors duration-300">
            <Sidebar />
            <div className="flex flex-col p-8 flex-1 min-w-0 relative">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
