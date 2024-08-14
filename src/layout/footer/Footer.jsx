import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faSquareFacebook, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer(){
    return(
        <footer className="main-footer ">
        <section className="about-us">
        <h2 className="footer-title">GoCuba</h2>
        <nav className="nav-footer">          
            <NavLink className="footer-link" to="/">Nuestra historia</NavLink>
            <NavLink className="footer-link" to="/">FAQs</NavLink>
            <NavLink className="footer-link" to="/">Términos y condiciones</NavLink>
            <NavLink className="footer-link" to="/">Trabaja con nosotros</NavLink>          
        </nav>
      </section>
      <section className="inspire">
        <h2 className="footer-title">Inspiración</h2>
        <nav className="nav-footer">        
            <NavLink className="footer-link" to="/">Destinos</NavLink>
            <NavLink className="footer-link" to="/">Guías de viajes</NavLink>
            <NavLink className="footer-link" to="/">Eventos</NavLink> 
        </nav>
      </section>
      <section className="need-help">
        <h2 className="footer-title">¿Necesitas ayuda?</h2>
        <Link className="footer-link" href="tel:+34661111222"><FontAwesomeIcon icon={faPhone} className="need-icon"/> 6526982233</Link>
        <Link className="footer-link" href="mailto:contacto@gocuba.com"><FontAwesomeIcon icon={faEnvelope} className="need-icon"/> contacto@gocuba.com</Link>
      </section>
      <section className="follow-us">
        <h2 className="footer-title">Síguenos</h2>
        <div className="social"> 
        <Link className="footer-link" to="/"><FontAwesomeIcon icon={faInstagram} className="fa-brands fa-instagram"/></Link>
        <Link className="footer-link" to="/"><FontAwesomeIcon icon={faSquareFacebook} className="fa-brands fa-square-facebook"/></Link>
        <Link className="footer-link" to="/"><FontAwesomeIcon icon={faSquareTwitter} className="fa-brands fa-square-twitter"/></Link>
        </div>
      </section>
        </footer>        
    );
}