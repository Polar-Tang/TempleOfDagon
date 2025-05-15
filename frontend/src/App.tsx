import { Route, Routes } from 'react-router-dom'
import { CardDetailsForm, CardDetailsPage, CheckoutPage, ForgotPassPage, Home, LoginPage, ProductDetailPage, ProductsList, Questionnaire, RecoveryPassPage, RegisterPage } from './pages'


export default function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/passrecovery' element={<ForgotPassPage />} />
                <Route path='/store' element={<ProductsList />} />
                <Route path='/store/:id' element={<ProductDetailPage />} />
                <Route path="/passrecovery/:reset_token" element={<RecoveryPassPage />} />
                <Route path='/questionarie' element={<Questionnaire />} />
                <Route path='/new/checkout/cart' element={<CheckoutPage />} />
                <Route path='/new/checkout/order' element={<CardDetailsForm />} />
                <Route path="/new/checkout/:name" element={<CardDetailsPage />} />

            </Routes>
            
        </>
    )
}