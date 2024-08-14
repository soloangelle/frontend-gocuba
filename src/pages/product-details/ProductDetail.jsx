import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faMinus,
  faWaterLadder,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWheelchairMove,
  faUsers,
  faDog,faUser,faBath,faSnowflake
} from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons/faBox";
import { faTv } from "@fortawesome/free-solid-svg-icons/faTv";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons/faVolumeHigh";
import userElena from "../../assets/user-elena.png";
import userMarcos from "../../assets/user-marcos.png";
import flagEsp from "../../assets/esp.png";
import flagUyu from "../../assets/uruguay.png";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const nuevosParrafos = (text) => {
  if (!text) return [];
  const paragraphs = text
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return paragraphs;
};

export default function ProductDetail() {
 const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [persCount, setPersCount] = useState(1); // Estado para contar las personas
  const [total, setTotal] = useState(0); // Estado para el total
  const [selectDate, setSelectDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const { id } = useParams();

  const { addOrderItem } = useOrder();

 async function getProductById(id) {
  try {
       const response = await axios.get(`${URL}/products/${id}`);       
       const product = response.data.product;
       
      
     setProduct(product);
     setLoading(false);
    } catch (error) {
     console.log(error);
  }
  }

  useEffect(() => {
     getProductById(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      const newSubtotal = persCount * product.price;
      const newTotal = newSubtotal;
      setTotal(newTotal);
    }
  }, [persCount, product]);

  const handleSuma = () => {
    setPersCount((prevCount) => prevCount + 1);
  };

  const handleResta = () => {
    if (persCount > 1) {
      setPersCount((prevCount) => prevCount - 1);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!selectDate) {
      Swal.fire({
        title: "Fecha requerida",
        text: "Por favor selecciona una fecha para completar la reserva.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (product.type.name === "ACCOMMODATION" && selectEndDate <= selectDate) {
      Swal.fire({
        title: "Fechas incorrectas",
        text: "La fecha de regreso debe ser posterior a la fecha de salida.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    Swal.fire({
      title: "Confirmación de Reserva",
      html: `¿Estás seguro que deseas reservar <strong>${product.name}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        addOrderItem({
          ...product,
          quantity: persCount,
        });

        Swal.fire({
          title: "¡Reservado!",
          html: `Se ha reservado ${
            product.type.name === "ACCOMMODATION" ? "el alojamiento" : "la excursión"
          } <strong>${product.name}</strong> exitosamente`,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  if (loading) {
    return <h4>Cargando...</h4>;
  }

  const propertiesArray = product.properties || [];

  
  const propertyIcons = {
    Guía: faUser,
    Accesibilidad: faWheelchairMove,
    "Pet friendly": faDog,
    "Audio guía": faVolumeHigh,
    Wifi: faWifi,
    "Pet allowed": faDog,
    "Caja fuerte": faBox,
    TV: faTv,
    Piscina: faWaterLadder,
    Bilingüe: faUsers,
    "Aire acondicionado": faSnowflake,
    "Baño privado": faBath,
    "Ideal para niños": faFaceSmile,
    "Vista al mar": faWaterLadder,
  };

  return (
    <>
    
      <div className="portada">
       <div className="carousel-portada">
          <img src={`http://localhost:1026/images/products/${product.image}`} />
        </div>
        <div className="portada-data">
          <div className="data-left">
            <div>
              <h1 className="portada-title">{product.name}</h1>
            </div>
            <div className="start-card">
              <FontAwesomeIcon icon={faFaceSmile} className="smile-active" />
              <FontAwesomeIcon icon={faFaceSmile} className="smile-active" />
              <FontAwesomeIcon icon={faFaceSmile} className="smile-active" />
              <FontAwesomeIcon icon={faFaceSmile} className="smile-active" />
              <FontAwesomeIcon icon={faFaceSmile} />
              <span className="smile-count">(103)</span>
            </div>
          </div>
          <div className="portada-price">
            Por persona{" "}
            <span className="main-price">
              <sup>$</sup>
              {product.price}
            </span>
          </div>
        </div>
      </div>

      {/*=========== Main ==================*/}
      <main className="main-principal">
        <div className="sections-view">
          <div className="view-article">
            <div className="article-left">
              <article className="article-tour">
                <div className="tour-properties">
                {propertiesArray.map((property, index) => (
              propertyIcons[property] && (
                <div className="tour-property" key={index}>
                  <div className="icon-property">
                    <FontAwesomeIcon icon={propertyIcons[property]} />
                  </div>
                  <div>{property}</div>
                </div>
              )
            ))}
                </div>
                <div className="descripcion">
                  {nuevosParrafos(product.summary)}
                  <div className="details">
                    <h2 className="sections-title">
                      {" "}
                      {product.type.name === "ACCOMMODATION"
                        ? "Descripción"
                        : "Itinerario"}
                    </h2>
                    <p>{nuevosParrafos(product.description)}</p>
                  </div>
                </div>
                <hr className="section-article" />
              </article>
              <div className="article-opinions">
                <section className="opinions">
                  <h2 className="sections-title">Opiniones</h2>
                  <div className="summary-start">
                    <div>
                      <h4>65 Opiniones</h4>
                    </div>
                    <div className="avg-opinion">
                      <div className="start-card start-opinions">
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          className="smile-active"
                        />
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          className="smile-active"
                        />
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          className="smile-active"
                        />
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          className="smile-active"
                        />
                        <FontAwesomeIcon icon={faFaceSmile} />
                      </div>
                      <div className="avg-number">
                        <span>(4,7/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="opinion">
                    <div className="opinion-section">
                      <div className="opinion-user">
                        <div className="user-data">
                          <div>
                            <img
                              className="img-user-opinion"
                              src={userMarcos}
                              alt="Avatar"
                            />
                            <div className="start-card">
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon icon={faFaceSmile} />
                            </div>
                          </div>
                          <div>
                            <h4>Marcos Echeverría</h4>
                            <div className="country-user">
                              <div>
                                <img
                                  className="flag"
                                  src={flagEsp}
                                  alt="España"
                                />
                              </div>
                              <div>
                                <span>España</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span>01/Mar/2024</span>
                      </div>
                      <div>
                        <p>
                          Excelente servicio y conductor/guia excepcional!!!
                          Hemos disfrutado mucho de la experiencia en nuestro
                          primer día en Cuba!!! Sin duda una gran forma de
                          iniciar un viaje!
                        </p>
                      </div>
                    </div>
                    <div className="opinion-section">
                      <div className="opinion-user">
                        <div className="user-data">
                          <div>
                            <img
                              className="img-user-opinion"
                              src={userElena}
                              alt="Avatar"
                            />
                            <div className="start-card">
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                              <FontAwesomeIcon
                                icon={faFaceSmile}
                                className="smile-active"
                              />
                            </div>
                          </div>
                          <div>
                            <h4>Elena Barrios</h4>
                            <div className="country-user">
                              <div>
                                <img
                                  className="flag"
                                  src={flagUyu}
                                  alt="Uruguay"
                                />
                              </div>
                              <div>
                                <span>Uruguay</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span>29/Feb/2024</span>
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Illo nulla quas molestiae? Non nam officia
                          laboriosam ab enim aliquam, quibusdam architecto
                          consectetur earum natus reprehenderit aspernatur
                          ratione illum. Eligendi obcaecati sit doloremque id
                          molestiae aperiam?
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="article-rigth">
              <div className="main-booking">
                <div className="booking">               
                  {product.type.name === "ACCOMMODATION"
                    ? "Reservar alojamiento"
                    : "Reservar excursión"}
                </div>
                <div className="new-booking">
                  <form className="form-booking">
                    <div className="group">
                      <div className="group-second">
                        <div className="fechas">
                          <div className="column-booking">
                            <label htmlFor="date">
                              {product.type.name === "ACCOMMODATION"
                                ? "Fecha Desde"
                                : "Fecha"}
                            </label>
                            <input
                              type="date"
                              id="date"
                              required
                              min="2022-03-05"
                              max="2025-06-05"
                              value={selectDate}
                              onChange={(e) => setSelectDate(e.target.value)}
                            />
                          </div>
                          {product.type.name === "ACCOMMODATION" && (
                            <div className="column-booking">
                              <label htmlFor="date">Fecha Hasta</label>
                              <input
                                type="date"
                                id="date"
                                required
                                min="2024-03-05"
                                max="2025-06-05"
                                value={selectEndDate}
                                onChange={(e) =>
                                  setSelectEndDate(e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>
                        <div className="column-booking">
                          <span>Personas</span>
                          <div className="quantity">
                            <div className="quantity-actions">
                              <button type="button" onClick={handleSuma}>
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                              <div>{persCount}</div>
                              <button type="button" onClick={handleResta}>
                                {" "}
                                <FontAwesomeIcon icon={faMinus} />{" "}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="booking-table">
                      <table className="booking-cost">
                        <tbody>
                          <tr>
                            <td>Personas</td>
                            <td className="right">{persCount}</td>
                          </tr>
                          <tr>
                            <td>Subtotal</td>
                            <td className="right">
                              {persCount}x ${product.price}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Total</td>
                            <td className="right">${total}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <button
                      className="form-button send-booking"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Reservar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
