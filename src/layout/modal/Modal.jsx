
import "./Modal.css"
export default function Modal({title, handleClose, isOpen,children}){

    if(!isOpen) return ;

    return(
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">{title}</div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={handleClose}>Cerrar</button>
                    <button className="btn">Aceptar</button>
                </div>
            </div>
        </div>
    )
}