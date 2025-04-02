import { Route, Routes } from 'react-router-dom'
import { ForgotPassPage, Home, LoginPage, ProductDetailPage, ProductsList, RegisterPage } from './pages'

export default function App() {

return (
        <Routes>
            {/* <Route path="/infierno" element={<Hell />} /> */}
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/registrar' element={<RegisterPage/>} />
            <Route path='/recuprarcontraseña' element={<ForgotPassPage/>} />
            <Route path='/tienda' element={<ProductsList/>} /> 
            <Route path='/tienda/:id' element={<ProductDetailPage/>} />
        </Routes>
    )
}