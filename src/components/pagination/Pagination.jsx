import { useState } from "react";
import "./Pagination.css";

export default function Pagination({ totalItems, loadPage, pageItems = 5 }) {
    const [page, setPage] = useState(0);
    const totalBtns = Math.ceil(totalItems / pageItems);

    function handlePageChange(value) {
        setPage(value);
        loadPage(value); // Pasar el valor directamente
    }

    function renderButtons() {
        const buttons = [];
        for (let i = 0; i < totalBtns; i++) {
            buttons.push(
                <button key={i}
                    className={`pagination-item ${page === i ? 'active' : ''}`} 
                    onClick={() => handlePageChange(i)}>
                    {i + 1}
                </button>
            );
        }
        return buttons;
    }

    return (
        <div className="pag-action">
            {renderButtons()}
        </div>
    );
}
