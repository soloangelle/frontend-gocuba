import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import logoImg from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import Modal from "../modal/Modal";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);  

  function handleClose(){
    setIsOpen(false);
  }

  const {user, logout} = useUser()

  const { toggleSidebarOrder, count} = useOrder();

  return (
    <>
      <header className="main-header">
      <div className="header-sticky">
        <input type="checkbox" id="menu" className="check-menu" />
        <div className="logo-home">
          <h1>
            <Link to="/">
              <img
                className="img-logo"
                src={logoImg}
                alt="Hospedaje, Excursiones,Traslados y más - GoCuba"
              />
            </Link>
          </h1>
        </div>
        <nav className="main-menu">
          <NavLink className="nav-link" to="/">
            Inicio
          </NavLink>          
          <NavLink className="nav-link" to="/tours">
            Excursiones
          </NavLink>
          <NavLink className="nav-link" to="/accommodations">
            Alojamientos
          </NavLink> 
          <NavLink className="nav-link" to="/contact">
            Contacto
          </NavLink>
          <NavLink className="nav-link" to="/acerca-de">
            Acerca de
          </NavLink>
          {user?.role === 'ADMIN_ROLE' && (               
           <div className="nav-link administrar-menu">
              Administrar     
              <div className="admin-submenu">
                <NavLink className="nav-link" to="/admin-product">
                    Administrar productos
                </NavLink>
                <NavLink className="nav-link" to="/admin-user">
                    Administrar usuarios
                  </NavLink>                 
              </div>                
            </div>
           )}
        </nav>
        <div className="user">
          <div className="user-data">
            <div className="user-avatar">              
                {user ?
                (<div className="administrar-menu"> 
                  <FontAwesomeIcon icon = {faCircleUser} className="fa-solid"/>
                  <div className="admin-submenu user-menu">
                  <button className= "nav-link"  onClick={logout}>Logout</button>
                  </div>
                  
                </div>)
                :
                (<div className="administrar-menu">
                  <FontAwesomeIcon icon={faUser} className="fa-solid"/>
                 <div className="admin-submenu user-menu">
                     <NavLink className="nav-link" to="/login">Ingresar</NavLink>
                     <NavLink className="nav-link" to="/registro">Registrarse</NavLink>
                 </div>                           
                 </div>
            )}
            </div>                 
              
            
          </div>
          <div className="user-cart">
            <FontAwesomeIcon icon={faCartShopping} className="fa-solid" onClick={() => toggleSidebarOrder()} />            
            <span>{count}</span>
          </div>
        </div>
        <label className="label-on-menu" htmlFor="menu">
          ☰
        </label>
        <label className="label-off-menu" htmlFor="menu">
          X
        </label>
      </div>
      </header>
      
      <Modal title="Ingresar" isOpen={isOpen} handleClose={handleClose}>
         <>
           <h3>Elemento Children</h3>
           <hr />
           <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto commodi libero reprehenderit. Deleniti amet, dolores consequatur sint fugit assumenda quasi.</p>
         </>
      </Modal>
    </>
    
  );
}
