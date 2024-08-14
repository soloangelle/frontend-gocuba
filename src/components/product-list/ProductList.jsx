import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import "./ProductList.css";
import Pagination from '../../components/pagination/Pagination';
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductList({ type, cantidad, showPagination = true, filters = {} }) {
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageItems, setPageItems] = useState(3);
    const [page, setPage] = useState(0);

    useEffect(() => {        
        getProducts();
    }, [page, pageItems, filters]);

    async function getProducts() {
        try {
            const params = new URLSearchParams({
                page,
                limit: cantidad || pageItems,
                ...filters,
                type
            }).toString();
            const response = await axios.get(`${URL}/products?${params}`);           
            const { products, total } = response.data;
            setTotalItems(total);
            setProducts(products);            
        } catch (error) {            
            Swal.fire("Error", "No se pudieron obtener los productos", "error");
        }
    }

    return (
        <div>
            <div className="section-wrapper">
                {products.length > 0 ? (
                    products.map(prod => (
                        <ProductCard key={prod._id} product={prod} />
                    ))
                ) : (
                    <p>No hay coincidencias con la búsqueda</p>
                )}
            </div>
            {showPagination && (
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
                            setPageItems(Number(e.target.value));
                            setPage(0);
                        }}
                    >
                        <option value="3">3 Items</option>
                        <option value="6">6 Items</option>
                        <option value="9">9 Items</option>
                    </select>
                </div>
            )}
        </div>
    );
}
