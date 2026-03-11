import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-text mb-2">Welcome Back!</h1>
        <p className="text-text-info mb-8 text-lg">Here's what's happening with your budget today.</p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
            <h3 className="text-xs font-bold text-text-info uppercase tracking-widest mb-4">Total Balance</h3>
            <p className="text-4xl font-bold text-text">$0.00</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
            <h3 className="text-xs font-bold text-text-info uppercase tracking-widest mb-4">Income</h3>
            <p className="text-4xl font-bold text-green-600">$0.00</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
            <h3 className="text-xs font-bold text-text-info uppercase tracking-widest mb-4">Expenses</h3>
            <p className="text-4xl font-bold text-red-500">$0.00</p>
          </div>
        </div>
      </div>
    </main>
  )
}
