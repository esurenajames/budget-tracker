'use client';

import { useState } from 'react';
import { Wallet, PiggyBank, CreditCard, TrendingUp, Target, History, Plus, ArrowUpRight, ArrowDownRight, Eye, EyeOff, Calendar, Zap, Car, Coffee, ShoppingBag } from 'lucide-react';

interface DashboardClientProps {
  userEmail?: string;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const [totalVisible, setTotalVisible] = useState(true);
  const [accountVisibility, setAccountVisibility] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true
  });

  const accounts = [
    { title: 'Savings', balance: '$12,450.00', icon: PiggyBank, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Emergency Fund', balance: '$5,000.00', icon: Wallet, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Investments', balance: '$24,800.00', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Credit Card', balance: '-$1,200.00', icon: CreditCard, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  const goals = [
    { title: 'New House', target: '$50,000', current: '$12,000', progress: 24 },
    { title: 'Vacation', target: '$5,000', current: '$4,200', progress: 84 },
    { title: 'New Car', target: '$30,000', current: '$5,000', progress: 16 },
  ];

  const transactions = [
    { title: 'Apple Store', category: 'Technology', amount: '-$1,299.00', date: 'Today', type: 'expense' },
    { title: 'Salary Refresh', category: 'Income', amount: '+$5,400.00', date: 'Today', type: 'income' },
    { title: 'Starbucks', category: 'Food & Drinks', amount: '-$12.50', date: 'Yesterday', type: 'expense' },
    { title: 'Netflix Subscription', category: 'Entertainment', amount: '-$15.99', date: 'March 10', type: 'expense' },
  ];

  const dailyBudgets = [
    { category: 'Transportation', spent: 50, limit: 300, icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { category: 'Food & Drinks', spent: 85, limit: 150, icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { category: 'Shopping', spent: 0, limit: 100, icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const toggleAccount = (index: number) => {
    setAccountVisibility(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Dashboard</h1>
          <p className="text-text-info mt-1">Welcome back, {userEmail?.split('@')[0]}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium interactive-item hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Main Balance Area */}
        <div className="area-balance">
          <div className="h-full rounded-3xl border border-border bg-background p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet size={120} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold text-text-info uppercase tracking-widest">Total Balance</h3>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-5xl font-bold text-text tracking-tight transition-all duration-300">
                  {totalVisible ? '$41,050.00' : '••••••'}
                </p>
                <button 
                  onClick={() => setTotalVisible(!totalVisible)}
                  className="p-2 rounded-xl hover:bg-neutral text-text-info hover:text-accent-1 transition-all border border-transparent hover:border-border"
                  title={totalVisible ? "Hide Balance" : "Show Balance"}
                >
                  {totalVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="flex items-center gap-2 text-green-600 bg-green-500/10 px-3 py-1 rounded-lg text-sm font-medium">
                <ArrowUpRight size={16} />
                <span>+12.5%</span>
              </div>
              <div className="text-text-info text-sm flex items-center">
                vs last month
              </div>
            </div>
          </div>
        </div>

        {/* Account Cards Area */}
        <div className="area-cards flex flex-col">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Wallet size={20} className="text-accent-1" />
              My Accounts
            </h3>
            <button className="text-accent-1 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {accounts.map((acc, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-5 shadow-sm interactive-item flex flex-col justify-center relative group overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <div className={`${acc.bg} ${acc.color} p-2.5 rounded-xl`}>
                    <acc.icon size={20} />
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAccount(i);
                    }}
                    className="p-1.5 rounded-lg hover:bg-neutral text-text-info hover:text-accent-1 transition-all opacity-0 group-hover:opacity-100"
                  >
                    {accountVisibility[i] ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <h4 className="text-text-info text-xs font-semibold uppercase tracking-wider">{acc.title}</h4>
                <p className="text-xl font-bold text-text mt-1 transition-all duration-300">
                  {accountVisibility[i] ? acc.balance : '••••••'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Area */}
        <div className="area-goals">
          <div className="h-full rounded-3xl border border-border bg-background p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Target size={18} className="text-accent-1" />
                Saving Goals
              </h3>
              <button className="text-accent-1 text-xs font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {goals.slice(0, 2).map((goal, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-text">{goal.title}</span>
                    <span className="text-text-info">{goal.current}</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-1 rounded-full transition-all duration-1000" 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Expenses Area */}
        <div className="area-daily">
          <div className="h-full rounded-3xl border border-border bg-background p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                Daily Budgets
              </h3>
              <Calendar size={18} className="text-text-info" />
            </div>
            <div className="space-y-5">
              {dailyBudgets.map((budget, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`${budget.bg} ${budget.color} p-1.5 rounded-lg`}>
                        <budget.icon size={14} />
                      </div>
                      <span className="text-xs font-bold text-text">{budget.category}</span>
                    </div>
                    <span className="text-xs font-medium text-text-info">
                      <span className="text-text font-bold">${budget.spent}</span> / ${budget.limit}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${budget.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000`} 
                      style={{ width: `${(budget.spent / budget.limit) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-border flex justify-between items-center mt-6">
              <div className="text-xs text-text-info">
                Total Spent Today
              </div>
              <div className="text-sm font-extrabold text-rose-500">
                ${dailyBudgets.reduce((acc, curr) => acc + curr.spent, 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Area */}
        <div className="area-transactions">
          <div className="rounded-3xl border border-border bg-background shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center bg-neutral/50">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <History size={20} className="text-primary" />
                Recent Transactions
              </h3>
              <div className="flex gap-2">
                <button className="text-accent-1 text-sm font-medium hover:underline px-2">Download Report</button>
              </div>
            </div>
            <div className="divide-y divide-border">
              {transactions.map((t, i) => (
                <div key={i} className="p-4 hover:bg-neutral transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-text group-hover:text-accent-1 transition-colors">{t.title}</p>
                      <p className="text-xs text-text-info">{t.category} • {t.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-lg ${t.type === 'income' ? 'text-green-600' : 'text-text'} transition-all duration-300`}>
                    {totalVisible ? t.amount : '••••••'}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full p-4 text-center text-sm font-medium text-text-info hover:text-primary hover:bg-neutral transition-all border-t border-border">
              View Transaction History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
