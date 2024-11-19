import { Timestamp } from 'firebase/firestore'

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Appointment {
  id?: string
  companyId: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  date: Timestamp
  duration: number // duración en minutos
  status: AppointmentStatus
  notes?: string
  service?: string
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export type CreateAppointment = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
