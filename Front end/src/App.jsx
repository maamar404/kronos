import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { ContactUs } from './pages/ContactUs';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/success';
import { Cancel } from './pages/cancel';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OrderHistory } from './pages/OrderHistory';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SizeGuide } from './pages/SizeGuide';
import { FAQ } from './pages/FAQ';
import { ShippingReturns } from './pages/ShippingReturns';
import { TermsConditions } from './pages/TermsConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductProvider } from './contexts/ProductContext';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import './App.css';


function App() {
  const location = useLocation();
  
  // Check if current path is admin-related
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <ProductProvider>
      <SearchProvider>
        <CartProvider>
          <UserProvider>
            <FavoritesProvider>
              <div className="min-h-screen bg-white">
                {!isAdminPage && <Navbar />}
                <ScrollToTop />
                <main className={!isAdminPage ? "pt-16" : ""}>
                  <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/success" element={<Success />} />
                      <Route path="/cancel" element={<Cancel />} />
                      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                      <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                      <Route path="/sizeguide" element={<SizeGuide/>} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/shipping" element={<ShippingReturns />} />
                      <Route path="/terms" element={<TermsConditions />} />
                      <Route path="/privacy" element={<PrivacyPolicy/>} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                  </AnimatePresence>
                  {!isAdminPage && <Footer />}
                </main>
              </div>
            </FavoritesProvider>
          </UserProvider>
        </CartProvider>
      </SearchProvider>
    </ProductProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;