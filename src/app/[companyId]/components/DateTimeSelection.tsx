'use client'
import { useState, useEffect } from 'react'
import { User } from '@/models/user'
import { Service } from '@/models/service'
import { useAppointments } from '@/hooks/useAppointment'
import styles from '../company.module.css'

interface DateTimeSelectionProps {
    employee: User
    service: Service
    onDateTimeSelect: (dateTime: { date: Date; time: string }) => void
    selectedDateTime?: { date: Date; time: string } | undefined
}

export function DateTimeSelection({
    employee,
    service,
    onDateTimeSelect,
    selectedDateTime
}: DateTimeSelectionProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [availableSlots, setAvailableSlots] = useState<string[]>([])
    const { getEmployeeAppointmentsByDate } = useAppointments(employee.companyId)

    // Genera los próximos 7 días disponibles
    const getAvailableDates = () => {
        const dates: Date[] = []
        const today = new Date()

        const dayMapping: { [key: string]: string } = {
            'lunes': 'monday',
            'martes': 'tuesday',
            'miércoles': 'wednesday',
            'jueves': 'thursday',
            'viernes': 'friday',
            'sábado': 'saturday',
            'domingo': 'sunday'
        }

        for (let i = 0; i < 30; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            
            // Obtener el nombre del día en inglés directamente
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                .toLowerCase()

            if (employee.schedule?.[dayName]) {
                dates.push(date)
            }
        }

        return dates
    }

    // Genera slots de 30 minutos dentro del horario del empleado
    const generateTimeSlots = async (date: Date) => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
            .toLowerCase()
        const schedule = employee.schedule?.[dayName]

        if (!schedule) return []

        try {
            // Obtener los turnos existentes para ese día
            const existingAppointments = await getEmployeeAppointmentsByDate(
                employee.id ?? '',
                date
            )

            const slots: string[] = []
            const [startHour] = schedule.start.split(':')
            const [endHour] = schedule.end.split(':')

            let currentTime = new Date(date)
            currentTime.setHours(parseInt(startHour), 0, 0)

            const endTime = new Date(date)
            endTime.setHours(parseInt(endHour), 0, 0)

            // Si hay break, dividimos en dos períodos
            if (schedule.break) {
                const breakStart = new Date(date)
                const [breakStartHour] = schedule.break.start.split(':')
                breakStart.setHours(parseInt(breakStartHour), 0, 0)

                const breakEnd = new Date(date)
                const [breakEndHour] = schedule.break.end.split(':')
                breakEnd.setHours(parseInt(breakEndHour), 0, 0)

                // Primer período (antes del break)
                while (currentTime < breakStart) {
                    const timeSlot = currentTime.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })

                    // Verificar si el horario está disponible
                    const isSlotTaken = existingAppointments.some(
                        app => app.time === timeSlot
                    )

                    if (!isSlotTaken) {
                        slots.push(timeSlot)
                    }

                    currentTime.setMinutes(currentTime.getMinutes() + 30)
                }

                // Segundo período (después del break)
                currentTime = new Date(breakEnd)
                while (currentTime < endTime) {
                    const timeSlot = currentTime.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })

                    const isSlotTaken = existingAppointments.some(
                        app => app.time === timeSlot
                    )

                    if (!isSlotTaken) {
                        slots.push(timeSlot)
                    }

                    currentTime.setMinutes(currentTime.getMinutes() + 30)
                }
            } else {
                // Si no hay break, generamos slots continuos
                while (currentTime < endTime) {
                    const timeSlot = currentTime.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })

                    const isSlotTaken = existingAppointments.some(
                        app => app.time === timeSlot
                    )

                    if (!isSlotTaken) {
                        slots.push(timeSlot)
                    }

                    currentTime.setMinutes(currentTime.getMinutes() + 30)
                }
            }

            return slots
        } catch (error) {
            console.error('Error al obtener los turnos:', error)
            return []
        }
    }

    const handleDateSelect = async (date: Date) => {
        setSelectedDate(date)
        const slots = await generateTimeSlots(date)
        setAvailableSlots(slots)
    }

    const handleTimeSelect = (time: string) => {
        if (selectedDate) {
            onDateTimeSelect({ date: selectedDate, time })
        }
    }

    return (
        <div className={styles.dateTimeContainer}>
            <div className={styles.datesContainer}>
                <h3>Selecciona una fecha</h3>
                <div className={styles.datesList}>
                    {getAvailableDates().map((date) => (
                        <button
                            key={date.toISOString()}
                            className={`${styles.dateButton} ${selectedDate?.toDateString() === date.toDateString()
                                    ? styles.selectedDate
                                    : ''
                                }`}
                            onClick={() => handleDateSelect(date)}
                        >
                            {date.toLocaleDateString('es-ES', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                            })}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDate && (
                <div className={styles.timeSlotsContainer}>
                    <h3>Horarios disponibles</h3>
                    <div className={styles.timeSlotsList}>
                        {availableSlots.map((time) => (
                            <button
                                key={time}
                                className={`${styles.timeSlot} ${selectedDateTime?.time === time
                                        ? styles.selectedTime
                                        : ''
                                    }`}
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}