import { useState } from 'react'
import { collection, addDoc, updateDoc, doc, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Appointment, CreateAppointment } from '@/models/appointment'

export const useAppointments = (companyId: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Crear un nuevo turno
  const createAppointment = async (appointmentData: CreateAppointment) => {
    setLoading(true)
    setError(null)
    try {
      const appointmentsRef = collection(db, 'appointments')
      const newAppointment = {
        ...appointmentData,
        companyId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }

      const docRef = await addDoc(appointmentsRef, newAppointment)
      return {
        id: docRef.id,
        ...newAppointment,
      }
    } catch (err) {
      setError('Error al crear el turno')
      console.error('Error creating appointment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Actualizar un turno existente
  const updateAppointment = async (appointmentId: string, updates: Partial<Appointment>) => {
    setLoading(true)
    setError(null)
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId)
      const updatedData = {
        ...updates,
        updatedAt: Timestamp.now(),
      }
      await updateDoc(appointmentRef, updatedData)
      return true
    } catch (err) {
      setError('Error al actualizar el turno')
      console.error('Error updating appointment:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Obtener todos los turnos de una compañía
  const getAppointmentsByCompany = async () => {
    setLoading(true)
    setError(null)
    try {
      const appointmentsRef = collection(db, 'appointments')
      const q = query(appointmentsRef, where('companyId', '==', companyId), orderBy('date', 'desc'))

      const querySnapshot = await getDocs(q)
      const appointments: Appointment[] = []

      querySnapshot.forEach(doc => {
        appointments.push({
          id: doc.id,
          ...doc.data(),
        } as Appointment)
      })

      return appointments
    } catch (err) {
      setError('Error al obtener los turnos')
      console.error('Error fetching appointments:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createAppointment,
    updateAppointment,
    getAppointmentsByCompany,
    loading,
    error,
  }
}
