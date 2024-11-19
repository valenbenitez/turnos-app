'use client'
import { useState } from 'react'
import { auth } from '@/config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styles from './login.module.css'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential.user) {
                const token = await userCredential.user.getIdToken()
                // Calcular la expiración (por ejemplo, 1 hora)
                const expirationDate = new Date()
                expirationDate.setHours(expirationDate.getHours() + 1)
                // Establecer cookie con expiración
                document.cookie = `session=${token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict`

                router.push('/dashboard')
            }
        } catch (err) {
            console.error('Error de autenticación:', err)
            setError('Error al iniciar sesión. Verifica tus credenciales.')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1>Iniciar Sesión</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}