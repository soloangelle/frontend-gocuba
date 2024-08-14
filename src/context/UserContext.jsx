import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const URL = import.meta.env.VITE_SERVER_URL;


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
    )
    const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token"))
    );

    const navigate = useNavigate()

    useEffect(() => {
       user ? localStorage.setItem("user", JSON.stringify(user)): localStorage.removeItem("user")
       token ? localStorage.setItem ("token", JSON.stringify(token)) : localStorage.removeItem("token")
    }, [user, token]);

    async function login(data){
        try {
            const response = await axios.post(`${URL}/login`, data);

            setUser(response.data.user);
            setToken(response.data.token);      
            
            Swal.fire({
                title: response.data.message,
                text: "El login se realizó correctamente, será redirigico en un instante",
                icon: "success",
                timer:1500
            }).then(() => {
                // window.location.href = '/'
                navigate('/')
            })
            
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Ocurrió un error al iniciar sesión", "error");
        }
    }

    function logout(){
        setUser();
        setToken();
       
        navigate ('/');
    }

    return(
        <UserContext.Provider value={{user, token, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};