// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import LayoutProvider from './context/LayoutContext.tsx'
import CartProvider from './context/CartContext.tsx'
import { ProductSearchProvider } from './context/ProductSearchContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>
      <LayoutProvider >
        <ProductSearchProvider >
          <App />
        </ProductSearchProvider>
      </LayoutProvider >
    </CartProvider>
  </BrowserRouter>
)
