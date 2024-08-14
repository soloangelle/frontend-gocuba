
import { createContext, useContext,useEffect,useState} from "react";
import Swal from "sweetalert2";
import {useUser} from "./UserContext";
import useApi from "../services/interceptor/interceptor";

const OrderContext = createContext();
// const ORDER = {
//       user:null,
//       products: [],
//       total: 0,      
// }

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({children}) => {
    const { user, token } = useUser();
    const api = useApi();
    //Estado de la Orden
    const [order,setOrder] = useState(JSON.parse(localStorage.getItem("order")) || []
  );
    const [count, setCount] = useState(0);
    const [sidebarToggle, setSidebarToggle] = useState(false); 

    useEffect(() => {
        localStorage.setItem("order",JSON.stringify(order));
        calculateTotal();  
        calculateCount();
    }, [order]);

    const [total, setTotal ] = useState(0);  
    
    function addOrderItem(producto){          
        const product = order.find(prod => prod._id === producto._id);

        if(product){
            handleChangeQuantity(product.product, product.quantity + producto.quantity);
        } else{
            // const newOrderProduct = {
            //     product: producto._id,
            //     quantity:  producto.quantity,
            //     price: producto.price,
            //     image: producto.image,
            //     name: producto.name,
            //     type: producto.type
            // }

            producto.quantity = producto.quantity;
           // const products = [...order, producto];
            
           // const total = calculateTotal(products)
            console.log("Nuevo total calculado:", total);
    
            setOrder([...order, producto]);
           
        }   
    }   
    
    // CalcularTotal
    function calculateTotal(){
        let totalCount = 0;
        order.forEach(prod => {
            totalCount += prod.price * prod.quantity;
        })
        // setOrder({...order, total: totalCount})
        console.log("Total calculado:", totalCount);  // Log del total calculado
        setTotal(totalCount);
    }
   
    function calculateCount(){
        let count = 0;
        order.forEach( (prod) => {
            count += prod.quantity;
        });
        setCount(count);
    }
    
    function handleChangeQuantity(id, quantity){      
       const updatedProduts = order.map((item) => {  
          if(item._id === id){
            item.quantity = +quantity
          }
          return item;
       })      
       //const total = calculateTotal(updatedProduts);
       console.log("Total actualizado:", total);  

       setOrder(updatedProduts);
    }

    // Funcion para quitar elemento de mi orden
    function removeItem(id){
        Swal.fire({
            title: "Eliminar",
            text: "Realmente desea quitar este producto?",
            icon:"error",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Borrar",      
            //reverseButtons:true,    Para cambiar el orden de los botones Borrar y Cancelar  
        }).then(result => {
            if(result.isConfirmed){
                const products = order.filter(prod => prod._id !== id)
                //localStorage.setItem("order", JSON.stringify(updOrder));
                //const total = calculateTotal(products);
                setOrder(products);
            }
        }); 
    }

   async function postOrder(){
       try {
         if(!user || !token)  {
            Swal.fire({
                title: "Error",
                text:"Debe estar logueado para realizar una orden",
                icon: "warning",
                timer: 400
            })
            return 
         } 
         const products = order.map(item =>{
            return {
                quantity: item.quantity,
                product: item._id,
                price: item.price
            }
        
         })
         const nuevaOrden = {
            total,
            user: user._id,
            products
         }

         const response = await api.post("/orders", nuevaOrden);

         if(!response) throw new Error("Error al crear orden")

         Swal.fire("Orden creada", "La orden se creo correctamente", "success")

         setOrder([]);

         //REQUERIMIENTO OBLOGATORIO
         if (!user || !token) {
            Swal.fire({
                title: "Error",
                text: "Debe estar logueado para ver las órdenes",
                icon: "warning",
                timer: 400
            });
            return [];
        }

        if (!user._id) {
            Swal.fire({
                title: "Error",
                text: "Usuario no válido",
                icon: "error",
                timer: 400
            });
            return [];
        }
         const orders = await api.get(`/orders/${user._id}`)
         console.log(orders.data)
        
       } catch (error) {
         console.log(error);
        Swal.fire("Error", "Error al crear orden", "error")
       }
       
    }

    function toggleSidebarOrder(){
        setSidebarToggle(!sidebarToggle)
    }

    return (
        <OrderContext.Provider 
           value={{ order, 
                    total, 
                    sidebarToggle,
                    count,
                    addOrderItem, 
                    handleChangeQuantity,
                    removeItem,
                    toggleSidebarOrder,
                    postOrder
                 }} >
            { children }
        </OrderContext.Provider>
    )
}

