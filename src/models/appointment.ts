import { Timestamp } from 'firebase/firestore'

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Appointment {
  id: string
  companyId: string
  serviceId: string
  employeeId: string
  employeeName: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  date: Timestamp
  time: string
  status: AppointmentStatus
  duration: number
  price: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type CreateAppointment = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
