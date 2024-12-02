import { Service } from '@/models/service'
import { User } from '@/models/user'

export type BookingStep = 'company' | 'service' | 'employee' | 'datetime' | 'client' | 'confirmation'

export interface ClientData {
    name: string
    email: string
    phone: string
}

export interface BookingData {
    companyId: string
    service?: Service
    employee?: User
    dateTime?: {
        date: Date
        time: string
    }
    clientData?: ClientData
}

export interface Step {
  id: BookingStep
  label: string
}
