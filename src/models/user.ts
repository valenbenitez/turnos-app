import { Timestamp } from 'firebase/firestore'

export interface User {
  id?: string
  companyId: string
  email?: string
  name: string
  role: 'admin' | 'employee' // podemos expandir roles si es necesario
  createdAt: Timestamp
  lastLogin?: Timestamp
  specialties?: string[] // Servicios que puede realizar
  schedule?: {
    [key: string]: {
      // 'monday', 'tuesday', etc.
      start: string // "09:00"
      end: string // "18:00"
      break?: {
        start: string
        end: string
      }
    }
  }
  active: boolean
}

// Tipo para crear un nuevo usuario
export type CreateUser = Omit<User, 'id' | 'createdAt' | 'lastLogin'> & {
  createdAt?: Timestamp
  lastLogin?: Timestamp
}
