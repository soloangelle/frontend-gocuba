import { faEnvelope,faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"

export default function Contact(){
    
    return(        
            <div className="admin-container">                
              <section className="main-contact">
              <h3 className="contact-text">Llámenos o envíenos un correo electrónico en cualquier momento, nos esforzamos por responder a la brevedad</h3>
                <div className="view-article view-contact">
                  <div className="contact-form">                    
                    <form className="form-contact" action="#" method="post">
                      <div className="input-group">
                        <label htmlFor="name">Nombre completo<span className="required">*</span></label>
                        <input type="text" id="name" required maxLength="50" placeholder="Tu nombre completo" />
                      </div>
                      <div className="input-group">
                        <label htmlFor="mail">Correo electrónico<span className="required">*</span></label>
                        <input
                          type="email"
                          id="mail"
                          name="mail"
                          required
                          pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                          placeholder="ejemplo@dominio.com"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="sms">Observaciones<span className="required">*</span></label>
                        <textarea id="sms" name="sms" cols="50" rows="5" minLength="100" maxLength="250"></textarea>
                      </div>
                      <div className="input-group">
                        <button className="form-button" type="submit">
                          Enviar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="contact-address">
                    <h2 className="title-h2">GoCuba</h2>
                    <div className="contact-place">
                      <address>
                        <span>José P. Varela y José Serrato, Av Damaso Larrañaga S/N</span>
                        <br />
                        <span>Montevideo</span>,<span>Uruguay</span>
                      </address>
                      <Link className="mail-contact" href="mailto:info@gocuba.com">
                        <FontAwesomeIcon icon={faEnvelope}/> info@gocuba.com
                      </Link>
                      <Link className="phone-contact" href="tel:+34661111222"><FontAwesomeIcon icon={faPhone} className="need-icon"/> 6526982233</Link>
                    </div>
                    <div className="contact-map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13094.911785979692!2d-56.1533598!3d-34.8630626!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80859196b1db%3A0xfa0cae26c29546da!2sAntel%20Arena!5e0!3m2!1ses-419!2suy!4v1709674979227!5m2!1ses-419!2suy"
                        width="100%"
                        height="350"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </section>
            </div>          
    );
}