import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, AlertTriangle, Plus, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'produce', name: 'Produce' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'frozen', name: 'Frozen' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const inventory = [
    {
      id: 1,
      name: 'Organic Bananas',
      category: 'produce',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      price: 4.99,
      supplier: 'Fresh Farms Co.',
      lastRestocked: '2024-01-15',
      status: 'good',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Whole Milk',
      category: 'dairy',
      currentStock: 12,
      minStock: 30,
      maxStock: 80,
      price: 3.49,
      supplier: 'Dairy Fresh Ltd.',
      lastRestocked: '2024-01-14',
      status: 'low',
      trend: 'down'
    },
    {
      id: 3,
      name: 'Artisan Bread',
      category: 'bakery',
      currentStock: 8,
      minStock: 25,
      maxStock: 60,
      price: 5.99,
      supplier: 'Local Bakery',
      lastRestocked: '2024-01-16',
      status: 'critical',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Greek Yogurt',
      category: 'dairy',
      currentStock: 67,
      minStock: 40,
      maxStock: 120,
      price: 6.99,
      supplier: 'Dairy Fresh Ltd.',
      lastRestocked: '2024-01-15',
      status: 'good',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Orange Juice',
      category: 'beverages',
      currentStock: 23,
      minStock: 35,
      maxStock: 90,
      price: 4.49,
      supplier: 'Citrus Co.',
      lastRestocked: '2024-01-13',
      status: 'low',
      trend: 'stable'
    }
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const lowStockCount = inventory.filter(item => item.status === 'low' || item.status === 'critical').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/manager')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Inventory Management</h1>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{inventory.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-emerald-600">${totalValue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Filter className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="stock">Sort by Stock</option>
              <option value="status">Sort by Status</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Product Inventory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Stock Level</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Supplier</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Last Restocked</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Trend</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-800">{item.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{item.currentStock}</span>
                        <span className="text-gray-500">/ {item.maxStock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            item.status === 'good' ? 'bg-green-500' :
                            item.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-800">${item.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{item.supplier}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{item.lastRestocked}</span>
                    </td>
                    <td className="py-4 px-6">
                      {getTrendIcon(item.trend)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm">
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-red-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Critical Stock</h3>
            </div>
            <p className="text-gray-600 mb-4">Items that need immediate restocking</p>
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300">
              View Critical Items
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Bulk Restock</h3>
            </div>
            <p className="text-gray-600 mb-4">Restock multiple items at once</p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
              Start Bulk Restock
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-xl border border-emerald-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Generate Report</h3>
            </div>
            <p className="text-gray-600 mb-4">Export inventory data and analytics</p>
            <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;