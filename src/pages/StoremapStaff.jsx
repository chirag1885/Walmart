import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, AlertTriangle, Package, 
  TrendingUp, Clock, Wifi, CheckCircle, XCircle, RefreshCw,
  Eye, Settings, BarChart3, ShoppingCart, Bell, Thermometer,
  Zap, UserCheck, Camera, MessageSquare, Radio, Shield
} from 'lucide-react';

/**
 * @typedef {Object} StaffTask
 * @property {string} id
 * @property {'restock'|'cleanup'|'customer_assist'|'price_check'|'maintenance'|'security'} type
 * @property {string} location
 * @property {'low'|'medium'|'high'|'urgent'} priority
 * @property {string} description
 * @property {string=} assignedTo
 * @property {number} estimatedTime
 * @property {'pending'|'in_progress'|'completed'} status
 * @property {{ x: number, y: number }} position
 */

/**
 * @typedef {Object} StaffMember
 * @property {string} id
 * @property {string} name
 * @property {'manager'|'stocker'|'cashier'|'security'|'maintenance'|'customer_service'} role
 * @property {'available'|'busy'|'break'|'offline'} status
 * @property {string} location
 * @property {{ x: number, y: number }} position
 * @property {string=} currentTask
 */

/**
 * @typedef {Object} InventoryAlert
 * @property {string} id
 * @property {string} product
 * @property {string} location
 * @property {'low_stock'|'out_of_stock'|'overstock'|'expired'} type
 * @property {'info'|'warning'|'critical'} severity
 * @property {number} quantity
 * @property {{ x: number, y: number }} position
 */

const StoremapStaff = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState(null);
    const [activeView, setActiveView] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showStaffLocations, setShowStaffLocations] = useState(true);
    const [showTasks, setShowTasks] = useState(true);
    const [showInventoryAlerts, setShowInventoryAlerts] = useState(true);
    const [currentUser] = useState({ name: 'Sarah Johnson', role: 'Store Manager', id: 'staff001' });

  // Store sections (same layout but with staff-focused data)
  const storeSections = [
    { id: 'entrance', name: 'Main Entrance', color: 'bg-gray-300', position: { x: 45, y: 90, width: 10, height: 8 }, type: 'entrance', traffic: 'high' },
    { id: 'customer-service', name: 'Customer Service', color: 'bg-blue-300', position: { x: 5, y: 85, width: 15, height: 8 }, type: 'service', traffic: 'medium' },
    { id: 'pharmacy', name: 'Pharmacy', color: 'bg-red-200', position: { x: 80, y: 85, width: 15, height: 8 }, type: 'service', traffic: 'low' },
    { id: 'produce', name: 'Fresh Produce', color: 'bg-green-200', position: { x: 5, y: 5, width: 25, height: 25 }, type: 'fresh', aisle: 'A', traffic: 'high' },
    { id: 'deli', name: 'Deli & Hot Foods', color: 'bg-yellow-200', position: { x: 35, y: 5, width: 20, height: 15 }, type: 'fresh', aisle: 'B', traffic: 'medium' },
    { id: 'bakery', name: 'Bakery', color: 'bg-orange-200', position: { x: 60, y: 5, width: 15, height: 15 }, type: 'fresh', aisle: 'C', traffic: 'medium' },
    { id: 'meat', name: 'Meat & Seafood', color: 'bg-red-200', position: { x: 80, y: 5, width: 15, height: 25 }, type: 'fresh', aisle: 'D', traffic: 'high' },
    { id: 'aisle-1', name: 'Cereal & Breakfast', color: 'bg-purple-100', position: { x: 10, y: 35, width: 80, height: 6 }, type: 'aisle', aisle: '1', traffic: 'medium' },
    { id: 'aisle-2', name: 'Canned Goods & Soup', color: 'bg-blue-100', position: { x: 10, y: 43, width: 80, height: 6 }, type: 'aisle', aisle: '2', traffic: 'low' },
    { id: 'aisle-3', name: 'Pasta & International', color: 'bg-green-100', position: { x: 10, y: 51, width: 80, height: 6 }, type: 'aisle', aisle: '3', traffic: 'medium' },
    { id: 'aisle-4', name: 'Snacks & Beverages', color: 'bg-yellow-100', position: { x: 10, y: 59, width: 80, height: 6 }, type: 'aisle', aisle: '4', traffic: 'high' },
    { id: 'dairy', name: 'Dairy & Eggs', color: 'bg-blue-200', position: { x: 5, y: 70, width: 40, height: 10 }, type: 'cold', aisle: 'E', traffic: 'high' },
    { id: 'frozen', name: 'Frozen Foods', color: 'bg-cyan-200', position: { x: 50, y: 70, width: 45, height: 10 }, type: 'cold', aisle: 'F', traffic: 'medium' },
    { id: 'checkout', name: 'Checkout Lanes', color: 'bg-purple-200', position: { x: 25, y: 82, width: 50, height: 6 }, type: 'checkout', traffic: 'high' },
  ];

  // Staff tasks data
  const [staffTasks] = useState([
    {
      id: 'task001',
      type: 'restock',
      location: 'Aisle 1 - Cereal',
      priority: 'high',
      description: 'Restock Cheerios and Lucky Charms - Low inventory',
      assignedTo: 'Mike Chen',
      estimatedTime: 15,
      status: 'pending',
      position: { x: 25, y: 38 }
    },
    {
      id: 'task002',
      type: 'cleanup',
      location: 'Produce Section',
      priority: 'medium',
      description: 'Spill cleanup needed near banana display',
      assignedTo: 'Lisa Wong',
      estimatedTime: 5,
      status: 'in_progress',
      position: { x: 15, y: 15 }
    },
    {
      id: 'task003',
      type: 'customer_assist',
      location: 'Customer Service',
      priority: 'urgent',
      description: 'Customer complaint - assistance needed',
      estimatedTime: 10,
      status: 'pending',
      position: { x: 12, y: 89 }
    },
    {
      id: 'task004',
      type: 'maintenance',
      location: 'Frozen Foods',
      priority: 'high',
      description: 'Freezer unit temperature alarm - needs immediate attention',
      assignedTo: 'Dave Rodriguez',
      estimatedTime: 30,
      status: 'in_progress',
      position: { x: 70, y: 75 }
    },
    {
      id: 'task005',
      type: 'price_check',
      location: 'Aisle 4',
      priority: 'low',
      description: 'Price discrepancy reported on beverage items',
      estimatedTime: 8,
      status: 'pending',
      position: { x: 50, y: 62 }
    }
  ]);

  // Staff members data
  const [staffMembers] = useState([
    {
      id: 'staff001',
      name: 'Sarah Johnson',
      role: 'manager',
      status: 'available',
      location: 'Customer Service',
      position: { x: 12, y: 89 }
    },
    {
      id: 'staff002',
      name: 'Mike Chen',
      role: 'stocker',
      status: 'busy',
      location: 'Aisle 1',
      position: { x: 25, y: 38 },
      currentTask: 'task001'
    },
    {
      id: 'staff003',
      name: 'Lisa Wong',
      role: 'stocker',
      status: 'busy',
      location: 'Produce',
      position: { x: 15, y: 15 },
      currentTask: 'task002'
    },
    {
      id: 'staff004',
      name: 'Dave Rodriguez',
      role: 'maintenance',
      status: 'busy',
      location: 'Frozen Foods',
      position: { x: 70, y: 75 },
      currentTask: 'task004'
    },
    {
      id: 'staff005',
      name: 'Emma Davis',
      role: 'cashier',
      status: 'available',
      location: 'Checkout',
      position: { x: 40, y: 85 }
    },
    {
      id: 'staff006',
      name: 'Carlos Martinez',
      role: 'security',
      status: 'available',
      location: 'Main Entrance',
      position: { x: 50, y: 95 }
    }
  ]);

  // Inventory alerts
  const [inventoryAlerts] = useState([
    {
      id: 'inv001',
      product: 'Organic Bananas',
      location: 'Produce Section',
      type: 'low_stock',
      severity: 'warning',
      quantity: 12,
      position: { x: 12, y: 15 }
    },
    {
      id: 'inv002',
      product: 'Whole Milk',
      location: 'Dairy Section',
      type: 'out_of_stock',
      severity: 'critical',
      quantity: 0,
      position: { x: 15, y: 75 }
    },
    {
      id: 'inv003',
      product: 'Bread - Artisan',
      location: 'Bakery',
      type: 'expired',
      severity: 'critical',
      quantity: 8,
      position: { x: 65, y: 10 }
    },
    {
      id: 'inv004',
      product: 'Ice Cream',
      location: 'Frozen Foods',
      type: 'overstock',
      severity: 'info',
      quantity: 156,
      position: { x: 70, y: 75 }
    }
  ]);

  const getTaskIcon = (type) => {
    switch (type) {
      case 'restock': return Package;
      case 'cleanup': return RefreshCw;
      case 'customer_assist': return Users;
      case 'price_check': return BarChart3;
      case 'maintenance': return Settings;
      case 'security': return Shield;
      default: return AlertTriangle;
    }
  };

  const getStaffIcon = (role) => {
    switch (role) {
      case 'manager': return UserCheck;
      case 'stocker': return Package;
      case 'cashier': return ShoppingCart;
      case 'security': return Shield;
      case 'maintenance': return Settings;
      case 'customer_service': return Users;
      default: return Users;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'high': return 'border-red-400';
      case 'medium': return 'border-yellow-400';
      case 'low': return 'border-green-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Staff Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/employee')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Staff Control Center</h1>
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1.5 rounded-full">
                <UserCheck className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">{currentUser.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Radio className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">All Channels Active</span>
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Controls */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Operations Dashboard</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'tasks', name: 'Tasks', icon: Package },
                { id: 'staff', name: 'Staff', icon: Users },
                { id: 'inventory', name: 'Inventory', icon: BarChart3 },
                { id: 'analytics', name: 'Analytics', icon: TrendingUp }
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeView === view.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{view.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Map Controls */}
            <div className="flex items-center space-x-4 text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showStaffLocations}
                  onChange={(e) => setShowStaffLocations(e.target.checked)}
                  className="rounded"
                />
                <span>Show Staff Locations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTasks}
                  onChange={(e) => setShowTasks(e.target.checked)}
                  className="rounded"
                />
                <span>Show Active Tasks</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showInventoryAlerts}
                  onChange={(e) => setShowInventoryAlerts(e.target.checked)}
                  className="rounded"
                />
                <span>Show Inventory Alerts</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Store Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Live Store Map</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1.5 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">{staffMembers.filter(s => s.status !== 'offline').length} Staff Online</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-red-100 px-3 py-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700 font-medium">{staffTasks.filter(t => t.status === 'pending').length} Pending Tasks</span>
                  </div>
                </div>
              </div>
              
              {/* Store Map */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200" style={{ height: '600px' }}>
                {/* Store Sections with Traffic Indicators */}
                {storeSections.map((section) => (
                  <div
                    key={section.id}
                    className={`absolute ${section.color} rounded-lg flex items-center justify-center border-2 ${getTrafficColor(section.traffic)} hover:border-blue-400 transition-all cursor-pointer shadow-sm hover:shadow-md`}
                    style={{
                      left: `${section.position.x}%`,
                      top: `${section.position.y}%`,
                      width: `${section.position.width}%`,
                      height: `${section.position.height}%`
                    }}
                    title={`${section.name} - Traffic: ${section.traffic}`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-800 text-xs md:text-sm">
                        {section.aisle && `${section.aisle}`}
                      </div>
                      <div className="text-xs text-gray-600 hidden md:block">
                        {section.name.length > 15 ? section.name.substring(0, 15) + '...' : section.name}
                      </div>
                      {/* Traffic indicator */}
                      <div className={`w-2 h-2 rounded-full mt-1 mx-auto ${
                        section.traffic === 'high' ? 'bg-red-500' :
                        section.traffic === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                    </div>
                  </div>
                ))}

                {/* Staff Location Markers */}
                {showStaffLocations && staffMembers.map((staff) => {
                  const StaffIcon = getStaffIcon(staff.role);
                  return (
                    <div
                      key={staff.id}
                      className="absolute z-20"
                      style={{
                        left: `${staff.position.x}%`,
                        top: `${staff.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getStatusColor(staff.status)}`}>
                        <StaffIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {staff.name} - {staff.role}
                      </div>
                    </div>
                  );
                })}

                {/* Task Markers */}
                {showTasks && staffTasks.filter(task => task.status !== 'completed').map((task) => {
                  const TaskIcon = getTaskIcon(task.type);
                  return (
                    <div
                      key={task.id}
                      className="absolute z-15"
                      style={{
                        left: `${task.position.x}%`,
                        top: `${task.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getPriorityColor(task.priority)} ${task.status === 'in_progress' ? 'animate-pulse' : ''}`}>
                        <TaskIcon className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  );
                })}

                {/* Inventory Alert Markers */}
                {showInventoryAlerts && inventoryAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="absolute z-10"
                    style={{
                      left: `${alert.position.x}%`,
                      top: `${alert.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full border border-white shadow-md ${getSeverityColor(alert.severity)} ${alert.severity === 'critical' ? 'animate-bounce' : ''}`}>
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Live Status</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Available Staff</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Busy/Critical</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>High Priority Task</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Inventory Alert</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Stats */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-green-600">{staffMembers.filter(s => s.status === 'available').length}</div>
                      <div className="text-gray-600">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">{staffTasks.filter(t => t.priority === 'urgent').length}</div>
                      <div className="text-gray-600">Urgent</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-600">{inventoryAlerts.filter(a => a.severity === 'warning').length}</div>
                      <div className="text-gray-600">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">97%</div>
                      <div className="text-gray-600">Efficiency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel Content */}
          <div className="space-y-6">
            {activeView === 'overview' && (
              <>
                {/* Quick Stats */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Operations Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{staffTasks.filter(t => t.status === 'completed').length}</div>
                      <div className="text-sm text-gray-600">Completed Tasks</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{staffMembers.filter(s => s.status !== 'offline').length}</div>
                      <div className="text-sm text-gray-600">Active Staff</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{inventoryAlerts.length}</div>
                      <div className="text-sm text-gray-600">Inventory Alerts</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">142</div>
                      <div className="text-sm text-gray-600">Customers</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">Task completed in Produce</div>
                        <div className="text-xs text-gray-600">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">New staff member checked in</div>
                        <div className="text-xs text-gray-600">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">Low stock alert triggered</div>
                        <div className="text-xs text-gray-600">8 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'tasks' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Active Tasks</h3>
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    + New Task
                  </button>
                </div>
                <div className="space-y-3">
                  {staffTasks.map((task) => {
                    const TaskIcon = getTaskIcon(task.type);
                    return (
                      <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(task.priority)}`}>
                            <TaskIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-800">{task.location}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {task.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                              <span>Assigned to: {task.assignedTo || 'Unassigned'}</span>
                              <span>Est: {task.estimatedTime}m</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeView === 'staff' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Staff Status</h3>
                  <div className="flex items-center space-x-2">
                    <Radio className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Live Updates</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {staffMembers.map((staff) => {
                    const StaffIcon = getStaffIcon(staff.role);
                    return (
                      <div key={staff.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(staff.status)}`}>
                            <StaffIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-800">{staff.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)} text-white`}>
                                {staff.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{staff.role} • {staff.location}</p>
                            {staff.currentTask && (
                              <p className="text-xs text-blue-600 mt-1">Working on: {staffTasks.find(t => t.id === staff.currentTask)?.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                              <Radio className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeView === 'inventory' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Inventory Alerts</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Thermometer className="h-4 w-4" />
                    <span>Real-time monitoring</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {inventoryAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(alert.severity)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">{alert.product}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                              alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {alert.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{alert.location}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <span>Quantity: {alert.quantity}</span>
                            <button className="text-blue-600 hover:text-blue-700">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'analytics' && (
              <>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Task Completion Rate</span>
                        <span className="text-sm font-medium text-green-600">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Staff Efficiency</span>
                        <span className="text-sm font-medium text-blue-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="text-sm font-medium text-purple-600">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Highlights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">Tasks completed 15% faster</div>
                        <div className="text-xs text-gray-600">Compared to yesterday</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">Zero customer complaints</div>
                        <div className="text-xs text-gray-600">Best performance this month</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">Inventory accuracy at 99.2%</div>
                        <div className="text-xs text-gray-600">Above target of 98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Radio className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">All Call</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Add Task</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">Alert Staff</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Camera className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">View Cameras</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Section Details Modal */}
        {selectedSection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {storeSections.find(s => s.id === selectedSection)?.name}
                </h3>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">
                      {staffMembers.filter(s => s.location.toLowerCase().includes(storeSections.find(sec => sec.id === selectedSection)?.name.toLowerCase().split(' ')[0] || '')).length}
                    </div>
                    <div className="text-sm text-gray-600">Staff Present</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">
                      {staffTasks.filter(t => t.location.toLowerCase().includes(storeSections.find(sec => sec.id === selectedSection)?.name.toLowerCase().split(' ')[0] || '')).length}
                    </div>
                    <div className="text-sm text-gray-600">Active Tasks</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Current Issues:</h4>
                  {inventoryAlerts.filter(alert => 
                    alert.location.toLowerCase().includes(storeSections.find(sec => sec.id === selectedSection)?.name.toLowerCase().split(' ')[0] || '')
                  ).map(alert => (
                    <div key={alert.id} className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-700">{alert.product} - {alert.type.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Assign Task
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoremapStaff;