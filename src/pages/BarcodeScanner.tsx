import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scan, CheckCircle, ShoppingCart, Package, Zap } from 'lucide-react';

const BarcodeScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  type Product = {
    id: number;
    name: string;
    price: number;
    barcode: string;
    image: string;
    carbonFootprint: string;
  };
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [cartLidOpen, setCartLidOpen] = useState(false);

  const mockProducts = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 4.99,
      barcode: '123456789012',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Low'
    },
    {
      id: 2,
      name: 'Whole Milk',
      price: 3.49,
      barcode: '123456789013',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Medium'
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      setScannedProduct(randomProduct);
      setIsScanning(false);
      setCartLidOpen(true);
      setTimeout(() => setCartLidOpen(false), 3000);
    }, 2000);
  };

  const addToCart = () => {
    // Simulate adding to cart
    setTimeout(() => {
      navigate('/cart');
    }, 500);
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
              <h1 className="text-xl font-bold text-gray-800">Barcode Scanner</h1>
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
        {/* Scanner Interface */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Cart Scanner</h2>
          <p className="text-gray-600 text-lg">Scan products to automatically open your cart and add items</p>
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

        {/* Cart Lid Animation */}
        {cartLidOpen && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 shadow-xl border border-emerald-100 mb-8 animate-bounce">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">Cart Lid Opened!</h3>
                <p className="text-gray-600">Product automatically added to your cart</p>
              </div>
            </div>
          </div>
        )}

        {/* Scanned Product */}
        {scannedProduct && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800">Product Scanned Successfully!</h3>
            </div>
            
            <div className="mt-6 flex items-center space-x-6">
              <img
                src={scannedProduct.image}
                alt={scannedProduct.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-800">{scannedProduct.name}</h4>
                <p className="text-gray-600 mb-2">Barcode: {scannedProduct.barcode}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-emerald-600">${scannedProduct.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    scannedProduct.carbonFootprint === 'Low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {scannedProduct.carbonFootprint} Carbon
                  </span>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Position Product</h3>
            <p className="text-gray-600">Hold the product's barcode in front of the scanner</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto Scan</h3>
            <p className="text-gray-600">The system automatically detects and scans the barcode</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cart Opens</h3>
            <p className="text-gray-600">Your smart cart lid opens and the item is added automatically</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Smart Cart Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Automatic Opening</h4>
                <p className="text-gray-600">Cart lid opens automatically when you scan</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Instant Addition</h4>
                <p className="text-gray-600">Products added to cart automatically</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Fast Scanning</h4>
                <p className="text-gray-600">Lightning-fast barcode recognition</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Real-time Updates</h4>
                <p className="text-gray-600">Cart contents updated in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;