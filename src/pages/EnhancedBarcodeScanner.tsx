import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Scan,
  CheckCircle,
  ShoppingCart,
  Package,
  ArrowUp,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  Camera,
  Scale,
  AlertTriangle,
  Shield,
  Eye,
  Zap,
  X,
  RefreshCw
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  barcode: string;
  image: string;
  carbonFootprint: string;
  description: string;
  weight: string;
  expectedWeight: number; // in grams
  origin: string;
  location: string;
  category: string;
};

type SensorStatus = {
  camera: 'idle' | 'detecting' | 'matched' | 'mismatch';
  weight: 'idle' | 'detecting' | 'matched' | 'mismatch';
  barcode: 'idle' | 'scanning' | 'scanned';
};

type ScanResult = {
  success: boolean;
  product: Product | null;
  mismatches: string[];
  detectedWeight?: number;
  detectedImage?: string;
};

const EnhancedBarcodeScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(0);
  const [sensorStatus, setSensorStatus] = useState<SensorStatus>({
    camera: 'idle',
    weight: 'idle',
    barcode: 'idle',
  });
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);
  const [detectedWeight, setDetectedWeight] = useState<number | null>(null);
  const [scanningPhase, setScanningPhase] = useState<'idle' | 'barcode' | 'confirmBarcode' | 'camera' | 'addToCartPopup' | 'weight' | 'validation' | 'complete'>('idle');
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const addToCartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mockProducts = [
    {
      id: 1,
      name: "Hershey's",
      price: 180,
      barcode: '123456789012',
      image:
        'https://m.media-amazon.com/images/I/617Y9Xm67eL.jpg',
      carbonFootprint: 'Low',
      description: 'Fresh organic bananas, locally sourced',
      weight: '623gm',
      expectedWeight: 544, // grams
      origin: 'Local Farm',
      location: 'Aisle 3, Shelf B',
      category: 'Chocolate',
    },
    {
      id: 2,
      name: 'Kissan Ketchup',
      price: 14,
      barcode: '123456789013',
      image:
        'https://www.bbassets.com/media/uploads/p/l/293385_24-kissan-fresh-tomato-ketchup.jpg',
      carbonFootprint: 'Medium',
      description: 'Fresh whole milk from local dairy',
      weight: '90g',
      expectedWeight: 180, // grams
      origin: 'Local Dairy',
      location: 'Aisle 1, Refrigerated',
      category: 'Condiment',
    },
    {
      id: 3,
      name: 'Maggi Noodles',
      price: 28,
      barcode: '123456789014',
      image:
        'https://m.media-amazon.com/images/I/71Y7pDHbi8L.jpg',
      carbonFootprint: 'Low',
      description: 'Fresh organic red apples',
      weight: '70g',
      expectedWeight: 70, // grams
      origin: 'Local Orchard',
      location: 'Aisle 3, Shelf A',
      category: 'Noodles',
    },
  ];

  const directions = [
    { icon: ArrowUp, text: 'Walk straight ahead', distance: '20 feet' },
    { icon: ArrowRight, text: 'Turn right at the end', distance: '10 feet' },
    { icon: ArrowLeftIcon, text: 'Turn left into Aisle 3', distance: '5 feet' },
    { icon: ArrowUp, text: 'Product is on your right', distance: 'Arrived' },
  ];

  // Simulate sensor detection with realistic delays and potential mismatches
  const simulateSensorDetection = async (
    product: Product
  ): Promise<ScanResult> => {
    const mismatches: string[] = [];

    // Simulate random chance of mismatches for demonstration
    const weightMismatch = Math.random() < 0.3; // 30% chance
    const cameraMismatch = Math.random() < 0.2; // 20% chance

    // Simulate detected weight (with potential variance)
    const weightVariance = weightMismatch ? 0.4 : 0.1; // 40% vs 10% variance
    const detectedWeight =
      product.expectedWeight * (1 + (Math.random() - 0.5) * weightVariance);

    // Check weight sensor
    const weightTolerance = product.expectedWeight * 0.15; // 15% tolerance
    if (Math.abs(detectedWeight - product.expectedWeight) > weightTolerance) {
      mismatches.push(
        `Weight mismatch: Expected ${product.expectedWeight}g, detected ${Math.round(
          detectedWeight
        )}g`
      );
    }

    // Check camera sensor (simulate visual recognition)
    if (cameraMismatch) {
      mismatches.push(
        `Visual recognition failed: Product doesn't match expected appearance`
      );
    }

    return {
      success: mismatches.length === 0,
      product,
      mismatches,
      detectedWeight: Math.round(detectedWeight),
      detectedImage: product.image,
    };
  };

  // Accelerate the process phases durations to make scanning faster
  // Implement the new process:
  // 1. Barcode scan -> show confirmation popup to confirm product
  // 2. When confirmed, run camera sensor
  // 3. Show pop up "Add item to the cart" for 5 seconds
  // 4. Then run weight checked sensor
  // 5. After weight check, finalize scan results and show mismatch modal if needed

  const handleScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    setShowMismatchAlert(false);
    setShowConfirmation(false);
    setShowAddToCartPopup(false);
    setDetectedWeight(null);
    setScanningPhase('barcode');

    // Reset sensor status
    setSensorStatus({
      camera: 'idle',
      weight: 'idle',
      barcode: 'scanning',
    });

    // Phase 1: Barcode scanning (fast)
    await new Promise((resolve) => setTimeout(resolve, 700)); // faster 700ms delay
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setScannedProduct(randomProduct);
    setSensorStatus((prev) => ({ ...prev, barcode: 'scanned' }));
    setScanningPhase('confirmBarcode');

    // Pause here to confirm - do not auto run camera yet
    setIsScanning(false);
    setShowConfirmation(true);
  };

  // After barcode confirmation by user
  const handleConfirmBarcode = async () => {
    setShowConfirmation(false);
    setIsScanning(true);
    setScanningPhase('camera');
    setSensorStatus((prev) => ({ ...prev, camera: 'detecting' }));

    // Simulate fast camera detection (1s)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSensorStatus((prev) => ({ ...prev, camera: 'matched' }));
    setScanningPhase('addToCartPopup');
    setIsScanning(false);

    setShowAddToCartPopup(true);

    // Show add to cart popup for exactly 5 seconds then proceed to weight check
    addToCartTimeoutRef.current = setTimeout(async () => {
      setShowAddToCartPopup(false);

      // Phase 3: Weight sensor detection start
      setIsScanning(true);
      setScanningPhase('weight');
      setSensorStatus((prev) => ({ ...prev, weight: 'detecting' }));

      // Simulate weight detection quickly (1s)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Phase 4: Validation
      setScanningPhase('validation');
      const result = await simulateSensorDetection(scannedProduct!);
      setScanResult(result);
      setDetectedWeight(result.detectedWeight || null);

      // Update sensor status based on results
      setSensorStatus({
        barcode: 'scanned',
        camera: result.mismatches.some((m) =>
          m.includes('Visual')
        )
          ? 'mismatch'
          : 'matched',
        weight: result.mismatches.some((m) => m.includes('Weight'))
          ? 'mismatch'
          : 'matched',
      });

      setScanningPhase('complete');
      setIsScanning(false);

      // Show appropriate modal or notification
      if (result.success) {
        autoAddToCart();
      } else {
        setShowMismatchAlert(true);
      }
    }, 5000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (addToCartTimeoutRef.current) {
        clearTimeout(addToCartTimeoutRef.current);
      }
    };
  }, []);

  // Auto add to cart after all successful checks
  const autoAddToCart = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      resetScanner();
    }, 3000);
  };

  // On manual confirmation override from mismatch alert
  const handleConfirmAdd = () => {
    setShowConfirmation(false);
    setShowMismatchAlert(false);
    setShowAddToCartPopup(true);
    // Show add to cart popup for 5 seconds before finishing flow
    if (addToCartTimeoutRef.current) {
      clearTimeout(addToCartTimeoutRef.current);
    }
    addToCartTimeoutRef.current = setTimeout(() => {
      setShowAddToCartPopup(false);
      resetScanner();
    }, 5000);
  };

  const resetScanner = () => {
    setScannedProduct(null);
    setScanResult(null);
    setDetectedWeight(null);
    setSensorStatus({
      camera: 'idle',
      weight: 'idle',
      barcode: 'idle',
    });
    setScanningPhase('idle');
    setShowConfirmation(false);
    setShowMismatchAlert(false);
    setShowAddToCartPopup(false);
    setIsScanning(false);
  };

  const [showNotification, setShowNotification] = useState(false);

  const handleShowDirections = () => {
    setShowDirections(true);
    setCurrentDirection(0);

    const interval = setInterval(() => {
      setCurrentDirection((prev) => {
        if (prev >= directions.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'matched':
        return 'text-green-600 bg-green-100';
      case 'mismatch':
        return 'text-red-600 bg-red-100';
      case 'detecting':
      case 'scanning':
        return 'text-blue-600 bg-blue-100 animate-pulse';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSensorIcon = (sensor: string, status: string) => {
    if (status === 'matched') return <CheckCircle className="h-4 w-4" />;
    if (status === 'mismatch') return <AlertTriangle className="h-4 w-4" />;
    if (status === 'detecting' || status === 'scanning')
      return <RefreshCw className="h-4 w-4 animate-spin" />;

    switch (sensor) {
      case 'camera':
        return <Camera className="h-4 w-4" />;
      case 'weight':
        return <Scale className="h-4 w-4" />;
      case 'barcode':
        return <Scan className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
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
              <h1 className="text-xl font-bold text-gray-800">
                BarCode Scanner
              </h1>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success notification */}
        {showNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-emerald-100 flex items-center space-x-3 z-50 animate-fade-in">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">✅ Auto-Added to Cart</p>
              <p className="text-sm text-gray-600">
                All sensors matched - {scannedProduct?.name}
              </p>
            </div>
          </div>
        )}

        {/* Add Item to Cart Popup for 5 seconds */}
        {showAddToCartPopup && scannedProduct && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-emerald-200 flex items-center space-x-4 z-50 animate-fade-in-out max-w-md">
            <CheckCircle className="h-8 w-8 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Add item to the cart</p>
              <p className="text-sm text-gray-600">{scannedProduct.name}</p>
            </div>
          </div>
        )}

        {/* Mismatch Alert Modal */}
        {showMismatchAlert && scanResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
              <div className="text-center mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  ⚠️ Sensor Mismatch Detected
                </h3>
                <p className="text-gray-600">Multiple sensors detected inconsistencies</p>
              </div>

              {/* Mismatch Details */}
              <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">Detected Issues:</h4>
                <div className="space-y-2">
                  {scanResult.mismatches.map((mismatch, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700">{mismatch}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={scanResult.product?.image}
                    alt={scanResult.product?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{scanResult.product?.name}</h4>
                    <p className="text-sm text-gray-600">{scanResult.product?.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-emerald-600">${scanResult.product?.price}</span>
                      <div className="text-xs text-gray-500">
                        Expected: {scanResult.product?.expectedWeight}g | Detected: {scanResult.detectedWeight}g
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowMismatchAlert(false);
                    resetScanner();
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel & Rescan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual Confirmation Modal (Barcode Confirmation) */}
        {showConfirmation && scannedProduct && scanningPhase === 'confirmBarcode' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Product</h3>
                <p className="text-gray-600">Please confirm this is the product you're scanning</p>
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

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    resetScanner();
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBarcode}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Confirm Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Directions Overlay */}
        {showDirections && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(directions[currentDirection].icon, {
                    className: 'h-10 w-10 text-white',
                  })}
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

        {/* Scanner Interface */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🔬Scan The Item</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
              <div className="flex flex-col items-center">
                {/* Scanner Viewfinder */}
                <div
                  className={`relative w-80 h-80 rounded-2xl border-4 border-dashed ${
                    isScanning
                      ? 'border-emerald-500 animate-pulse'
                      : 'border-gray-300'
                  } flex items-center justify-center mb-6 overflow-hidden`}
                >
                  {isScanning ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                      <p className="text-emerald-600 font-medium">
                        {(scanningPhase === 'barcode' || scanningPhase === 'confirmBarcode') &&
                          '📱 Scanning Barcode...'}
                        {scanningPhase === 'camera' && '📷 Camera Detection...'}
                        {scanningPhase === 'weight' && '⚖️ Weight Verification...'}
                        {scanningPhase === 'validation' && '🔍 Cross-Validation...'}
                        {scanningPhase === 'complete' && '✅ Scan Complete!'}
                      </p>
                    </div>
                  ) : scannedProduct ? (
                    <div className="text-center">
                      <img
                        src={scannedProduct.image}
                        alt={scannedProduct.name}
                        className="w-32 h-32 rounded-lg object-cover mx-auto mb-4"
                      />
                      <p className="text-gray-800 font-medium">{scannedProduct.name}</p>
                      <p className="text-emerald-600 font-bold">${scannedProduct.price}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Scan className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Position product for multi-sensor scan</p>
                    </div>
                  )}

                  {/* Scanning Line Animation */}
                  {isScanning && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>
                  )}
                </div>

                {/* Scan Button */}
                {!isScanning && scanningPhase === 'idle' && (
                  <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Start Multi-Sensor Scan</span>
                  </button>
                )}

                {/* Reset Button */}
                {scannedProduct && !isScanning && (
                  <button
                    onClick={resetScanner}
                    className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset Scanner</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sensor Status Panel */}
          <div className="space-y-6">
            {/* Real-time Sensor Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Sensor Status</span>
              </h3>

              <div className="space-y-4">
                {/* Barcode Sensor */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getSensorStatusColor(sensorStatus.barcode)}`}>
                      {getSensorIcon('barcode', sensorStatus.barcode)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Barcode Scanner</p>
                      <p className="text-sm text-gray-600 capitalize">{sensorStatus.barcode}</p>
                    </div>
                  </div>
                  {scannedProduct && (
                    <div className="text-xs text-gray-500">{scannedProduct.barcode}</div>
                  )}
                </div>

                {/* Camera Sensor */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getSensorStatusColor(sensorStatus.camera)}`}>
                      {getSensorIcon('camera', sensorStatus.camera)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Visual Recognition</p>
                      <p className="text-sm text-gray-600 capitalize">{sensorStatus.camera}</p>
                    </div>
                  </div>
                  {scannedProduct && (
                    <div className="text-xs text-gray-500">{scannedProduct.category}</div>
                  )}
                </div>

                {/* Weight Sensor */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getSensorStatusColor(sensorStatus.weight)}`}>
                      {getSensorIcon('weight', sensorStatus.weight)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Weight Sensor</p>
                      <p className="text-sm text-gray-600 capitalize">{sensorStatus.weight}</p>
                    </div>
                  </div>
                  {detectedWeight && (
                    <div className="text-xs text-gray-500">{detectedWeight}g</div>
                  )}
                </div>
              </div>
            </div>

            {/* Scan Results */}
            {scanResult && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  {scanResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <span>Scan Results</span>
                </h3>

                {scanResult.success ? (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-green-800 font-medium">✅ All Sensors Matched!</p>
                    <p className="text-green-600 text-sm mt-1">Product automatically added to cart</p>
                  </div>
                ) : (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-red-800 font-medium">⚠️ Sensor Mismatches Detected</p>
                    <div className="mt-2 space-y-1">
                      {scanResult.mismatches.map((mismatch, index) => (
                        <p key={index} className="text-red-600 text-xs">
                          • {mismatch}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-4">
              <button
                onClick={handleShowDirections}
                className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <ArrowUp className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Get Directions</h3>
                    <p className="text-sm text-gray-600">Navigate to product</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/store-map')}
                className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Store Map</h3>
                    <p className="text-sm text-gray-600">View layout</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔬 How Multi-Sensor Detection Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. Barcode Scan</h4>
              <p className="text-gray-600 text-sm">Identifies product from database</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">2. Visual Check</h4>
              <p className="text-gray-600 text-sm">Camera verifies product appearance</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Weight Validation</h4>
              <p className="text-gray-600 text-sm">Confirms expected product weight</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">4. Add to Cart</h4>
              <p className="text-gray-600 text-sm">
                Confirm on screen and add item after validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBarcodeScanner;