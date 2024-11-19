import { User } from '@/models/user'
import { Service } from '@/models/service'
import styles from '../company.module.css'

interface EmployeeSelectionProps {
    employees: User[]
    selectedService: Service
    onEmployeeSelect: (employee: User) => void
    selectedEmployeeId?: string
    loading?: boolean
}

export function EmployeeSelection({
    employees,
    selectedService,
    onEmployeeSelect,
    selectedEmployeeId,
    loading
}: EmployeeSelectionProps) {
    if (loading) {
        return <div className={styles.loading}>Cargando profesionales...</div>
    }

    // Filtrar empleados que pueden realizar el servicio seleccionado
    const availableEmployees = employees.filter(
        employee => employee.specialties?.includes(selectedService.id ?? '')
    )

    if (availableEmployees.length === 0) {
        return (
            <div className={styles.error}>
                No hay profesionales disponibles para este servicio.
            </div>
        )
    }

    return (
        <div className={styles.employeesGrid}>
            {availableEmployees.map((employee) => (
                <div
                    key={employee.id}
                    className={`${styles.employeeCard} ${selectedEmployeeId === employee.id ? styles.selectedEmployee : ''
                        }`}
                    onClick={() => onEmployeeSelect(employee)}
                >
                    <h3 className={styles.employeeName}>{employee.name}</h3>
                    <div className={styles.employeeSchedule}>
                        <h4>Horarios:</h4>
                        {employee.schedule && Object.entries(employee.schedule).map(([day, hours]) => (
                            <p key={day}>
                                {day}: {hours.start} - {hours.end}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}