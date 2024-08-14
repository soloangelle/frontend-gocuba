import { Link } from "react-router-dom"
import "./Register.css"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import axios from "axios";
import Swal from "sweetalert2";


export default function Register(){
    const {
        register,
        handleSubmit,
        reset,
      } = useForm();
    
    
    function onSubmit(data) {
        console.log(data);
        if (data.nationality === "Seleccionar") {
          Swal.fire({
                title: "Error",
                text: "Debes seleccionar una nacionalidad",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        registerUser(data);
          
    }       
   
    async function registerUser(user) {
    
        try {
          const userToSend = {
            fullname: user.fullname,
            email: user.email,
            image: user.image,
            password: user.password,
            repeatPassword: user.repeatPassword,
            bornDate: new Date(user.bornDate).getTime() ,
            nationality: user.nationality,
            observation: user.observation,            
          };
          const URL = `https://6647e55e2bb946cf2f9f27ec.mockapi.io/users`;
          const newUser = await axios.post(URL, userToSend);
    
          // Mostrar mensaje de confirmación y refrescar la pantalla con los valores actualizados
          Swal.fire({
            title: "Nuevo usuario registrado", 
            icon: "success",  
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí puedes refrescar los valores, por ejemplo:
              reset(); // Si estás usando useForm de react-hook-form
              
            }
          });
          console.log(newUser);
        } catch (error) {
          console.log(error);
           Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el usuario.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
      } 

    
    return(
        <div className="admin-container">
           <div className="new-user">
            <h1 className="title-register">Crear cuenta</h1>
            <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="name">Nombre completo<span className="required">*</span></label>
                    <input type="text" {...register("fullname")} id="name" required max="50" placeholder="Tu nombre completo"/>
                </div>
                <div className="input-group">
                    <label htmlFor="mail">Correo electrónico<span className="required">*</span></label>
                    <input type="email" {...register("email")} name="email" id="mail" 
                        pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$" placeholder="ejemplo@dominio.com" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña<span className="required">*</span></label>
                    <input type="password" {...register("password")} name="password" id="password"  />
                    <div className="input-info">
                    <FontAwesomeIcon icon={faCircleInfo} className="circle-info" /><span className="text-small"> Las contraseñas deben tener al menos 8 caracteres</span>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="repeatPasword">Repetir contraseña<span className="required">*</span></label>
                    <input type="password" {...register("repeatPassword")} name="repeatPassword" id="repeatPassword" required maxLength={
                        50} minLength={8}/>
                </div>
                <div className="input-group">
                    <label htmlFor="dateAge">Fecha de nacimiento<span className="required">*</span></label>
                    <input type="date" {...register("bornDate")} name="bornDate" id="dateAge" required min="1924-01-01" max="2006-03-31"/>
                </div>
                <div className="input-group">
                    <label htmlFor="country">Nacionalidad</label>
                    <select className="select-country" {...register("nationality")} name="nationality" id="country">
                        <option value="Seleccionar">Seleccionar</option>
                        <option value="Alemania">Alemania</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Canada">Canada</option>
                        <option value="Francia">Francia</option>
                        <option value="Inglaterra">Inglaterra</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="USA">USA</option>
                        <option value="Italia">Italia</option>
                        <option value="Uruguay">Uruguay</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="obs">Observaciones<span className="required">*</span></label>
                    <textarea name="obs" id="obs" cols="30" rows="3" maxLength={250}></textarea>
                </div>
                <div className="input-check">
                    <label htmlFor="accept"></label>
                    <input type="checkbox" className="accept-term" name="accept" id="accept" value="acepto" required/> Acepto <Link className="link-int"
                        to="/pages/terminos-condiciones.html">Términos y Condiciones</Link>
                </div>
                <div className="input-group">
                    <button className="form-button" type="submit">Registrar</button>
                </div>
                <span className="text-small">¿Ya tienes una cuenta?<a className="link-int" to="/"> Inicia sesión</a></span>
                <span className="text-small">Agregar excursiones o casa particular<a className="link-int" to="/"> Trabaja con nosotros</a></span>
            </form>
           </div>         
        </div>
    );
}