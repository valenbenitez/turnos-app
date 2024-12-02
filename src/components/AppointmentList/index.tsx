'use client'
import { useEffect, useState } from 'react'
import { Appointment } from '@/models/appointment'
import { Timestamp } from 'firebase/firestore'
import { AppointmentCard } from '../AppointmentCard'
import { useAppointments } from '@/hooks/useAppointment'
import styles from './appointmentList.module.css'

interface AppointmentListProps {
    companyId: string
    title?: string
    emptyMessage?: string
    filterByDate?: (appointment: Appointment) => boolean
}

export function AppointmentList({
    companyId,
    title = "Turnos",
    emptyMessage = "No hay turnos para mostrar",
    filterByDate
}: AppointmentListProps) {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const { getAppointmentsByCompany, loading, error } = useAppointments(companyId)

    useEffect(() => {
        const loadAppointments = async () => {
            if (companyId) {
                const data = await getAppointmentsByCompany(companyId)
                setAppointments(filterByDate ? data.filter(filterByDate) : data)
            }
        }

        loadAppointments()
    }, [companyId, filterByDate])

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error: {error}</div>

    // Ordenar appointments por fecha y hora
    const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = (a.date as unknown as Timestamp).toDate()
        const dateB = (b.date as unknown as Timestamp).toDate()
        const timeA = a.time
        const timeB = b.time

        // Primero comparar por fecha
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime()
        }

        // Si la fecha es igual, comparar por hora
        return timeA.localeCompare(timeB)
    })

    return (
        <div className={styles.appointmentListContainer}>
            {title && <h2 className={styles.listTitle}>{title}</h2>}
            <div className={styles.appointmentsList}>
                {sortedAppointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        // TODO: Add actions
                    />
                ))}
                {sortedAppointments.length === 0 && (
                    <p className={styles.emptyMessage}>
                        {emptyMessage}
                    </p>
                )}
            </div>
        </div>
    )
}