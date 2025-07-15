import { Routes, Route, useLocation } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import Billing from "./pages/Billing"
import Cart from "./pages/Cart"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminInvoices from "./pages/admin/AdminInvoices"
import Footer from "./components/Footer"
import FloatingActionButton from "./components/FloatingActionButton"
import { AdminProvider } from "./context/AdminContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <AdminProvider>
      <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
        {!isAdminRoute && <Navbar />}
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/invoices"
              element={
                <ProtectedRoute>
                  <AdminInvoices />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingActionButton />}
      </Box>
    </AdminProvider>
  )
}

export default App
