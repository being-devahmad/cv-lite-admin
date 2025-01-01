'use client'

import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { signinAction } from '@/actions/auth'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50"
    >
      {pending ? 'Signing In...' : 'Sign In'}
    </button>
  )
}

export default function SigninWithPassword() {
  const [state, formAction] = useFormState(signinAction, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      console.log('Signin successful, redirecting to dashboard')
      router.push('/')
    }
  }, [state?.success, router])

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          Sign in successful! Redirecting...
        </div>
      )}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <SubmitButton />
    </form>
  )
}

