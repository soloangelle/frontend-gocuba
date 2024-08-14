import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./OrderSidebar.css"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function OrderSidebar() {

  const { order, total, handleChangeQuantity, removeItem, sidebarToggle, postOrder } = useOrder();

  const calcularTotalItems = () => {
    let totalCount = 0;
    order.forEach((product) => {
      totalCount += product.quantity;
    });
    return totalCount;
  };

  return (
    <div className={`order-wrapper ${sidebarToggle ? "active" : ""}`}>
      <div className="list-container">
        <h2>Orden actual:</h2>
        <ul className="order-list">
          {order.map(product => {
            return (
              <li className="order-item" key={product._id}>

                <img className="order-image" src={product.image ? `${import.meta.env.VITE_IMAGES_URL}/products/${product.image}` : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"} alt=""
                />
                {/* Solo ejecuta lo de la derecha solo si el iz es null o undefined */}
                <div className="order-item-name" title={product.name}>
                  <div>{product.name}</div>
                  <small>{product.type && product.type.name === "ACCOMMODATION"
                    ? "Alojamiento"
                    : "Excursion"}</small>
                </div>
                <div className="order-quantity">
                  <input type="number"
                    className="order-quantity-input"
                    value={product.quantity}
                    onChange={(evt) =>
                      handleChangeQuantity(product._id, evt.target.value)
                    }
                    min={1}
                  />
                </div>
                <div className="order-price">$ {product.price}</div>
                <div className="order-subtotal">
                  $ {product.price * product.quantity}
                </div>
                <div className="order-actions">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    title="Eliminar producto"
                    onClick={() => removeItem(product._id)} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="order-finish">
        <div className="total">
          <div className="total-count">Items: {calcularTotalItems()}</div>
          <div className="total-price">
            Total $ <span>{total}</span>
          </div>
        </div>
        <div className="btn-compra">
          <button
            className="send-shop"
            type="submit"
            onClick={() => postOrder()}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}