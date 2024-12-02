'use client'
import { useEffect } from 'react'
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user:any) => {
            if (!user) {
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                router.push('/login')
            } else {
                try {
                    const newToken = await user.getIdToken(true)
                    sessionStorage.setItem('accessToken', newToken)
                    sessionStorage.setItem('email', user.email)
                    document.cookie = `session=${newToken}; path=/`
                } catch (error) {
                    console.error('Error al renovar el token:', error)
                    router.push('/login')
                }
            }
        })

        return () => unsubscribe()
    }, [router])

    return <>{children}</>
}