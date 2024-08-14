import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./ProductCard.css"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { formatTimestampToInputDate } from "../../services/utils/formatDates"



export default function ProductCard({product}){

    return (
        <div className="card-tour">
        <article>
          <div className="card-image">
         <Link to={`/product-detail/${product._id}`}><img className="ima-thumbnail" src={`http://localhost:1026/images/products/${product.image}`} alt={product.name}/>
         </Link>
          </div>
          <div className="card-information">
            <div className="card-data">
              <Link to={`/product-detail/${product._id}`}>
                <h3 className="title-card">{product.name}</h3>
              </Link>
              <div className="start-card">
                <FontAwesomeIcon icon={faStarSolid} className="smile-active"/>
                <FontAwesomeIcon icon={faStarSolid} className="smile-active"/>
                <FontAwesomeIcon icon={faStarSolid} className="smile-active"/>
                <FontAwesomeIcon icon={faStar} className="smile-active"/> 
                <FontAwesomeIcon icon={faStar} className="smile-active"/>              
                
              </div>
              
                <span className="date-card">{formatTimestampToInputDate(product.createdAt)}</span>
            
            </div>
            <div className="wishlist-price">   
              <FontAwesomeIcon icon={faHeart} className="heart-wishlist"/>   
              <span className="price"><strong>${Math.floor(product.price)}</strong>/Noche</span>
            </div>            
          </div>           
        </article>
      </div>

    )        
   
}