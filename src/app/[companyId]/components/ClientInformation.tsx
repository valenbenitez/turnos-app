'use client'
import { useState } from 'react'
import styles from '../company.module.css'

interface ClientData {
    name: string
    email: string
    phone: string
}

interface ClientInformationProps {
    onClientDataSubmit: (data: ClientData) => void
    loading?: boolean
}

export function ClientInformation({ onClientDataSubmit, loading = false }: ClientInformationProps) {
    const [clientData, setClientData] = useState<ClientData>({
        name: '',
        email: '',
        phone: ''
    })

    const [errors, setErrors] = useState<Partial<ClientData>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<ClientData> = {}

        if (!clientData.name.trim()) {
            newErrors.name = 'El nombre es requerido'
        }

        if (!clientData.email.trim()) {
            newErrors.email = 'El email es requerido'
        } else if (!/\S+@\S+\.\S+/.test(clientData.email)) {
            newErrors.email = 'Email inválido'
        }

        if (!clientData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onClientDataSubmit(clientData)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setClientData(prev => ({
            ...prev,
            [name]: value
        }))
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name as keyof ClientData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    return (
        <div className={styles.clientInfoContainer}>
            <h2>Información de contacto</h2>
            <p className={styles.subtitle}>Por favor, completa tus datos para confirmar el turno</p>

            <form onSubmit={handleSubmit} className={styles.clientForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre completo *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={clientData.name}
                        onChange={handleChange}
                        className={errors.name ? styles.errorInput : ''}
                        placeholder="Ej: Juan Pérez"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={clientData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorInput : ''}
                        placeholder="Ej: juan@email.com"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={clientData.phone}
                        onChange={handleChange}
                        className={errors.phone ? styles.errorInput : ''}
                        placeholder="Ej: +54 11 1234-5678"
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Continuar'}
                </button>
            </form>
        </div>
    )
}