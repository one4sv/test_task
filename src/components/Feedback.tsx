import { useEffect, useState } from "react"
import { useFeedback } from "./context/FeedbackContext"
import "../scss/Feedback.scss"
import Cross from "../assets/svg/cross"
import Checkbox from "../assets/svg/checbox"
import CheckboxChecked from "../assets/svg/checboxChecked"
import { FeedbackDataType } from "../types/feedbackData"

export default function Feedback() {
    const { isOpen, closeModal } = useFeedback()

    const [agree, setAgree] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        number: "",
        email: "",
        agree: ""
    })

    const [data, setData] = useState<FeedbackDataType>({
        name: "",
        number: "",
        email: ""
    })

    useEffect(() => {
        if (!isOpen) return
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal()
        }
        document.addEventListener("keydown", handleEsc)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = ""
        }
    }, [closeModal])

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "")

        if (val.startsWith("8")) val = "7" + val.slice(1)
        if (!val.startsWith("7")) val = "7" + val

        val = "+" + val
        setData(prev => ({ ...prev, number: val }))
    }

    const validate = () => {
        const newErrors = { name: "", number: "", email: "", agree: "" }
        let isValid = true

        if (!data.name.trim()) {
            newErrors.name = "Введите имя"
            isValid = false
        }

        if (!/^\+7\d{10}$/.test(data.number)) {
            newErrors.number = "Введите корректный номер телефона"
            isValid = false
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Введите корректный email"
            isValid = false
        }

        if (!agree) {
            newErrors.agree = "Необходимо согласие"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        console.log("Отправляем данные:", data)
        closeModal()
    }

    if (!isOpen) return null

    return (
        <div className="modalOverlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="closeBtn" onClick={closeModal}>
                    <Cross />
                </button>

                <h2>Связаться с нами</h2>

                <form className="modalForm" onSubmit={handleSubmit}>
                    <div className="inputs">

                        <div className="inputWrapper">
                            <input
                                type="text"
                                placeholder="Имя"
                                value={data.name}
                                onChange={(e) =>
                                    setData(prev => ({ ...prev, name: e.target.value }))
                                }
                                className={errors.name ? "error" : ""}
                            />
                            {errors.name && <p className="errorText">{errors.name}</p>}
                        </div>

                        <div className="inputWrapper">
                            <input
                                type="tel"
                                placeholder="Телефон"
                                value={data.number}
                                onChange={handleNumberChange}
                                className={errors.number ? "error" : ""}
                            />
                            {errors.number && <p className="errorText">{errors.number}</p>}
                        </div>

                        <div className="inputWrapper">
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={data.email}
                                onChange={(e) =>
                                    setData(prev => ({ ...prev, email: e.target.value }))
                                }
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && <p className="errorText">{errors.email}</p>}
                        </div>

                    </div>

                    <div className="checkboxWrapper" onClick={() => setAgree(!agree)}>
                        {agree ? <CheckboxChecked /> : <Checkbox />}
                        <label>Я согласен (-а) на обработку персональных данных</label>
                    </div>
                    {errors.agree && <p className="errorText">{errors.agree}</p>}

                    <button type="submit" className="submitBtn">
                        <span>Отправить</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
