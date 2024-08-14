import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function AdminGuard({ children }){    
    const { user } = useUser()
    
    return user?.role === "ADMIN_ROLE" ? children : <Navigate to = '/' replace />
}