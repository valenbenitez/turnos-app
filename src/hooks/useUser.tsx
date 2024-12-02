import { useState } from 'react'
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { User } from '@/models/user'

export const useUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const getUserByEmail = async (email: string): Promise<User | null> => {
        setLoading(true)
        setError(null)
        try {
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('email', '==', email))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                return null
            }

            const userDoc = querySnapshot.docs[0]
            setUser(userDoc.data() as User)
            return {
                id: userDoc.id,
                ...userDoc.data()
            } as User
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al obtener el usuario'
            setError(errorMessage)
            console.error('Error getting user:', err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updateUser = async (userId: string, updates: Partial<User>): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            const userRef = doc(db, 'users', userId)
            
            // Verificar si el usuario existe
            const userDoc = await getDoc(userRef)
            if (!userDoc.exists()) {
                throw new Error('Usuario no encontrado')
            }

            await updateDoc(userRef, {
                ...updates,
                updatedAt: new Date()
            })

            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el usuario'
            setError(errorMessage)
            console.error('Error updating user:', err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        getUserByEmail,
        updateUser,
        loading,
        error,
        user
    }
}
