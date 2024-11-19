import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { User } from '@/models/user'

interface Schedule {
  [key: string]: {
    start: string
    end: string
    break?: {
      start: string
      end: string
    }
  }
}

const DEFAULT_SCHEDULE: Schedule = {
  monday: {
    start: '09:00',
    end: '18:00',
    break: {
      start: '13:00',
      end: '14:00',
    },
  },
  tuesday: {
    start: '09:00',
    end: '18:00',
    break: {
      start: '13:00',
      end: '14:00',
    },
  },
  wednesday: {
    start: '09:00',
    end: '18:00',
    break: {
      start: '13:00',
      end: '14:00',
    },
  },
  thursday: {
    start: '09:00',
    end: '18:00',
    break: {
      start: '13:00',
      end: '14:00',
    },
  },
  friday: {
    start: '09:00',
    end: '18:00',
    break: {
      start: '13:00',
      end: '14:00',
    },
  },
}

export const createTestEmployee = async (companyId: string, serviceIds: string[]) => {
  try {
    const employeeData: Omit<User, 'id'> = {
      companyId,
      name: 'Juan Pérez',
      email: 'juan.perez@test.com',
      role: 'employee',
      specialties: serviceIds, // IDs de los servicios que puede realizar
      schedule: DEFAULT_SCHEDULE,
      active: true,
      createdAt: Timestamp.now(),
    }

    const employeesRef = collection(db, 'users')
    const docRef = await addDoc(employeesRef, employeeData)

    console.log('Empleado de prueba creado con ID:', docRef.id)
    return {
      id: docRef.id,
      ...employeeData,
    }
  } catch (error) {
    console.error('Error al crear empleado de prueba:', error)
    throw error
  }
}

// Ejemplo de uso:
/*
const serviceIds = ['service1', 'service2'] // IDs de los servicios existentes
const companyId = 'company1' // ID de tu compañía
await createTestEmployee(companyId, serviceIds)
*/
