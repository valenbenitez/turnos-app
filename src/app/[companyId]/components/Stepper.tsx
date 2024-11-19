import styles from '../company.module.css'
import { Step, BookingStep } from '../utils/types'

interface StepperProps {
    steps: Step[]
    currentStep: BookingStep
}

export function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className={styles.stepper}>
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className={`${styles.step} ${currentStep === step.id ? styles.activeStep : ''
                        }`}
                >
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <span className={styles.stepLabel}>{step.label}</span>
                </div>
            ))}
        </div>
    )
}