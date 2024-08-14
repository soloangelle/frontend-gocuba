import "./Tour.css";
import HomeCarousel from "../../layout/carousel/carousel";
import ProductList from "../../components/product-list/ProductList";
import support from "../../assets/support-agent.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Tour() {
  const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        getLocations();
    }, []);

    async function getLocations() {
        try {
            const response = await axios.get(`${URL}/locations`);
            const { locations: locationsDB } = response.data;
            setLocations(locationsDB);
        } catch (error) {
            Swal.fire("Error", "No se pudieron obtener las ciudades", "error");
        }
    }

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const filters = {
        location: selectedLocation,
        minPrice,
        maxPrice
    };

  return (
    <>
      <HomeCarousel />
      <div className="sections-view">
        <div className="view-article">
          <aside className="view-left">
                        <div className="filtro">
                            <select onChange={handleLocationChange} value={selectedLocation}>
                                <option value="">Seleccionar ciudad</option>
                                {locations.map(location => (
                                    <option key={location._id} value={location._id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Precio mínimo"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                            <input
                                type="number"
                                placeholder="Precio máximo"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
            <div className="item-soporte">
              <div className="soporte">
                <div className="feature-image">
                  <img src={support} alt="Soporte 24 horas" />
                </div>
                <div>
                  <h3>¿Necesitas ayuda?</h3>
                  <h4 className="telHelp"> +5396385271</h4>
                </div>
                <div>
                  <small className="helpFooter">Lunes a Viernes de 9:00 - 18:00</small>
                </div>
              </div>
            </div>
          </aside>
          <div className="view-rigth">
            <ProductList type="TOUR" />
          </div>
        </div>
      </div>
    </>
  );
}
