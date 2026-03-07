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
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full md:w-1/2 lg:w-[45%] flex-col justify-between p-8 sm:p-12 relative z-10">
        <div>
          <Link href="/" className="flex items-center gap-2 group w-max">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <span className="text-white font-bold text-xs">BT</span>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">
              Budget Tracker
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center w-full max-w-[420px] mx-auto text-center">
          <h1 className="text-[34px] font-bold text-gray-900 mb-2.5 tracking-tight">Login your account</h1>
          <p className="text-gray-500 mb-10 text-[15px]">
            Welcome back! Please login with your Google account to access the system.
          </p>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleGoogleLogin}
              size="large"
              loading={isLoading}
              className="flex items-center justify-center w-full gap-3 px-4 py-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 hover:border-gray-300 shadow-sm"
            >
              {!isLoading && <StackIcon name="google" className="w-5 h-5 flex-shrink-0" />}
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center text-[13px] text-gray-400 font-medium">
          <span>Copyright © 2025 Budget Tracker</span>
          <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 lg:w-[55%] bg-accent-1 relative overflow-hidden flex-col justify-center px-12 lg:px-24 text-white">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover opacity-20 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />

        <div className="relative z-10 w-full max-w-xl">
          <h2 className="text-[40px] lg:text-[46px] font-bold mb-6 leading-[1.15] tracking-tight text-white">
            Manage your finances and budget.
          </h2>
          <p className="text-blue-100 text-[18px] lg:text-[19px] leading-relaxed mb-12 opacity-90">
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
