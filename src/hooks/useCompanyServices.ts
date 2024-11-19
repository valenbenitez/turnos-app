import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Service, CreateService } from '@/models/service'

export const useCompanyServices = (companyId: string) => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadServices = async () => {
    setLoading(true)
    try {
      const servicesRef = collection(db, 'services')
      const q = query(servicesRef, where('companyId', '==', companyId), where('active', '==', true))

      const querySnapshot = await getDocs(q)
      const servicesData: Service[] = []

      querySnapshot.forEach(doc => {
        servicesData.push({
          id: doc.id,
          ...doc.data(),
        } as Service)
      })

      setServices(servicesData)
    } catch (err) {
      setError('Error al cargar los servicios')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createService = async (serviceData: CreateService) => {
    try {
      const servicesRef = collection(db, 'services')
      const newService = {
        ...serviceData,
        companyId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }

      const docRef = await addDoc(servicesRef, newService)
      return {
        id: docRef.id,
        ...newService,
      }
    } catch (err) {
      setError('Error al crear el servicio')
      throw err
    }
  }

  const updateService = async (serviceId: string, updates: Partial<Service>) => {
    try {
      const serviceRef = doc(db, 'services', serviceId)
      const updatedData = {
        ...updates,
        updatedAt: Timestamp.now(),
      }
      await updateDoc(serviceRef, updatedData)
      await loadServices() // Recargar servicios
    } catch (err) {
      setError('Error al actualizar el servicio')
      throw err
    }
  }

  useEffect(() => {
    loadServices()
  }, [companyId])

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    reloadServices: loadServices,
  }
}
