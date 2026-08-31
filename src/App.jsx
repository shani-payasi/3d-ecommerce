import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/shop" element={<Page><Shop /></Page>} />
            <Route path="/product/:id" element={<Page><ProductDetails /></Page>} />
            <Route path="/categories" element={<Page><Categories /></Page>} />
            <Route path="/cart" element={<Page><Cart /></Page>} />
            <Route path="/checkout" element={<Page><Checkout /></Page>} />
            <Route path="/wishlist" element={<Page><Wishlist /></Page>} />
            <Route path="/login" element={<Page><Login /></Page>} />
            <Route path="/register" element={<Page><Register /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}
