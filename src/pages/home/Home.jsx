import ProductList from "../../components/product-list/ProductList";
import HomeCarousel from "../../layout/carousel/carousel";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import support from "../../assets/support-agent.svg";
import hotel from "../../assets/hotel.svg";
import payment from "../../assets/payment.png";

export default function Home() {
  const { order } = useOrder(); 
  console.log(order);

  return (
    <>
      <HomeCarousel />
      <div className="sections-view">
        <section className="view-tours">
          <div className="main-title">
            <h2>
              Las <span>mejores</span> excursiones
            </h2>
          </div>
          <p>Disfruta de la isla de la mano de los mejores guías, su gente</p>          
          <ProductList type="TOUR" cantidad={4} showPagination={false} />
          <div className="boton"><button className="view-all"><Link to="/tours">Más excursiones</Link></button></div>        
        </section>
        <section className="view-tours">
          <div className="main-title">
            <h2>
            Quédate <span>en casas</span> de familias
            </h2>
          </div>
          <p>Reserve una casa colonial o casas de lujo en la ciudad, playas paradisíacas o en entornos naturales</p>        
          <ProductList type='ACCOMMODATION' cantidad={4} showPagination={false} />   
          <div className="boton"><button className="view-all"><Link to='/accommodations'>Más alojamientos</Link></button></div>       
        </section>
      </div>
      <div className="features">
        <section className="our-features">
          <div className="main-title">
            <h2>
              El <span>mejor</span> plan
            </h2>
          </div>
          <p>Nosotros nos encargamos del reto</p>        
          <div className="section-wrapper">
            <div className="feature-item">
              <div className="feature-image">
                <img src={support} alt="Soporte 24 horas" />
              </div>
              <p>Soporte 24 horas</p>
            </div>
            <div className="feature-item">
              <div className="feature-image">
                <img src={hotel} alt="Casas de familia" />
              </div>
              <p>Casas de familia a lo largo y ancho de la Isla</p>
            </div>
            <div className="feature-item">
              <div className="feature-image">
                <img src={payment} alt="Pago seguro" />
              </div>
              <p>Pago seguro</p>
            </div>
          </div>               
        </section>
      </div>
    </>
  );
}
