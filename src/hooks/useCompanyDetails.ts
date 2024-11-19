import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Company } from '@/models/company'
import { User } from '@/models/user'

export const useCompanyDetails = (companyId: string) => {
  const [company, setCompany] = useState<Company | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        // Obtener datos de la compañía usando query
        const companiesRef = collection(db, 'companies')
        const companyQuery = query(companiesRef, where('id', '==', companyId))
        const companySnap = await getDocs(companyQuery)

        if (companySnap.empty) {
          throw new Error('Compañía no encontrada')
        }

        // Obtener el primer (y único) documento
        const companyDoc = companySnap.docs[0]
        setCompany({
          id: companyDoc.id,
          ...companyDoc.data(),
        } as Company)

        // Obtener usuarios de la compañía
        const usersRef = collection(db, 'users')
        const usersQuery = query(usersRef, where('companyId', '==', companyId))
        const usersSnap = await getDocs(usersQuery)

        const usersData: User[] = []
        usersSnap.forEach(doc => {
          usersData.push({
            id: doc.id,
            ...doc.data(),
          } as User)
        })

        setUsers(usersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos')
        console.error('Error loading company details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (companyId) {
      loadCompanyData()
    }
  }, [companyId])

  return { company, users, loading, error }
}
