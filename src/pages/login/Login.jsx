import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login(){   

    const { login } = useUser();    
    
    console.log(URL);

    const {register, handleSubmit } = useForm();

    function onLogin(data){
        login(data);
        
    }
    
    return(
        <div className="admin-container login">
           <div className="new-user">
            <h1 className="title-register">Iniciar sesión</h1>
            <form className="form-register" onSubmit={handleSubmit(onLogin)}>
                <div className="input-group">
                    <label htmlFor="mail">Correo electrónico</label>
                    <input type="email" {...register("email", {required: true})} name="email" id="mail" 
                        pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$" placeholder="ejemplo@dominio.com" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" {...register("password", {required: true})} name="password" id="password"  />
                </div>
               
                <div className="input-group">
                    <button className="form-button" type="submit">Ingresar</button>
                </div>
                <span className="text-small">¿No tienes una cuenta?<Link className="link-int" to="/"> Regístrate</Link></span>
                <span className="text-small">Agregar excursiones o casa particular<Link className="link-int" to="/"> Trabaja con nosotros</Link></span>
            </form>
           </div>         
        </div>
    );
}