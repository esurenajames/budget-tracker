import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './components/DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <main className="flex-1 p-6 md:p-8 bg-background min-h-screen">
      <DashboardClient userEmail={user.email} />
    </main>
  );
}
