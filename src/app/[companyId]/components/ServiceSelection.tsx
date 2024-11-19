import { Service } from '@/models/service'
import { useCompanyServices } from '@/hooks/useCompanyServices'
import styles from '../company.module.css'

interface ServiceSelectionProps {
    companyId: string
    onServiceSelect: (service: Service) => void
    selectedServiceId?: string
}

export function ServiceSelection({
    companyId,
    onServiceSelect,
    selectedServiceId
}: ServiceSelectionProps) {
    const { services, loading, error } = useCompanyServices(companyId)

    if (loading) return <div className={styles.loading}>Cargando servicios...</div>
    if (error) return <div className={styles.error}>{error}</div>

    return (
        <div className={styles.servicesGrid}>
            {services.map((service) => (
                <div
                    key={service.id}
                    className={`${styles.serviceCard} ${selectedServiceId === service.id ? styles.selectedService : ''
                        }`}
                    onClick={() => onServiceSelect(service)}
                >
                    <h3 className={styles.serviceName}>{service.name}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <div className={styles.serviceDetails}>
                        <span>Duración: {service.duration} min</span>
                        <span>Precio: ${service.price}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}