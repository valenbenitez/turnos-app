import { Timestamp } from 'firebase/firestore'

export interface Service {
  id?: string
  companyId: string
  name: string
  description?: string
  duration: number // duración en minutos
  price: number
  active: boolean
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export type CreateService = Omit<Service, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
