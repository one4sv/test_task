import logo from "../assets/logo_white.png"
import "../scss/Footer.scss"
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <img className="footerLogo" src={logo} alt="Логотип" />
                <h2 className="footerText">Креативное агентство 500na700</h2>
                {/* <p className="footerText">Креативное агентство 500na700</p> */}
            </div>
        </footer>
    )
}