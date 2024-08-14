import './App.css'
import { Route, Routes } from 'react-router-dom';
import AdminProduct from './pages/admin-produt/AdminProduct';
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import ProductDetail from './pages/product-details/ProductDetail';



import AdminGuard from './services/guard/AdminGuard';
import AdminUser from './pages/admin-user/AdminUser';
import Contact from './pages/contact/Contact';
import Register from './pages/register/Register';
import Accommodation from './pages/accommodation/Accommodation';
import AcercaDe from './pages/acerca-de/AcercaDe';
import NotFound from './pages/not-found/NotFound';
import Layout from './layout/Layaut';
import Tour from './pages/tour/Tour';



function App() {
 

  return (
    <>     
        <Routes>
          <Route path='/' element={<Layout/>}>

             <Route index element={<Home />} /> 

             <Route path='contact' element={<Contact/>} />  
             <Route path='/login' element={<Login /> } />  
             <Route path='registro' element={ <Register />} />
             <Route path='acerca-de' element={ <AcercaDe />} />   
             <Route path='accommodations' element={ <Accommodation />} />  
             <Route path='tours' element={ <Tour/>} />                
             {/* Rutas con params */} 
             <Route path='product-detail/:id'element={<ProductDetail/>}  />  
          
             <Route path='admin-product' element={
               <AdminGuard>
                 {/* Componente hijo: children */}
                  <AdminProduct />                
               </AdminGuard>
             }/>

              {/* Ruta para admin users */}
              <Route path='admin-user' element={
                <AdminGuard>
                   <AdminUser/> 
                </AdminGuard>
              }/>
              <Route path='*' element={<NotFound/>} />  
          </Route>
           
        </Routes>       
        
        
      
    </>
  )
}

export default App;
