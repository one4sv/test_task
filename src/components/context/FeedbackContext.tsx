import { createContext, useContext, useState, ReactNode } from "react"

type FeedbackContextType = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export function FeedbackProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <FeedbackContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export const useFeedback = () => {
    const ctx = useContext(FeedbackContext)
    if (!ctx) throw new Error("useFeedback вне провайдера")
    return ctx
}
