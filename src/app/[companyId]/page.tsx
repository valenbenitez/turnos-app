'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CompanyInfo } from './components/CompanyInfo'
import { ServiceSelection } from './components/ServiceSelection'
import { Stepper } from './components/Stepper'
import { NavigationButtons } from './components/NavigationButtons'
import { useCompanyDetails } from '@/hooks/useCompanyDetails'
import { Service } from '@/models/service'
import { BookingStep, BookingData, Step } from './utils/types'
import styles from './company.module.css'
import { User } from '@/models/user'
import { EmployeeSelection } from './components/EmployeeSelection'
import { createTestEmployee } from '@/test/createTestEmployee'

const STEPS: Step[] = [
    { id: 'company', label: 'Empresa' },
    { id: 'service', label: 'Servicio' },
    { id: 'employee', label: 'Profesional' },
    { id: 'datetime', label: 'Fecha y Hora' },
    { id: 'confirmation', label: 'Confirmación' }
]

export default function BookAppointment() {
    // Hooks y estado
    const params = useParams()
    const companyId = params.companyId as string
    const { company, users, loading, error } = useCompanyDetails(companyId)

    const [currentStep, setCurrentStep] = useState<BookingStep>('company')
    const [bookingData, setBookingData] = useState<BookingData>({
        companyId
    })

    // Handlers
    const handleServiceSelect = (service: Service) => {
        setBookingData(prev => ({
            ...prev,
            service
        }))
    }

    const handleEmployeeSelect = (employee: User) => {
        setBookingData(prev => ({
            ...prev,
            employee
        }))
    }

    const handleNextStep = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep)
        setCurrentStep(STEPS[currentIndex + 1].id as BookingStep)
    }

    const handlePreviousStep = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep)
        setCurrentStep(STEPS[currentIndex - 1].id as BookingStep)
    }

    // Crear un solo empleado
    const createSingleEmployee = async () => {
        try {
            const serviceIds = ['service1', 'service2'] // IDs de tus servicios existentes
            const employee = await createTestEmployee('tuCompanyId', serviceIds)
            console.log('Empleado creado:', employee)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Validaciones
    const canProceed = () => {
        switch (currentStep) {
            case 'company':
                return true
            case 'service':
                return !!bookingData.service
            case 'employee':
                return !!bookingData.employee
            default:
                return true
        }
    }

    // Renderizado condicional del contenido
    const renderStepContent = () => {
        switch (currentStep) {
            case 'company':
                return <CompanyInfo company={company} loading={loading} />
            case 'service':
                return (
                    <ServiceSelection
                        companyId={companyId}
                        onServiceSelect={handleServiceSelect}
                        selectedServiceId={bookingData.service?.id}
                    />
                )
            case 'employee':
                return bookingData.service ? (
                    <EmployeeSelection
                        employees={users}
                        selectedService={bookingData.service}
                        onEmployeeSelect={handleEmployeeSelect}
                        selectedEmployeeId={bookingData.employee?.id}
                        loading={loading}
                    />
                ) : null
            default:
                return null
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.bookingWrapper}>
                <h1 className={styles.title}>Reserva tu turno</h1>

                <Stepper steps={STEPS} currentStep={currentStep} />

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.content}>
                    {renderStepContent()}
                </div>

                <NavigationButtons
                    currentStep={currentStep}
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep}
                    canProceed={canProceed()}
                    loading={loading}
                    isFirstStep={currentStep === 'company'}
                    isLastStep={currentStep === 'confirmation'}
                />
            </div>
        </div>
    )
}