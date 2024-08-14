import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const URL = `https://6647e55e2bb946cf2f9f27ec.mockapi.io`;

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(`${URL}/users`);
      const users = response.data;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleActiveUser(user) {
    try {
      const updateActive = { active: true };  
      await axios.put(`${URL}/users/${user.id}`, updateActive);
      Swal.fire({
        title: "Activar Usuario", 
        icon: "success",  
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {            
          getUser();
        }
      });      
    } catch (error) {
      console.log(error);        
    }
    }  
  

  async function deleteUser(id) {
    try {
      await axios.delete(`${URL}/users/${id}`);
      getUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="admin-container">
      <h1>Administrar Usuarios</h1>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="image">Imagen</th>
              <th className="name">Nombre completo</th>
              <th className="name">Email</th>
              <th className="description">Fecha de Nacimiento</th>
              <th className="price">Nacionalidad</th>
              <th className="observaciones">Observaciones</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="admin-table-head" key={user.id}>
                <td className="image">
                  <img src={user.image} alt={user.fullname} />
                </td>
                <td className="name">{user.fullname}</td>
                <td className="name">{user.email}</td>
                <td className="description">
                  {formatTimestampToInputDate(user.bornDate)}
                </td>
                <td className="price">{user.nationality=== "Seleccionar" ? "-" : user.nationality}</td>
                <td className="observaciones">{user.observation}</td>
                <td className="actions">
                  <tr className="tr-action">
                    <td className="td-action">
                      {user.active === false && (
                        <button
                          className="action-btn btn-primary"
                          onClick={() => handleActiveUser(user)}>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            title="Dar de Alta"
                          />
                        </button>
                      )}
                      {user.active === true && (
                        <button
                          className="action-btn btn-success btn-point">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            title="Usuario Activo"
                          />
                        </button>
                      )}
                      <button
                        className="action-btn btn-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          title="Eliminar Usuario"
                        />
                      </button>
                    </td>
                  </tr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
