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
    <main className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-500 mb-8">Here's what's happening with your budget today.</p>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">$0.00</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Income</h3>
            <p className="text-3xl font-bold text-green-600">$0.00</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Expenses</h3>
            <p className="text-3xl font-bold text-red-500">$0.00</p>
          </div>
        </div>
      </div>
    </main>
  )
}
