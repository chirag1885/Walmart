import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, ShoppingCart, MapPin, Leaf, ArrowLeft } from 'lucide-react';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Products', count: 847 },
    { id: 'organic', name: 'Organic', count: 156 },
    { id: 'dairy', name: 'Dairy', count: 89 },
    { id: 'bakery', name: 'Bakery', count: 67 },
    { id: 'frozen', name: 'Frozen', count: 124 },
    { id: 'beverages', name: 'Beverages', count: 203 },
  ];

  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 4.99,
      category: 'organic',
      location: 'Aisle 3, Shelf B',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Low',
      inStock: true,
      description: 'Fresh organic bananas, locally sourced'
    },
    {
      id: 2,
      name: 'Whole Milk',
      price: 3.49,
      category: 'dairy',
      location: 'Aisle 1, Refrigerated',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Medium',
      inStock: true,
      description: 'Fresh whole milk from local farms'
    },
    {
      id: 3,
      name: 'Artisan Bread',
      price: 5.99,
      category: 'bakery',
      location: 'Aisle 2, Bakery Section',
      image: 'https://images.pexels.com/photos/209196/pexels-photo-209196.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Low',
      inStock: true,
      description: 'Freshly baked artisan bread'
    },
    {
      id: 4,
      name: 'Greek Yogurt',
      price: 6.99,
      category: 'dairy',
      location: 'Aisle 1, Refrigerated',
      image: 'https://images.pexels.com/photos/1769563/pexels-photo-1769563.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Medium',
      inStock: false,
      description: 'Creamy Greek yogurt with probiotics'
    },
    {
      id: 5,
      name: 'Organic Apples',
      price: 7.99,
      category: 'organic',
      location: 'Aisle 3, Shelf A',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Low',
      inStock: true,
      description: 'Crisp organic apples, perfect for snacking'
    },
    {
      id: 6,
      name: 'Orange Juice',
      price: 4.49,
      category: 'beverages',
      location: 'Aisle 4, Refrigerated',
      image: 'https://images.pexels.com/photos/1435738/pexels-photo-1435738.jpeg?auto=compress&cs=tinysrgb&w=400',
      carbonFootprint: 'Medium',
      inStock: true,
      description: 'Fresh squeezed orange juice'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <h1 className="text-xl font-bold text-gray-800">Product Catalog</h1>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="carbon">Sort by Eco-Friendly</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`${viewMode === 'list' ? 'flex items-center space-x-6' : ''}`}>
                {/* Product Image */}
                <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'aspect-square'} bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Leaf className={`h-4 w-4 ${product.carbonFootprint === 'Low' ? 'text-green-500' : 'text-yellow-500'}`} />
                      <span className="text-xs text-gray-600">{product.carbonFootprint} Carbon</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.location}</span>
                    <button
                      onClick={() => navigate('/store-map')}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      View on Map
                    </button>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                      {!product.inStock && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Details
                      </button>
                      <button
                        disabled={!product.inStock}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          product.inStock
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;