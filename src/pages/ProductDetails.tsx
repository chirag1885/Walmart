import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Leaf, ShoppingCart, Heart, Share2, Truck, Shield, Star } from 'lucide-react';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const product = {
    id: 1,
    name: 'Organic Bananas',
    price: 4.99,
    originalPrice: 5.99,
    category: 'Organic Fruits',
    location: 'Aisle 3, Shelf B',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    carbonFootprint: 'Low',
    inStock: true,
    stockLevel: 156,
    description: 'Premium organic bananas sourced directly from local sustainable farms. These bananas are perfectly ripe, naturally sweet, and packed with essential nutrients including potassium, vitamin B6, and dietary fiber.',
    nutritionalInfo: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fiber: '3.1g',
      sugar: '14g'
    },
    features: [
      'Certified Organic',
      'Locally Sourced',
      'No Pesticides',
      'Rich in Potassium',
      'Natural Ripening Process'
    ],
    rating: 4.8,
    reviews: 156
  };

  const alternatives = [
    {
      id: 2,
      name: 'Conventional Bananas',
      price: 2.99,
      carbonFootprint: 'High',
      savings: '45% less carbon footprint with organic option',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      name: 'Organic Plantains',
      price: 3.99,
      carbonFootprint: 'Low',
      savings: 'Similar carbon footprint, great alternative',
      image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/catalog')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Product Details</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-emerald-600 font-medium">{product.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price and Stock */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-emerald-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className={`h-5 w-5 ${product.carbonFootprint === 'Low' ? 'text-green-500' : 'text-yellow-500'}`} />
                  <span className="text-sm text-gray-600">{product.carbonFootprint} Carbon</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">In Stock: {product.stockLevel} units</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Available
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">Store Location</p>
                    <p className="text-gray-600">{product.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/store-map')}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-medium"
                >
                  View on Map
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-800">Quantity</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Product Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nutritional Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco-Friendly Alternatives */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Leaf className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-800">Eco-Friendly Alternatives</h3>
                </div>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {showAlternatives ? 'Hide' : 'Show'} Alternatives
                </button>
              </div>
              {showAlternatives && (
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <div key={alt.id} className="bg-white/80 rounded-xl p-4 flex items-center space-x-4">
                      <img
                        src={alt.image}
                        alt={alt.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{alt.name}</h4>
                        <p className="text-sm text-gray-600">{alt.savings}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">${alt.price}</div>
                        <div className={`text-xs ${alt.carbonFootprint === 'Low' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {alt.carbonFootprint} Carbon
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Options */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery & Pickup</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">Free Same-Day Delivery</p>
                    <p className="text-sm text-gray-600">Available for orders over $25</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-800">In-Store Pickup</p>
                    <p className="text-sm text-gray-600">Ready in 15 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;