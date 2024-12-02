'use client'
import { Appointment } from '@/models/appointment'
import { Timestamp } from 'firebase/firestore'
import styles from './appointmentCard.module.css'
import Link from 'next/link'

interface AppointmentCardProps {
    appointment: Appointment
    onCancel?: (id: string) => void
    onReschedule?: (id: string) => void
    onComplete?: (id: string) => void
}

export function AppointmentCard({ 
    appointment,
    onCancel,
    onReschedule,
    onComplete
}: AppointmentCardProps) {
    const formatDate = (date: Timestamp) => {
        const dateObj = date.toDate()
        return dateObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
    }

    const formatDuration = (duration: number) => {
        if (duration < 60) {
            return `${duration} min`
        }
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`
    }

    return (
        <div className={styles.appointmentCard}>
            <div className={styles.appointmentHeader}>
                <div className={styles.dateTimeInfo}>
                    <span className={styles.appointmentDate}>
                        {formatDate(appointment.date as unknown as Timestamp)}
                    </span>
                    <span className={styles.appointmentTime}>
                        {appointment.time} ({formatDuration(appointment.duration)})
                    </span>
                </div>
                <span className={`${styles.status} ${styles[appointment.status]}`}>
                    {appointment.status}
                </span>
            </div>

            <div className={styles.appointmentDetails}>
                <h4>{appointment.clientName}</h4>
                <div className={styles.contactInfo}>
                    {appointment.clientEmail && (
                        <p>
                            <i className={styles.icon}>📧</i>
                            {appointment.clientEmail}
                        </p>
                    )}
                    {appointment.clientPhone && (
                        <p>
                            <i className={styles.icon}>📱</i>
                            {appointment.clientPhone}
                        </p>
                    )}
                    {appointment.employeeId && (
                        <p>
                            <i className={styles.icon}>👨‍💼</i>
                            {/* TODO: Add employee name */}
                            {appointment.employeeId}
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                {appointment.clientPhone && (
                    <Link
                        href={`https://wa.me/${appointment.clientPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionButton} ${styles.whatsappButton}`}
                    >
                        <i className={styles.whatsappIcon}>📞</i>
                        Enviar WhatsApp
                    </Link>
                )}
                {appointment.status !== 'completed' && onComplete && (
                    <button 
                        onClick={() => onComplete(appointment.id)}
                        className={`${styles.actionButton} ${styles.completeButton}`}
                        disabled={appointment.status === 'cancelled'}
                    >
                        Completar
                    </button>
                )}
                {appointment.status !== 'cancelled' && onReschedule && (
                    <button 
                        onClick={() => onReschedule(appointment.id)}
                        className={`${styles.actionButton} ${styles.rescheduleButton}`}
                        disabled={appointment.status === 'completed'}
                    >
                        Reprogramar
                    </button>
                )}
                {appointment.status !== 'cancelled' && onCancel && (
                    <button 
                        onClick={() => onCancel(appointment.id)}
                        className={`${styles.actionButton} ${styles.cancelButton}`}
                        disabled={appointment.status === 'completed'}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    )
}