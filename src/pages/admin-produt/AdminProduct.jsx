import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";
//import Modal '../../layout/modal/Modal.css'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/interceptor/interceptor";
import Pagination from "../../components/pagination/Pagination";

export default function AdminProduct() {

  const api = useApi();
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState();
  const { token } = useUser();
  const [selectedOption, setSelectedOption] = useState('Tour');
  const [types, setTypes] = useState([]);
  const [location, setLocation] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageItems, setPageItems] = useState(3);
  const [page, setPage] = useState(0);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getProduct();
    getTypes();
    getLocation();
  }, [page, pageItems])

  async function getTypes() {
    try {

      const response = await api.get(`/types`);

      console.log(response);
      const types = response.data.types;

      setTypes(types);

    } catch (error) {
      console.log("Error al obtener Tipo de producto", error);
    }
  }

  async function getLocation() {

    try {

      const response = await api.get(`/locations`);

      const locations = response.data.locations;

      setLocation(locations);
    } catch (error) {
      console.log("Error al obtener la ciudad", error);
    }
  }

  async function getProduct() {
    try {
      const params = new URLSearchParams({
        page,
        limit: pageItems // Usa pageItems para limitar el número de productos
      }).toString();
      const response = await api.get(`/products?${params}`);
      const { products, total } = response.data;

      setTotalItems(total);
      setProducts(products);  // Esto debería actualizar el estado solo con los productos obtenidos de la API
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  function onSubmit(data) {
    console.log(data);

    const formData = new FormData();  // para enviar archivos

    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("image", data.image.length ? data.image[0] : undefined); // Si hay una imagen la enviamos, si no enviamos el archivo
    formData.append("imageFront", data.imageFront.length ? data.imageFront[0] : undefined); // Si hay una imagen la enviamos, si no enviamos el archivo
    formData.append("location", data.location);
    formData.append("properties", JSON.stringify(data.properties));
    formData.append("createdAt", new Date(data.createdAt).getTime());
    formData.append("type", data.type);

    if (data.id) {
      UpdateProductData(formData);
    } else {
      createProduct(formData);
    }
  }

  async function UpdateProductData(productFormData) {
    try {
      const id = productFormData.get("id");

      await api.put(`/products/${id}`, productFormData)

      // await axios.put(`http://localhost:1026/api/products/${id}`,  productFormData,{
      //   headers: { Authorization: token }
      // });
      // console.log(productFormData);

      Swal.fire({
        title: 'Producto actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      getProduct();
      setIsEditing(false);
      reset();

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.log(error);
    }
  }

  async function createProduct(product) {

    try {

      const newProduct = await api.post(`/products`, product);

      Swal.fire({
        title: "Producto creado",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          reset();
          getProduct();
        }
      });
      console.log(newProduct);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el producto.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async function deleteProduct(id) {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: token }
        });

        Swal.fire({
          title: 'Producto eliminado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        getProduct();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el producto.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.log(error); // Para depurar el error
    }
  }
  function handleEditProduct(producto) {
    console.log("Editar producto", producto);

    setIsEditing(true);

    setValue("id", producto._id);
    setValue("name", producto.name);
    setValue("price", producto.price);
    //setValue("image", producto.image);  Ya no seteamos el input de imagen
    setValue("type", producto.type._id);
    setValue("description", producto.description);
    setValue("summary", producto.summary);
    setValue("location", producto.location._id);
    // setValue("imageFront", producto.imageFront);
    setValue("properties", producto.properties);
    setValue("createdAt", formatTimestampToInputDate(producto.createdAt));

  }

  return (
    <div className="admin-container">
      <h1>Administrar Productos</h1>
      <div className="admin-prod">
        <div className="admin-form-container">
          <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div className="input-group">
              <label htmlFor="">Producto <span>*</span></label>
              <input
                type="text"
                {...register("name", {
                  required: "Ingrese el producto",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 100, message: "Máximo 20 caracteres" },
                })} required placeholder="Nombre del producto"
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Tipo</label>
              <select value={selectedOption} {...register("type")} onClick={handleSelectChange}>
                {/* Obtenidas y actualizadas desde la base de datos */}
                {types.map(type => (
                  <option key={type._id} value={type._id}>{type.description} </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="">Resumen <span>*</span></label>
              <textarea type="text" {...register("summary", {
                required: "Ingrese el resumen",
                maxLength: { value: 500 },
              })} >
              </textarea>
            </div>
            <div className="input-group">
              <label htmlFor="">Ciudad <span>*</span></label>
              <select {...register("location", { required: "Ingrrse ciudad" })}>
                <option value="">Seleccione una ciudad</option>
                {
                  location.map(location => (
                    <option key={location._id} value={location._id}>{location.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="">Precio <span>*</span></label>
              <input type="number" {...register("price", { required: "El campo Precio es requerido" })} />
            </div>
            <div className="input-group">
              <label htmlFor="" >Imagen <span>*</span></label>
              <input type="file" accept="image/*" {...register("image")} />
            </div>
            <div className="input-group">
              <label htmlFor="">Imagen de cabecera</label>
              <input type="file" accept="image/*" {...register("imageFront")} />
            </div>
            {selectedOption === "Tour" && (
              <div className="input-group">
                <label htmlFor="">Facilidades</label>
                <select {...register("properties")} multiple>
                  <option value="Guía">Guía</option>
                  <option value="Accesibilidad">Accesibilidad</option>
                  <option value="Pet friendly">Pet friendly</option>
                  <option value="Audio guía">Audio guía</option>
                </select>
              </div>
            )}
            {selectedOption === "Accommodation" && (
              <div className="input-group">
                <label htmlFor="">Comodidades</label>
                <select {...register("properties")} multiple>
                  <option value="Piscina">Piscina</option>
                  <option value="TV">TV</option>
                  <option value="Wifi">Wifi</option>
                  <option value="Pet allowed">Pet allowed</option>
                  <option value="Caja fuerte">Caja fuerte</option>
                  <option value="Baño privado">Baño privado</option>
                  <option value="Aire acondicionado">Aire acondicionado</option>
                  <option value="Ideal para niños">Ideal para niños</option>
                </select>
              </div>
            )}
            <div className="input-group">
              <label htmlFor="">Descripción</label>
              <textarea type="text" {...register("description")} minLength={100}>
              </textarea>
            </div>

            <div className="input-group">
              <label htmlFor="">Fecha ingreso <span>*</span></label>
              <input type="date" {...register("createdAt", { required: "La fecha de ingreso es obligatoria" })} required />
            </div>
            <button type="submit" className={isEditing ? 'btn-success' : ''}> {isEditing ? 'Actualizar' : 'Crear'}</button>
          </form>
        </div>
        <div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr className="admin-table-head">
                <th className="image">Imagen</th>
                <th className="name">Producto</th>
                <th className="type">Tipo</th>
                <th className="description">Resumen</th>
                <th className="price">Precio</th>
                <th className="actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="image">
                    <img src={`http://localhost:1026/images/products/${product.image}`} alt={product.name} />
                  </td>
                  <td className="name">{product.name}</td>
                  <td className="type">
                    {product.type.description}
                  </td>
                  <td className="description">{product.summary}</td>
                  <td className="price">${Math.floor(product.price)}</td>
                  <td className="actions">
                    <div className="actions-div">
                      <button className="action-btn btn-primary">
                        <Link to={`/product-detail/${product._id}`}>
                          <FontAwesomeIcon icon={faEye} title="Ver producto" />
                        </Link>
                      </button>
                      <button className="action-btn" onClick={() => handleEditProduct(product)}>
                        <FontAwesomeIcon icon={faEdit} title="Editar producto" />
                      </button>
                      <button className="action-btn btn-danger" onClick={() => deleteProduct(product._id)}>
                        <FontAwesomeIcon icon={faTrashCan} title="Eliminar producto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          {/* Paginacion */}
          {/*showPagination && (*/}
          <div className="pag-action">
            <Pagination
              totalItems={totalItems}
              loadPage={(newPage) => setPage(newPage)}
              pageItems={pageItems}
              currentPage={page}
            />
            <select
              className="select-items-per-page"
              defaultValue={pageItems}
              onChange={(e) => {
                setPageItems(Number(e.target.value)); // Actualiza el número de ítems por página
                setPage(0);  // Resetea la página a 0 al cambiar el número de ítems
              }}
            >
              <option value="3">3 Items</option>
              <option value="6">6 Items</option>
              <option value="9">9 Items</option>
            </select>
          </div>
          {/*} )}*/}

        </div>

      </div>
    </div>
  );
}
