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
import Feedback from './pages/Feedback';
import AIChat from './components/AIChat';
import RaiseQuery from './pages/RaiseQuery';

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
<<<<<<< main
        <Route path="/feedback" element={<Feedback />} />
=======
        <Route path="/raise-query" element={<RaiseQuery />} />
>>>>>>> main
      </Routes>
    </>
  );
}

export default App;