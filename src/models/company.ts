import { Timestamp } from 'firebase/firestore'

export interface ContactInfo {
  phone: string
  email: string
}

export interface Company {
  id?: string
  name: string
  address: string
  contactInfo: ContactInfo
  createdAt: Timestamp
}

// Tipo para crear una nueva compañía (sin id y con createdAt opcional)
export type CreateCompany = Omit<Company, 'id' | 'createdAt'> & {
  createdAt?: Timestamp
}
