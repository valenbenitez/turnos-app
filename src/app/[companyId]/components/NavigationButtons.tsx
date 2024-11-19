import styles from '../company.module.css'
import { BookingStep } from '../utils/types'

interface NavigationButtonsProps {
    currentStep: BookingStep
    onNext: () => void
    onPrevious: () => void
    canProceed: boolean
    loading: boolean
    isFirstStep: boolean
    isLastStep: boolean
}

export function NavigationButtons({
    currentStep,
    onNext,
    onPrevious,
    canProceed,
    loading,
    isFirstStep,
    isLastStep
}: NavigationButtonsProps) {
    return (
        <div className={styles.navigation}>
            {!isFirstStep && (
                <button
                    onClick={onPrevious}
                    className={styles.backButton}
                >
                    Anterior
                </button>
            )}

            {!isLastStep && (
                <button
                    onClick={onNext}
                    className={styles.nextButton}
                    disabled={loading || !canProceed}
                >
                    Siguiente
                </button>
            )}
        </div>
    )
}