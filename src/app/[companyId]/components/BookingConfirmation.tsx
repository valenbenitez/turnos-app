'use client'
import { BookingData } from '../utils/types'
import styles from '../company.module.css'

interface BookingConfirmationProps {
    bookingData: BookingData
    onConfirm: (clientData: any) => void
    loading?: boolean
}

export function BookingConfirmation({
    bookingData,
    onConfirm,
    loading = false
}: BookingConfirmationProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className={styles.confirmationContainer}>
            <h2>Confirma tu turno</h2>

            <div className={styles.bookingSummary}>
                <div className={styles.summaryItem}>
                    <h3>Servicio</h3>
                    <p>{bookingData.service?.name}</p>
                    <span className={styles.price}>
                        ${bookingData.service?.price}
                    </span>
                </div>

                <div className={styles.summaryItem}>
                    <h3>Profesional</h3>
                    <p>{bookingData.employee?.name}</p>
                </div>

                {bookingData.dateTime && (
                    <div className={styles.summaryItem}>
                        <h3>Fecha y Hora</h3>
                        <p>{formatDate(bookingData.dateTime.date)}</p>
                        <p>{bookingData.dateTime.time} hs</p>
                    </div>
                )}

                <div className={styles.summaryItem}>
                    <h3>Duración estimada</h3>
                    <p>{bookingData.service?.duration} minutos</p>
                </div>
            </div>

            <button
                className={styles.confirmButton}
                onClick={onConfirm}
                disabled={loading}
            >
                {loading ? 'Confirmando...' : 'Confirmar Turno'}
            </button>
        </div>
    )
}