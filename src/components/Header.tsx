import "../scss/Header.scss"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { useFeedback } from "./context/FeedbackContext"

export default function Header() {
    const navigate = useNavigate()
    const { openModal } = useFeedback()

    return (
        <div className="header">
            <div className="logo" onClick={() => navigate("/")}>
                <img src={logo} alt="" />
            </div>
            <button className="feedbackButton" onClick={() => openModal()}><span className="link">Связаться с нами</span></button>
            <div className="header-divider"></div>
        </div>
    )
}