import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Navigation, Zap, Clock, ShoppingCart, Wifi, Car, Users, Star, Filter, Route, AlertCircle } from 'lucide-react';

type ProductInfo = {
  section: string;
  position: { x: number; y: number };
  shelf: string;
  category: string;
  price: string;
  inStock: boolean;
};

const StoreMap = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPath, setShowPath] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState({ x: 50, y: 95 }); // Starting at entrance
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  // Realistic store sections with proper positioning
  const storeSections = [
    // Entrance and Service Areas
    { id: 'entrance', name: 'Main Entrance', color: 'bg-gray-300', position: { x: 45, y: 90, width: 10, height: 8 }, type: 'entrance' },
    { id: 'customer-service', name: 'Customer Service', color: 'bg-blue-300', position: { x: 5, y: 85, width: 15, height: 8 }, type: 'service' },
    { id: 'pharmacy', name: 'Pharmacy', color: 'bg-red-200', position: { x: 80, y: 85, width: 15, height: 8 }, type: 'service' },
    
    // Fresh Departments
    { id: 'produce', name: 'Fresh Produce', color: 'bg-green-200', position: { x: 5, y: 5, width: 25, height: 25 }, type: 'fresh', aisle: 'A' },
    { id: 'deli', name: 'Deli & Hot Foods', color: 'bg-yellow-200', position: { x: 35, y: 5, width: 20, height: 15 }, type: 'fresh', aisle: 'B' },
    { id: 'bakery', name: 'Bakery', color: 'bg-orange-200', position: { x: 60, y: 5, width: 15, height: 15 }, type: 'fresh', aisle: 'C' },
    { id: 'meat', name: 'Meat & Seafood', color: 'bg-red-200', position: { x: 80, y: 5, width: 15, height: 25 }, type: 'fresh', aisle: 'D' },
    
    // Grocery Aisles
    { id: 'aisle-1', name: 'Cereal & Breakfast', color: 'bg-purple-100', position: { x: 10, y: 35, width: 80, height: 6 }, type: 'aisle', aisle: '1' },
    { id: 'aisle-2', name: 'Canned Goods & Soup', color: 'bg-blue-100', position: { x: 10, y: 43, width: 80, height: 6 }, type: 'aisle', aisle: '2' },
    { id: 'aisle-3', name: 'Pasta & International', color: 'bg-green-100', position: { x: 10, y: 51, width: 80, height: 6 }, type: 'aisle', aisle: '3' },
    { id: 'aisle-4', name: 'Snacks & Beverages', color: 'bg-yellow-100', position: { x: 10, y: 59, width: 80, height: 6 }, type: 'aisle', aisle: '4' },
    
    // Refrigerated & Frozen
    { id: 'dairy', name: 'Dairy & Eggs', color: 'bg-blue-200', position: { x: 5, y: 70, width: 40, height: 10 }, type: 'cold', aisle: 'E' },
    { id: 'frozen', name: 'Frozen Foods', color: 'bg-cyan-200', position: { x: 50, y: 70, width: 45, height: 10 }, type: 'cold', aisle: 'F' },
    
    // Checkout
    { id: 'checkout', name: 'Checkout Lanes', color: 'bg-purple-200', position: { x: 25, y: 82, width: 50, height: 6 }, type: 'checkout' },
  ];

  // Comprehensive product database with realistic locations
  const productDatabase = {
    // Produce
    'Organic Bananas': { section: 'produce', position: { x: 12, y: 15 }, shelf: 'Display Rack A1', category: 'produce', price: '$3.49/lb', inStock: true },
    'Fresh Strawberries': { section: 'produce', position: { x: 20, y: 12 }, shelf: 'Display Rack A2', category: 'produce', price: '$4.99/lb', inStock: true },
    'Organic Spinach': { section: 'produce', position: { x: 15, y: 20 }, shelf: 'Refrigerated A3', category: 'produce', price: '$2.99/bag', inStock: true },
    'Red Bell Peppers': { section: 'produce', position: { x: 25, y: 18 }, shelf: 'Display Rack A4', category: 'produce', price: '$1.99/lb', inStock: false },
    
    // Dairy
    'Whole Milk': { section: 'dairy', position: { x: 15, y: 75 }, shelf: 'Refrigerated E1', category: 'dairy', price: '$3.29/gal', inStock: true },
    'Greek Yogurt': { section: 'dairy', position: { x: 25, y: 75 }, shelf: 'Refrigerated E2', category: 'dairy', price: '$5.99/pack', inStock: true },
    'Organic Eggs': { section: 'dairy', position: { x: 35, y: 75 }, shelf: 'Refrigerated E3', category: 'dairy', price: '$4.49/dozen', inStock: true },
    'Butter': { section: 'dairy', position: { x: 40, y: 75 }, shelf: 'Refrigerated E4', category: 'dairy', price: '$4.99/lb', inStock: true },
    
    // Bakery
    'Artisan Bread': { section: 'bakery', position: { x: 65, y: 10 }, shelf: 'Bakery Display C1', category: 'bakery', price: '$3.99/loaf', inStock: true },
    'Chocolate Croissants': { section: 'bakery', position: { x: 70, y: 12 }, shelf: 'Bakery Display C2', category: 'bakery', price: '$2.49/each', inStock: true },
    
    // Meat & Seafood
    'Salmon Fillet': { section: 'meat', position: { x: 85, y: 15 }, shelf: 'Seafood Counter D1', category: 'meat', price: '$12.99/lb', inStock: true },
    'Ground Beef': { section: 'meat', position: { x: 87, y: 20 }, shelf: 'Meat Counter D2', category: 'meat', price: '$6.99/lb', inStock: true },
    
    // Aisles
    'Cheerios Cereal': { section: 'aisle-1', position: { x: 20, y: 38 }, shelf: 'Aisle 1, Shelf B3', category: 'pantry', price: '$4.99/box', inStock: true },
    'Tomato Soup': { section: 'aisle-2', position: { x: 30, y: 46 }, shelf: 'Aisle 2, Shelf C2', category: 'pantry', price: '$1.29/can', inStock: true },
    'Spaghetti Pasta': { section: 'aisle-3', position: { x: 40, y: 54 }, shelf: 'Aisle 3, Shelf A1', category: 'pantry', price: '$1.99/box', inStock: true },
    'Coca Cola': { section: 'aisle-4', position: { x: 50, y: 62 }, shelf: 'Aisle 4, Shelf D4', category: 'beverages', price: '$5.99/12-pack', inStock: true },
    
    // Frozen
    'Ben & Jerry\'s Ice Cream': { section: 'frozen', position: { x: 70, y: 75 }, shelf: 'Frozen Aisle F3', category: 'frozen', price: '$5.49/pint', inStock: true },
    'Frozen Pizza': { section: 'frozen', position: { x: 60, y: 75 }, shelf: 'Frozen Aisle F1', category: 'frozen', price: '$3.99/each', inStock: true },
  };

  const categories = [
    { id: 'all', name: 'All Products', color: 'gray' },
    { id: 'produce', name: 'Fresh Produce', color: 'green' },
    { id: 'dairy', name: 'Dairy & Eggs', color: 'blue' },
    { id: 'meat', name: 'Meat & Seafood', color: 'red' },
    { id: 'bakery', name: 'Bakery', color: 'orange' },
    { id: 'pantry', name: 'Pantry Items', color: 'purple' },
    { id: 'frozen', name: 'Frozen Foods', color: 'cyan' },
    { id: 'beverages', name: 'Beverages', color: 'yellow' }
  ];

  const filteredProducts = Object.keys(productDatabase).filter(product => {
    const matchesSearch = product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || productDatabase[product].category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateDistance = (from, to) => {
    return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  };

  const calculateWalkingTime = (distance) => {
    // Assuming average walking speed in store is about 3 feet per second
    // Map units roughly correspond to feet
    return Math.ceil(distance * 2); // seconds
  };

  const handleProductSearch = (product) => {
    setSelectedProduct(product);
    setSearchTerm('');
    const productLocation = productDatabase[product].position;
    const distance = calculateDistance(userLocation, productLocation);
    const time = calculateWalkingTime(distance);
    setEstimatedTime(time);
    setShowPath(true);
    
    // Simulate user movement over time
    setTimeout(() => {
      setShowPath(false);
    }, 5000);
  };

  const getPathPoints = () => {
    if (!selectedProduct) return [];
    const target = productDatabase[selectedProduct].position;
    
    // Simple pathfinding - go to end of current aisle, then to target aisle
    const path = [
      userLocation,
      { x: userLocation.x, y: 82 }, // Go to main walkway
      { x: target.x, y: 82 }, // Navigate along walkway
      target // Final destination
    ];
    
    return path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/customer')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">SmartMart Navigator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                <Wifi className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-emerald-700 font-medium">Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Navigation className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-gray-600">Live Navigation</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search Section */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Product Finder</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>142 shoppers in store</span>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search over 15,000 products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
              <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? `bg-${category.color}-500 text-white`
                      : `bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Product Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product}
                  onClick={() => handleProductSearch(product)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 text-left ${
                    selectedProduct === product
                      ? 'bg-emerald-500 text-white'
                      : productDatabase[product].inStock
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <div className="font-medium">{product}</div>
                  <div className="text-xs opacity-75">{productDatabase[product].price}</div>
                  {!productDatabase[product].inStock && (
                    <div className="text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Out of Stock
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Store Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Interactive Store Map</h3>
                <div className="flex items-center space-x-4">
                  {estimatedTime && (
                    <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700 font-medium">{estimatedTime}s walk</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Your Location</span>
                  </div>
                </div>
              </div>
              
              {/* Interactive Map */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200" style={{ height: '600px' }}>
                {/* Store Sections */}
                {storeSections.map((section) => (
                  <div
                    key={section.id}
                    className={`absolute ${section.color} rounded-lg flex items-center justify-center border-2 border-gray-300 hover:border-emerald-400 transition-all cursor-pointer shadow-sm hover:shadow-md`}
                    style={{
                      left: `${section.position.x}%`,
                      top: `${section.position.y}%`,
                      width: `${section.position.width}%`,
                      height: `${section.position.height}%`
                    }}
                    title={section.name}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-800 text-xs md:text-sm">
                        {section.aisle && `${section.aisle}`}
                      </div>
                      <div className="text-xs text-gray-600 hidden md:block">
                        {section.name.length > 15 ? section.name.substring(0, 15) + '...' : section.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Walking Path */}
                {showPath && selectedProduct && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                              refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                      </marker>
                    </defs>
                    {getPathPoints().slice(0, -1).map((point, index) => {
                      const nextPoint = getPathPoints()[index + 1];
                      return (
                        <line
                          key={index}
                          x1={`${point.x}%`}
                          y1={`${point.y}%`}
                          x2={`${nextPoint.x}%`}
                          y2={`${nextPoint.y}%`}
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="8,4"
                          markerEnd="url(#arrowhead)"
                          className="animate-pulse"
                        />
                      );
                    })}
                  </svg>
                )}

                {/* User Location */}
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10"
                  style={{
                    left: `${userLocation.x}%`,
                    top: `${userLocation.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-25 animate-ping -top-2 -left-2"></div>
                </div>

                {/* Selected Product Marker */}
                {selectedProduct && productDatabase[selectedProduct] && (
                  <div
                    className="absolute w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg z-10 animate-bounce"
                    style={{
                      left: `${productDatabase[selectedProduct].position.x}%`,
                      top: `${productDatabase[selectedProduct].position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                      <div className="font-medium">{selectedProduct}</div>
                      <div className="text-xs opacity-90">{productDatabase[selectedProduct].price}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-500"></div>
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                {selectedProduct && (
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setShowPath(!showPath)}
                      className="bg-emerald-500 text-white p-3 rounded-lg shadow-lg hover:bg-emerald-600 transition-colors"
                    >
                      <Route className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigate('/scanner')}
                      className="bg-purple-500 text-white p-3 rounded-lg shadow-lg hover:bg-purple-600 transition-colors"
                    >
                      <Zap className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Store Legend */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>You are here</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span>Selected product</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-1 bg-emerald-500"></div>
                      <span>Walking path</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Product Information */}
          <div className="space-y-6">
            {selectedProduct ? (
              <>
                {/* Product Details */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-emerald-500" />
                    <h3 className="text-xl font-bold text-gray-800">Product Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{selectedProduct}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xl font-bold text-emerald-600">{productDatabase[selectedProduct].price}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          productDatabase[selectedProduct].inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {productDatabase[selectedProduct].inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Location:</h5>
                      <p className="text-gray-600 text-sm">{productDatabase[selectedProduct].shelf}</p>
                    </div>

                    {estimatedTime && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Navigation:</h5>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700">Estimated walk time: {estimatedTime} seconds</span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setShowPath(!showPath)}
                        className={`py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          showPath 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        <Route className="h-4 w-4" />
                        <span>{showPath ? 'Hide Path' : 'Show Path'}</span>
                      </button>
                      <button
                        onClick={() => navigate('/enhanced-scanner')}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Similar Products */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Nearby Products</h3>
                  <div className="space-y-3">
                    {Object.keys(productDatabase)
                      .filter(product => 
                        product !== selectedProduct && 
                        productDatabase[product].section === productDatabase[selectedProduct].section
                      )
                      .slice(0, 3)
                      .map(product => (
                        <button
                          key={product}
                          onClick={() => handleProductSearch(product)}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">{product}</div>
                          <div className="text-xs text-gray-600">{productDatabase[product].price}</div>
                        </button>
                      ))
                    }
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Find Any Product</h3>
                  <p className="text-gray-600">Search or browse categories to locate products in our store</p>
                </div>
              </div>
            )}

            {/* Store Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-xl border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Store Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15,000+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Checkout Lanes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">65,000</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">142</div>
                  <div className="text-sm text-gray-600">Shoppers Now</div>
                </div>
              </div>
              
              {/* Store Hours */}
              <div className="mt-6 bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Store Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mon - Fri</span>
                    <span className="font-medium text-gray-800">6:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-800">6:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-800">7:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Services */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Store Services</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Rx</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Pharmacy</div>
                    <div className="text-xs text-gray-600">Open until 9 PM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">🥪</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Deli Counter</div>
                    <div className="text-xs text-gray-600">Fresh sandwiches & salads</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Car className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Curbside Pickup</div>
                    <div className="text-xs text-gray-600">Order online, pickup outside</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Customer Service</div>
                    <div className="text-xs text-gray-600">Returns & support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 rounded-2xl p-8 shadow-xl border border-purple-100">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Smart Shopping Experience</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the future of grocery shopping with our AI-powered navigation and smart cart technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Precision Mapping</h4>
              <p className="text-gray-600 text-sm">Locate any product with centimeter-level accuracy using our advanced indoor positioning system</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Smart Navigation</h4>
              <p className="text-gray-600 text-sm">Get optimal routes that avoid crowded aisles and minimize your shopping time</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">AI-Powered Search</h4>
              <p className="text-gray-600 text-sm">Find products by name, brand, dietary needs, or even describe what you're looking for</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Smart Cart Sync</h4>
              <p className="text-gray-600 text-sm">Your shopping list syncs with smart carts that guide you and automatically scan items</p>
            </div>
          </div>
        </div>

        {/* Real-time Updates */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-yellow-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Live Store Updates</h4>
                <p className="text-gray-600 text-sm">Real-time inventory and crowd density information</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Last updated</div>
              <div className="font-medium text-gray-800">2 minutes ago</div>
            </div>
          </div>
          
          {/* Live notifications */}
          <div className="mt-4 space-y-2">
            <div className="bg-white/80 rounded-lg p-3 flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Fresh produce section restocked - Organic strawberries now available</span>
            </div>
            <div className="bg-white/80 rounded-lg p-3 flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Checkout lanes 3-5 have shortest wait times (under 2 minutes)</span>
            </div>
            <div className="bg-white/80 rounded-lg p-3 flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Special offer: 20% off bakery items in the next hour</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;