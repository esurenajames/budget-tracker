'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button, notification } from 'antd'
import { createClient } from '@/utils/supabase/client'
import StackIcon from 'tech-stack-icons'
import Image from 'next/image'
import backgroundImage from '@/assets/bg.webp'

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (error === 'auth') {
      notification.error({
        message: 'Login Error',
        description: 'You are not authorized to access this application.',
        placement: 'topRight',
      })
    }
  }, [error])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in:', error.message)
      setIsLoading(false)
      notification.error({
        message: 'Login Error',
        description: error.message,
        placement: 'topRight',
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex w-full md:w-1/2 lg:w-[45%] flex-col justify-between p-8 sm:p-12 relative z-10 border-r border-border">
        <div>
          <Link href="/" className="flex items-center gap-2 group w-max">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <span className="text-white font-bold text-xs">BT</span>
            </div>
            <span className="text-xl font-bold text-text tracking-tight">
              Budget Tracker
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center w-full max-w-[420px] mx-auto text-center">
          <h1 className="text-4xl font-bold text-text mb-4 tracking-tight">Login your account</h1>
          <p className="text-text-info mb-10 text-lg">
            Welcome back! Please login with your Google account to access the system.
          </p>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleGoogleLogin}
              size="large"
              loading={isLoading}
              className="flex items-center justify-center w-full gap-3 px-4 py-6 border border-border bg-neutral rounded-xl hover:bg-white hover:border-accent-1 transition-all font-semibold text-text shadow-sm"
            >
              {!isLoading && <StackIcon name="google" className="w-5 h-5 flex-shrink-0" />}
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-text-info/60 font-medium">
          <span>Copyright © {new Date().getFullYear()} Budget Tracker</span>
          <Link href="#" className="hover:text-text transition-colors">Privacy Policy</Link>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 lg:w-[55%] bg-linear-to-br from-accent-1 to-primary relative overflow-hidden flex-col justify-center px-12 lg:px-24 text-white">
        <div className="relative z-10 w-full max-w-xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
            Manage your finances and budget.
          </h2>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed mb-12 opacity-90">
            Log in to access your budget tracker and keep your finances in check.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
