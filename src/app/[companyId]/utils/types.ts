import { Service } from '@/models/service'
import { User } from '@/models/user'

export type BookingStep = 'company' | 'service' | 'employee' | 'datetime' | 'confirmation'

export interface BookingData {
  companyId: string
  service?: Service
  employee?: User
  date?: Date
  time?: string
  clientName?: string
  clientPhone?: string
  clientEmail?: string
}

export interface Step {
  id: BookingStep
  label: string
}
