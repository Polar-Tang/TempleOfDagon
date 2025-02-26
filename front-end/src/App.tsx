import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Hell } from './pages'

export default function App() {

return (
        <Routes>
            <Route path="/infierno" element={<Hell />} />
            <Route path="/" element={<Home />} />

        </Routes>
    )
}