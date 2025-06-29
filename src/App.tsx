import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Eagerly import all pages and components
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import EnhancedBarcodeScanner from './pages/EnhancedBarcodeScanner';
import StoreMap from './pages/StoreMap';
import InventoryManagement from './pages/InventoryManagement';
import Analytics from './pages/Analytics';
import OrderHistory from './pages/OrderHistory';
import AIChat from './components/AIChat';
import RaiseQuery from './pages/RaiseQuery';
import Feedback from './pages/Feedback';
import CheckoutDashboard from './pages/CheckoutDashboard';
import EmployeeProfile from './pages/EmployeeProfile';
import ReceiptViewer from './pages/ReceiptViewer';
import Receipt from './pages/Receipt';
import CartManager from './pages/CartManager';
import StoremapStaff from './pages/StoremapStaff';
import CartLidDemo from './pages/CartLidDemo';

// Layout wrapper (optional)
const AppLayout = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Notification type
type Notification = { id: number; message: string };

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const removeNotification = (id: number) =>
    setNotifications((n) => n.filter((noti) => noti.id !== id));

  return (
    <>
      <AIChat />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/enhanced-scanner" element={<EnhancedBarcodeScanner />} />
        <Route path="/store-map" element={<StoreMap />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/raise-query" element={<RaiseQuery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/receipts" element={<Receipt />} />
        <Route path="/checkout" element={<CheckoutDashboard />} />
        <Route path="/cart-manager" element={<CartManager />} />
        <Route path="/profile" element={<EmployeeProfile />} />
        <Route path="/receipt/:receiptId" element={<ReceiptViewer />} />
        <Route path="/store-map-staff" element={<StoremapStaff/>} />
        <Route path="/cart-lid-demo" element={<CartLidDemo />} />

      </Routes>
    </>
  );
}

export default App;