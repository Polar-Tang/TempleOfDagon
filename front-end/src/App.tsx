import { Route, Routes } from 'react-router-dom'
import { Home, Hell, LoginPage } from './pages'

export default function App() {

return (
        <Routes>
            <Route path="/infierno" element={<Hell />} />
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<LoginPage/>} />
        </Routes>
    )
}