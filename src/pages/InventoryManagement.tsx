import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, AlertTriangle, Plus, Search, Filter, TrendingUp, TrendingDown, X, Save, Check } from 'lucide-react';

const InventoryManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    price: 0,
    supplier: '',
    category: ''
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'produce',
    currentStock: 0,
    minStock: 0,
    maxStock: 100,
    price: 0,
    supplier: '',
    lastRestocked: new Date().toISOString().split('T')[0],
    status: 'good',
    trend: 'stable'
  });

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'produce', name: 'Produce' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'frozen', name: 'Frozen' },
    { id: 'beverages', name: 'Beverages' }
  ];

  // Define a type for inventory items
  type InventoryItem = {
    id: number;
    name: string;
    category: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    price: number;
    supplier: string;
    lastRestocked: string;
    status: string;
    trend: string;
  };

  const [inventory, setInventory] = useState<InventoryItem[]>([
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
  ]);

  // Handler functions for editing and adding products
  useEffect(() => {
    // Clear success alerts after 3 seconds
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);
  
  const startEditing = (item) => {
    setEditingItem(item.id);
    setEditForm({
      name: item.name,
      currentStock: item.currentStock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      price: item.price,
      supplier: item.supplier,
      category: item.category
    });
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Restock handlers
  const startRestock = (item: InventoryItem) => {
    setRestockItem(item);
    setRestockAmount(0);
  };

  const fromDashboard = location.state?.from;
  const handleOverviewClick = () => {
    if (fromDashboard === 'employee') {
      navigate('/employee');
    } else {
      navigate('/manager');
    }
  };

  const saveRestock = () => {
    if (!restockItem) return;
    setInventory(prevInventory =>
      prevInventory.map(item => {
        if (item.id === restockItem.id) {
          const newStock = item.currentStock + restockAmount;
          const updatedItem = {
            ...item,
            currentStock: newStock,
            lastRestocked: new Date().toISOString().split('T')[0]
          };
          // Update status based on current stock levels
          if (updatedItem.currentStock <= updatedItem.minStock) {
            updatedItem.status = 'low';
          } else if (updatedItem.currentStock >= updatedItem.maxStock * 0.9) {
            updatedItem.status = 'high';
          } else {
            updatedItem.status = 'good';
          }
          return updatedItem;
        }
        return item;
      })
    );
    setShowSuccessAlert(`${restockItem.name} has been restocked with ${restockAmount} units`);
    setRestockItem(null);
    setRestockAmount(0);
  };

  const cancelRestock = () => {
    setRestockItem(null);
    setRestockAmount(0);
  };

  const addNewProduct = () => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(...inventory.map(item => item.id)) + 1;
    
    // Create new product object
    const productToAdd = {
      ...newProduct,
      id: newId,
      // Set initial status based on stock levels
      status: newProduct.currentStock <= newProduct.minStock ? 'low' : 'good'
    };
    
    // Add to inventory
    setInventory(prev => [...prev, productToAdd]);
    setShowSuccessAlert(`${newProduct.name} has been added to inventory`);
    
    // Reset form and close modal
    setNewProduct({
      name: '',
      category: 'produce',
      currentStock: 0,
      minStock: 0,
      maxStock: 100,
      price: 0,
      supplier: '',
      lastRestocked: new Date().toISOString().split('T')[0],
      status: 'good',
      trend: 'stable'
    });
    setShowAddModal(false);
  };

  const saveEdit = (id) => {
    setInventory(prevInventory => 
      prevInventory.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, ...editForm };
          // Update status based on current stock levels
          if (updatedItem.currentStock <= updatedItem.minStock) {
            updatedItem.status = 'low';
          } else if (updatedItem.currentStock >= updatedItem.maxStock * 0.9) {
            updatedItem.status = 'high';
          } else {
            updatedItem.status = 'good';
          }
          return updatedItem;
        }
        return item;
      })
    );
    setShowSuccessAlert('Item updated successfully');
    setEditingItem(null);
  };
  
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
                onClick={handleOverviewClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Inventory Management</h1>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 flex items-center animate-fade-in-out">
          <Check className="h-5 w-5 mr-2" />
          {showSuccessAlert}
        </div>
      )}

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
                    {editingItem === item.id ? (
                      // Editing Mode Row
                      <>
                        <td className="py-4 px-6">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => handleEditFormChange('name', e.target.value)}
                            className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={editForm.category}
                            onChange={(e) => handleEditFormChange('category', e.target.value)}
                            className="py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {categories.filter(cat => cat.id !== 'all').map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={editForm.currentStock}
                                onChange={(e) => handleEditFormChange('currentStock', parseInt(e.target.value) || 0)}
                                className="w-24 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-gray-500 ml-2">/ </span>
                              <input
                                type="number"
                                value={editForm.maxStock}
                                onChange={(e) => handleEditFormChange('maxStock', parseInt(e.target.value) || 0)}
                                className="w-24 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ml-1"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="text-xs text-gray-500 mr-2">Min:</label>
                              <input
                                type="number"
                                value={editForm.minStock}
                                onChange={(e) => handleEditFormChange('minStock', parseInt(e.target.value) || 0)}
                                className="w-24 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <span>$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.price}
                              onChange={(e) => handleEditFormChange('price', parseFloat(e.target.value) || 0)}
                              className="w-24 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <input
                            type="text"
                            value={editForm.supplier}
                            onChange={(e) => handleEditFormChange('supplier', e.target.value)}
                            className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-600">{item.lastRestocked}</span>
                        </td>
                        <td className="py-4 px-6">
                          {getTrendIcon(item.trend)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => saveEdit(item.id)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center"
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </button>
                            <button 
                              onClick={cancelEditing}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // Normal View Row
                      <>
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
                            <button 
                              onClick={() => startEditing(item)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => startRestock(item)}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm">
                              Restock
                            </button>
                          </div>
                        </td>
                      </>
                    )}
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => handleNewProductChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => handleNewProductChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={newProduct.currentStock}
                    onChange={(e) => handleNewProductChange('currentStock', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => handleNewProductChange('price', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={newProduct.minStock}
                    onChange={(e) => handleNewProductChange('minStock', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock Level</label>
                  <input
                    type="number"
                    value={newProduct.maxStock}
                    onChange={(e) => handleNewProductChange('maxStock', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={newProduct.supplier}
                  onChange={(e) => handleNewProductChange('supplier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={addNewProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {restockItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Restock {restockItem?.name}</h3>
              <button onClick={cancelRestock} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                <p className="text-2xl font-bold">{restockItem?.currentStock} / {restockItem?.maxStock}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      restockItem?.status === 'good' ? 'bg-green-500' :
                      restockItem?.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${restockItem ? (restockItem.currentStock / restockItem.maxStock) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Stock</label>
                <input
                  type="number"
                  min="1"
                  max={restockItem ? restockItem.maxStock - restockItem.currentStock : 1}
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum allowed: {restockItem ? restockItem.maxStock - restockItem.currentStock : 0}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={saveRestock}
                  disabled={
                    restockAmount <= 0 ||
                    (restockItem ? restockAmount > (restockItem.maxStock - restockItem.currentStock) : true)
                  }
                  className={`flex-1 py-2 rounded-lg ${
                    restockAmount <= 0 ||
                    (restockItem ? restockAmount > (restockItem.maxStock - restockItem.currentStock) : true)
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } transition-colors font-medium`}
                >
                  Confirm Restock
                </button>
                <button
                  onClick={cancelRestock}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InventoryManagement;