'use client'
import { redirect } from 'next/navigation'
import RegisterUser from './registerUser/page'
export default function Home() {
  return redirect('/registerUser')
}
