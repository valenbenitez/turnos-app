import { useState } from 'react'
import { collection, addDoc, updateDoc, doc, query, where, getDocs, Timestamp, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Appointment, CreateAppointment } from '@/models/appointment'

export const useAppointments = (companyId: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Crear un nuevo turno
  const createAppointment = async (appointmentData: CreateAppointment | any) => {
    setLoading(true)
    setError(null)
    console.log('appointmentData', appointmentData)
    try {
      const appointmentsRef = collection(db, 'appointments')

      // Crear el objeto de turno con los timestamps necesarios
      const newAppointment = {
        ...appointmentData,
        companyId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        // Convertir la fecha a Timestamp si no lo es ya
        date:
          appointmentData.date instanceof Timestamp
            ? appointmentData.date
            : Timestamp.fromDate(appointmentData.date as unknown as Date),
        // Crear un timestamp combinado de fecha y hora
        dateTime: Timestamp.fromDate(
          new Date(
            (appointmentData.date as unknown as Date).getFullYear(),
            (appointmentData.date as unknown as Date).getMonth(),
            (appointmentData.date as unknown as Date).getDate(),
            ...appointmentData.time.split(':').map(Number)
          )
        ),
      }

      const docRef = await addDoc(appointmentsRef, newAppointment)

      return {
        id: docRef.id,
        ...newAppointment,
      }
    } catch (err: any) {
      setError(err)
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
  const getAppointmentsByCompany = async (companyId: string) => {
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

  const getEmployeeAppointmentsByDate = async (employeeId: string, date: Date) => {
    setLoading(true)
    setError(null)
    try {
          const appointmentsRef = collection(db, 'appointments')

          // Crear timestamps para el inicio y fin del día
          const startOfDay = new Date(date)
          startOfDay.setHours(0, 0, 0, 0)
          const endOfDay = new Date(date)
          endOfDay.setHours(23, 59, 59, 999)

          const q = query(
            appointmentsRef,
            where('companyId', '==', companyId),
            where('employeeId', '==', employeeId),
            where('date', '>=', Timestamp.fromDate(startOfDay)),
            where('date', '<=', Timestamp.fromDate(endOfDay))
          )

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

  const deleteAppointment = async (appointmentId: string) => {
    setLoading(true)
    setError(null)
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId)
      await deleteDoc(appointmentRef)
      return true
    } catch (err) {
      setError('Error al eliminar el turno')
      console.error('Error deleting appointment:', err)
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
    getEmployeeAppointmentsByDate,
    deleteAppointment,
  }
}
