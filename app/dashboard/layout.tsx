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
        <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
                {children}
            </div>
        </div>
    );
}
