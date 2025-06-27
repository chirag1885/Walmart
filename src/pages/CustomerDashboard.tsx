import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Scan,
  MapPin,
  MessageSquare,
  CreditCard,
  Receipt,
  User,
  Bell,
  Search,
  Grid,
  List,
  LogOut,
  Leaf,
  Mic,
} from "lucide-react";
import VoiceAssistant from "../components/VoiceAssistant";
import NotificationPanel from "../components/NotificationPanel";
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [cartItems] = useState(4);
  const [notifications] = useState(2);
  const [viewMode, setViewMode] = useState("grid");
  const cartNumber = localStorage.getItem("cartNumber") || "CART-001";
  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("cartNumber");
    navigate("/login");
  };
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // Sample notifications data
  const [notificationsData, setNotificationsData] = useState([
    {
      id: 1,
      type: "offer",
      title: "Weekend Special",
      message: "Get 20% off on all organic fruits this weekend!",
      time: "2 hours ago",
      read: false,
      link: "/catalog?filter=organic",
      discount: "20%",
    },
    {
      id: 2,
      type: "info",
      title: "Store Hours Updated",
      message: "Our store will now be open until 10 PM on weekdays.",
      time: "1 day ago",
      read: true,
      link: null,
    },
    {
      id: 3,
      type: "order",
      title: "Order #12345 Shipped",
      message: "Your recent order has been shipped and will arrive tomorrow.",
      time: "2 days ago",
      read: false,
      link: "/order-history",
    },
    {
      id: 4,
      type: "reminder",
      title: "Items in Cart",
      message:
        "You have items waiting in your cart. Complete your purchase now!",
      time: "3 days ago",
      read: false,
      link: "/cart",
    },
  ]);

  // Toggle notification panel
  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  // Close notification panel
  const closeNotificationPanel = () => {
    setIsNotificationPanelOpen(false);
  };

  // Mark notification as read
  const handleMarkAsRead = (id) => {
    setNotificationsData((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationsData((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotificationsData([]);
  };

  const quickActions = [
    {
      icon: Scan,
      label: "Enhanced Scanner",
      path: "/enhanced-scanner",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Mic,
      label: "Voice Assistant",
      path: "#",
      color: "from-purple-500 to-purple-600",
      isComponent: true,
    },
    {
      icon: MapPin,
      label: "Store Map",
      path: "/store-map",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      label: "Feedback",
      path: "/feedback",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: MessageSquare,
      label: "Raise Queries",
      path: "/raise-query",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Receipt,
      label: "Order History",
      path: "/order-history",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c0e6d0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #89d9a8;
        }
      `}</style>
      {/* Notification Panel */}
      <NotificationPanel
        notifications={notificationsData}
        isOpen={isNotificationPanelOpen}
        onClose={closeNotificationPanel}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  SmartStore
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Customer Portal</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-emerald-600 font-medium">
                Cart: {cartNumber}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={toggleNotificationPanel}
              >
                <Bell className="h-5 w-5" />
                {notificationsData.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationsData.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, Mahak!
          </h1>
          <p className="text-gray-600 text-lg">
            Ready for a smart shopping experience?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              action.isComponent ? (
                <div 
                  key={index}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group"
                >
                  <VoiceAssistant 
                    mode="button" 
                    onSpeechResult={(text) => console.log("Voice result:", text)} 
                  />
                </div>
              ) : (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {action.label}
                  </span>
                  {action.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {action.badge}
                    </span>
                  )}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Products */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Featured Products
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-emerald-100 text-emerald-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-emerald-100 text-emerald-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate("/catalog")}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Organic Product {item}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Fresh, locally sourced
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">
                        $4.99
                      </span>
                      <div className="flex items-center space-x-1">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">
                          Eco-friendly
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Products */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Find Products
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Organic", "Dairy", "Bakery", "Frozen", "Beverages"].map(
                  (category) => (
                    <button
                      key={category}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm hover:bg-emerald-200 transition-colors"
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Current Cart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    Current Cart
                  </h3>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                    6 items
                  </span>
                </div>
              </div>

              {/* Cart Items Section - Scrollable */}
              <div className="mb-6">
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-xs text-gray-500">
                            (before tax)
                          </span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          $32.96
                        </span>
                      </div>

                      {/* Cart Items with Product Details */}
                      <div className="space-y-4 mb-4">
                        {/* Product 1 */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-md flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Organic Spinach
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $3.99 × 1
                                </span>
                                <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                                  Organic
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $3.99
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product 2 */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Whole Grain Bread
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $4.49 × 2
                                </span>
                                <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">
                                  Bakery
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $8.98
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product 3 */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Organic Blueberries
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $5.99 × 1
                                </span>
                                <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                                  Organic
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $5.99
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product 4 (to demonstrate scrolling) */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-md flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-orange-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Organic Avocados
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $2.75 × 2
                                </span>
                                <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                                  Organic
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $5.50
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product 5 */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-red-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Cherry Tomatoes
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $3.49 × 1
                                </span>
                                <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                                  Organic
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $3.49
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product 6 */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 group hover:border-emerald-200 transition-all">
                          <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-md flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">
                              Free Range Eggs
                            </h4>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  $4.99 × 1
                                </span>
                                <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">
                                  Fresh
                                </span>
                              </div>
                              <span className="font-semibold text-emerald-600">
                                $4.99
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Your cart is empty
                    </p>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              {cartItems > 0 && (
                <div className="mt-4 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-emerald-700">
                      $32.96
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-200/50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                  <div className="flex items-center justify-center mt-2 gap-2 text-xs text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-emerald-500"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>
              )}
            </div>

            {/* Eco Score */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Eco Score</h3>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                85/100
              </div>
              <p className="text-sm text-gray-600">
                Great job! You're making eco-friendly choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
