'use client'
import { AppointmentList } from '@/components/AppointmentList'
import { useUser } from '@/hooks/useUser'
import { Appointment } from '@/models/appointment'
import { Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.css'

export default function Dashboard() {
    const { user, getUserByEmail } = useUser()
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email')
        setEmail(storedEmail)
    }, [])

    useEffect(() => {
        email && getUserByEmail(email)
    }, [email])

    const todayFilter = (appointment: Appointment) => {
        const appointmentDate = (appointment.date as unknown as Timestamp).toDate()
        const today = new Date()
        return appointmentDate.toDateString() === today.toDateString()
    }

    // Filtro para próximos turnos (excluyendo hoy)
    const upcomingFilter = (appointment: Appointment) => {
        const appointmentDate = (appointment.date as unknown as Timestamp).toDate()
        const today = new Date()
        today.setHours(23, 59, 59, 999) // Final del día actual
        return appointmentDate > today
    }

    if (!user) return <div>Loading...</div>

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <h1>{user.companyId}</h1>
                <p>Bienvenido, {user.name}</p>
            </header>

            <AppointmentList
                companyId={user.companyId}
                title="Turnos de Hoy"
                emptyMessage="No hay turnos programados para hoy"
                filterByDate={todayFilter}
            />
            <AppointmentList
                companyId={user.companyId}
                title="Próximos Turnos"
                emptyMessage="No hay turnos programados para el futuro"
                filterByDate={upcomingFilter}
            />
        </div>
    )
}
