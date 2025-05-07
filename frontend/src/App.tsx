import { Route, Routes } from 'react-router-dom'
import { ForgotPassPage, Home, LoginPage, ProductDetailPage, ProductsList, RecoveryPassPage, RegisterPage, SocketPage } from './pages'

export default function App() {

return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/registrar' element={<RegisterPage/>} />
            <Route path='/recuperarcontraseña' element={<ForgotPassPage/>} />
            <Route path='/tienda' element={<ProductsList/>} /> 
            <Route path='/tienda/:id' element={<ProductDetailPage/>} />
            <Route path="/recuperarpass/:reset_token" element={<RecoveryPassPage />} />
            <Route path='/chat' element={<SocketPage/>} />

        </Routes>
    )
}