import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Navigation, Zap } from 'lucide-react';

const StoreMap = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const aisles = [
    {
      id: 1,
      name: 'Dairy & Refrigerated',
      color: 'bg-blue-200',
      position: { x: 10, y: 20, width: 80, height: 15 },
      products: ['Milk', 'Cheese', 'Yogurt', 'Butter']
    },
    {
      id: 2,
      name: 'Bakery',
      color: 'bg-orange-200',
      position: { x: 10, y: 45, width: 80, height: 15 },
      products: ['Bread', 'Pastries', 'Muffins', 'Croissants']
    },
    {
      id: 3,
      name: 'Fresh Produce',
      color: 'bg-green-200',
      position: { x: 10, y: 70, width: 80, height: 15 },
      products: ['Bananas', 'Apples', 'Lettuce', 'Tomatoes']
    }
  ];

  const productLocations = {
    'Organic Bananas': { aisle: 3, shelf: 'A', position: { x: 15, y: 75 } },
    'Whole Milk': { aisle: 1, shelf: 'Refrigerated', position: { x: 15, y: 25 } },
    'Artisan Bread': { aisle: 2, shelf: 'B', position: { x: 15, y: 50 } },
    'Greek Yogurt': { aisle: 1, shelf: 'Refrigerated', position: { x: 45, y: 25 } },
    'Organic Apples': { aisle: 3, shelf: 'A', position: { x: 45, y: 75 } }
  };

  const handleProductSearch = (product) => {
    setSelectedProduct(product);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/customer')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Store Map</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-gray-600">Interactive Navigation</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Any Product</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(productLocations).map((product) => (
                <button
                  key={product}
                  onClick={() => handleProductSearch(product)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedProduct === product
                      ? 'bg-emerald-500 text-white'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {product}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Store Layout</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Selected Product</span>
                </div>
              </div>
              
              {/* Interactive Map */}
              <div className="relative bg-gray-50 rounded-xl p-4" style={{ height: '500px' }}>
                {/* Store Entrance */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-gray-700">Entrance</span>
                </div>

                {/* Checkout Area */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-purple-200 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-purple-800">Checkout</span>
                </div>

                {/* Aisles */}
                {aisles.map((aisle) => (
                  <div
                    key={aisle.id}
                    className={`absolute ${aisle.color} rounded-lg flex items-center justify-center border-2 border-gray-300 hover:border-emerald-400 transition-colors cursor-pointer`}
                    style={{
                      left: `${aisle.position.x}%`,
                      top: `${aisle.position.y}%`,
                      width: `${aisle.position.width}%`,
                      height: `${aisle.position.height}%`
                    }}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-800 text-sm">Aisle {aisle.id}</div>
                      <div className="text-xs text-gray-600">{aisle.name}</div>
                    </div>
                  </div>
                ))}

                {/* Product Markers */}
                {selectedProduct && productLocations[selectedProduct] && (
                  <div
                    className="absolute w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"
                    style={{
                      left: `${productLocations[selectedProduct].position.x}%`,
                      top: `${productLocations[selectedProduct].position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {selectedProduct}
                    </div>
                  </div>
                )}

                {/* Navigation Path */}
                {selectedProduct && (
                  <div className="absolute bottom-4 right-4 bg-emerald-500 text-white p-3 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4" />
                      <span className="text-sm font-medium">Navigate</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {selectedProduct ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-gray-800">Product Location</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{selectedProduct}</h4>
                    <p className="text-gray-600">
                      Aisle {productLocations[selectedProduct].aisle}, Shelf {productLocations[selectedProduct].shelf}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h5 className="font-medium text-emerald-800 mb-2">Directions:</h5>
                    <ol className="text-sm text-emerald-700 space-y-1">
                      <li>1. Enter the store through the main entrance</li>
                      <li>2. Walk straight to Aisle {productLocations[selectedProduct].aisle}</li>
                      <li>3. Look for Shelf {productLocations[selectedProduct].shelf}</li>
                      <li>4. Product will be highlighted on your smart cart display</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => navigate('/scanner')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Scan Product</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Product</h3>
                  <p className="text-gray-600">Choose a product from the search above to see its location on the map</p>
                </div>
              </div>
            )}

            {/* Store Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Store Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Aisles</span>
                  <span className="font-medium text-gray-800">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Store Size</span>
                  <span className="font-medium text-gray-800">45,000 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Products</span>
                  <span className="font-medium text-gray-800">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checkout Lanes</span>
                  <span className="font-medium text-gray-800">8</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-xl border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                {aisles.map((aisle) => (
                  <button
                    key={aisle.id}
                    className="w-full text-left p-3 bg-white/80 rounded-lg hover:bg-white transition-colors"
                  >
                    <div className="font-medium text-gray-800">Aisle {aisle.id}</div>
                    <div className="text-sm text-gray-600">{aisle.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Smart Navigation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Real-time Location</h4>
              <p className="text-gray-600 text-sm">Find any product instantly with precise location data</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Turn-by-turn</h4>
              <p className="text-gray-600 text-sm">Get step-by-step directions to your products</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Smart Search</h4>
              <p className="text-gray-600 text-sm">Search by product name, category, or brand</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Cart Integration</h4>
              <p className="text-gray-600 text-sm">Seamlessly connect with your smart cart system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;