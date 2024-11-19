import { Company } from "@/models/company"
import styles from '../company.module.css'

interface CompanyInfoProps {
    company: Company | null
    loading: boolean
}

export function CompanyInfo({ company, loading }: CompanyInfoProps) {
    if (loading) {
        return <div className={styles.loading}>Cargando información de la compañía...</div>
    }

    if (!company) {
        return <div className={styles.error}>No se encontró la compañía</div>
    }

    return (
        <div className={styles.companyCard}>
            <h2 className={styles.companyName}>{company.id}</h2>
            <p className={styles.companyAddress}>{company.address}</p>
            <div className={styles.contactInfo}>
                <h3 className={styles.contactTitle}>Contacto:</h3>
                <p className={styles.contactDetail}>{company.contactInfo.phone}</p>
                <p className={styles.contactDetail}>{company.contactInfo.email}</p>
            </div>
        </div>
    )
}