import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scan, CheckCircle, ShoppingCart, Package, Zap, ArrowUp, ArrowDown, ArrowRight, ArrowLeft as ArrowLeftIcon } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  barcode: string;
  image: string;
  carbonFootprint: string;
  description: string;
  weight: string;
  origin: string;
  location: string;
};

const EnhancedBarcodeScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(0);

  const mockProducts = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 4.99,
      barcode: '123456789012',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Low',
      description: 'Fresh organic bananas, locally sourced',
      weight: '1.2 lbs',
      origin: 'Local Farm',
      location: 'Aisle 3, Shelf B'
    },
    {
      id: 2,
      name: 'Whole Milk',
      price: 3.49,
      barcode: '123456789013',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Medium',
      description: 'Fresh whole milk from local dairy',
      weight: '1 gallon',
      origin: 'Local Dairy',
      location: 'Aisle 1, Refrigerated'
    }
  ];

  const directions = [
    { icon: ArrowUp, text: 'Walk straight ahead', distance: '20 feet' },
    { icon: ArrowRight, text: 'Turn right at the end', distance: '10 feet' },
    { icon: ArrowLeftIcon, text: 'Turn left into Aisle 3', distance: '5 feet' },
    { icon: ArrowUp, text: 'Product is on your right', distance: 'Arrived' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      setScannedProduct(randomProduct);
      setIsScanning(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handleConfirmAdd = () => {
    setShowConfirmation(false);
    // Simulate adding to cart
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleShowDirections = () => {
    setShowDirections(true);
    setCurrentDirection(0);
    
    // Simulate step-by-step directions
    const interval = setInterval(() => {
      setCurrentDirection(prev => {
        if (prev >= directions.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
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
              <h1 className="text-xl font-bold text-gray-800">Smart Scanner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Directions Overlay */}
        {showDirections && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(directions[currentDirection].icon, { className: "h-10 w-10 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {directions[currentDirection].text}
                </h3>
                <p className="text-gray-600 mb-4">{directions[currentDirection].distance}</p>
                <div className="flex justify-center space-x-2 mb-6">
                  {directions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentDirection ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {currentDirection === directions.length - 1 && (
                  <button
                    onClick={() => setShowDirections(false)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    Arrived!
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product Confirmation Modal */}
        {showConfirmation && scannedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Product Scanned!</h3>
                <p className="text-gray-600">Confirm to add this item to your cart</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={scannedProduct.image}
                    alt={scannedProduct.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{scannedProduct.name}</h4>
                    <p className="text-sm text-gray-600">{scannedProduct.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-emerald-600">${scannedProduct.price}</span>
                      <span className="text-sm text-gray-500">{scannedProduct.weight}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="font-medium text-blue-800">Origin</p>
                  <p className="text-blue-600">{scannedProduct.origin}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="font-medium text-green-800">Carbon Impact</p>
                  <p className="text-green-600">{scannedProduct.carbonFootprint}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scanner Interface */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Cart Scanner</h2>
          <p className="text-gray-600 text-lg">Scan products for instant cart addition with confirmation</p>
        </div>

        {/* Scanner Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
          <div className="flex flex-col items-center">
            {/* Scanner Viewfinder */}
            <div className={`relative w-80 h-80 rounded-2xl border-4 border-dashed ${isScanning ? 'border-emerald-500 animate-pulse' : 'border-gray-300'} flex items-center justify-center mb-6`}>
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-emerald-600 font-medium">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Scan className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Position barcode in the scanner area</p>
                </div>
              )}
              
              {/* Scanning Line Animation */}
              {isScanning && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>
              )}
            </div>

            {/* Scan Button */}
            <button
              onClick={handleScan}
              disabled={isScanning}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 ${
                isScanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              <Scan className="h-5 w-5" />
              <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={handleShowDirections}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <ArrowUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">Get Directions</h3>
                <p className="text-gray-600">Navigate to product location</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/store-map')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">Store Map</h3>
                <p className="text-gray-600">View interactive store layout</p>
              </div>
            </div>
          </button>
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Scan Product</h3>
            <p className="text-gray-600">Hold the product's barcode in front of the scanner</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Details</h3>
            <p className="text-gray-600">Review product information and confirm addition</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto Add</h3>
            <p className="text-gray-600">Item is automatically added to your smart cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBarcodeScanner;