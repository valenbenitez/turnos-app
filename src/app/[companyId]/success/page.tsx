'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../company.module.css'

export default function BookingSuccess() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const appointmentId = searchParams.get('appointmentId')
    const serviceName = searchParams.get('serviceName')
    const dateTime = searchParams.get('dateTime')
    const employeeName = searchParams.get('employeeName')

    useEffect(() => {
        if (!appointmentId) {
            router.push('/')
        }
    }, [appointmentId, router])

    return (
        <div className={styles.successContainer}>
            <div className={styles.successCard}>
                <div className={styles.successIcon}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={styles.checkIcon}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className={styles.title}>¡Turno Confirmado!</h1>
                <p className={styles.message}>
                    Tu reserva se ha realizado con éxito.
                </p>

                <div className={styles.appointmentDetails}>
                    {serviceName && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Servicio:</span>
                            <span className={styles.value}>{serviceName}</span>
                        </div>
                    )}

                    {employeeName && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Profesional:</span>
                            <span className={styles.value}>{employeeName}</span>
                        </div>
                    )}

                    {dateTime && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Fecha y Hora:</span>
                            <span className={styles.value}>{dateTime}</span>
                        </div>
                    )}

                    <div className={styles.detailItem}>
                        <span className={styles.label}>ID de Reserva:</span>
                        <span className={styles.value}>{appointmentId}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/" className={styles.homeButton}>
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}