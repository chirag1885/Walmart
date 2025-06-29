import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CartLid, { CartLidDesigns, CartLidWithDesign } from '../components/CartLid';

const CartLidDemo = () => {
  const navigate = useNavigate();
  const [lidStatuses, setLidStatuses] = useState({
    classic: false,
    modern: false,
    sleek: false,
    rounded: false,
    flat: false,
    custom: false
  });

  // Handle lid state change
  const handleLidChange = (lid, isOpen) => {
    setLidStatuses(prev => ({
      ...prev,
      [lid]: isOpen
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Cart Lid Designs</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Cart Lid Designs</h2>
          <p className="text-gray-600 mb-6">
            Click on any cart lid to see it open and close. These designs showcase different styles that can be used
            throughout the application. When open, the lid turns green; when closed, it turns red.
          </p>
          
          {/* Designs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Classic Design */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 mb-4">Classic Design</h3>
              <CartLid 
                onClick={(isOpen) => handleLidChange('classic', isOpen)} 
              />
              <div className="mt-4 text-sm text-gray-600">
                Status: <span className={lidStatuses.classic ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.classic ? "Open" : "Closed"}
                </span>
              </div>
            </div>
            
            {/* Modern Design */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 mb-4">Modern Design</h3>
              <div className="relative">
                <CartLidWithDesign 
                  design={CartLidDesigns.MODERN}
                  onClick={(isOpen) => handleLidChange('modern', isOpen)}
                  className="shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-bold text-white text-opacity-70">2.0</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Status: <span className={lidStatuses.modern ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.modern ? "Open" : "Closed"}
                </span>
              </div>
            </div>
            
            {/* Sleek Design */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 mb-4">Sleek Design</h3>
              <CartLidWithDesign 
                design={CartLidDesigns.SLEEK}
                onClick={(isOpen) => handleLidChange('sleek', isOpen)}
                className="border border-gray-300"
              />
              <div className="mt-4 text-sm text-gray-600">
                Status: <span className={lidStatuses.sleek ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.sleek ? "Open" : "Closed"}
                </span>
              </div>
            </div>
            
            {/* Rounded Design */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 mb-4">Rounded Design</h3>
              <CartLidWithDesign 
                design={CartLidDesigns.ROUNDED}
                onClick={(isOpen) => handleLidChange('rounded', isOpen)}
              />
              <div className="mt-4 text-sm text-gray-600">
                Status: <span className={lidStatuses.rounded ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.rounded ? "Open" : "Closed"}
                </span>
              </div>
            </div>
            
            {/* Flat Design */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 mb-4">Flat Design</h3>
              <CartLidWithDesign 
                design={CartLidDesigns.FLAT}
                onClick={(isOpen) => handleLidChange('flat', isOpen)}
              />
              <div className="mt-4 text-sm text-gray-600">
                Status: <span className={lidStatuses.flat ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.flat ? "Open" : "Closed"}
                </span>
              </div>
            </div>
            
            {/* Custom Design */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="font-semibold text-indigo-700 mb-4">Custom Design</h3>
              <CartLid 
                onClick={(isOpen) => handleLidChange('custom', isOpen)} 
                className="transform scale-110 shadow-2xl"
              />
              <div className="mt-4 text-sm text-indigo-700">
                Status: <span className={lidStatuses.custom ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {lidStatuses.custom ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Implementation Guide */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Implementation Guide</h2>
          <div className="bg-gray-50 p-4 rounded-lg overflow-auto mb-6">
            <pre className="text-sm text-gray-800">
              <code>{`import CartLid from '../components/CartLid';

// Basic usage
<CartLid />

// With status tracking
const [isLidOpen, setIsLidOpen] = useState(false);
<CartLid onClick={(isOpen) => setIsLidOpen(isOpen)} />

// For different designs
import { CartLidWithDesign, CartLidDesigns } from '../components/CartLid';

<CartLidWithDesign design={CartLidDesigns.MODERN} />
<CartLidWithDesign design={CartLidDesigns.SLEEK} />
<CartLidWithDesign design={CartLidDesigns.ROUNDED} />
<CartLidWithDesign design={CartLidDesigns.FLAT} />`}</code>
            </pre>
          </div>
          
          <p className="text-gray-600">
            You can easily integrate these cart lid designs into your existing components. The cart lid is fully interactive 
            and provides visual feedback through color changes. Use the onClick handler to track the lid state in your 
            parent components.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CartLidDemo;