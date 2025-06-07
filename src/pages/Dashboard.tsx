import React from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const Dashboard: React.FC = () => {
  // Mock data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 139 },
    { name: 'Mar', sales: 2000, orders: 980 },
    { name: 'Apr', sales: 2780, orders: 390 },
    { name: 'May', sales: 1890, orders: 480 },
    { name: 'Jun', sales: 2390, orders: 380 },
  ]

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#3b82f6' },
    { name: 'Clothing', value: 300, color: '#10b981' },
    { name: 'Books', value: 200, color: '#f59e0b' },
    { name: 'Home', value: 100, color: '#ef4444' },
  ]

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '$299.99', status: 'Completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', amount: '$149.50', status: 'Processing', date: '2024-01-15' },
    { id: '#12347', customer: 'Bob Johnson', amount: '$89.99', status: 'Shipped', date: '2024-01-14' },
    { id: '#12348', customer: 'Alice Brown', amount: '$199.99', status: 'Pending', date: '2024-01-14' },
  ]

  const lowStockItems = [
    { name: 'iPhone 15 Pro', stock: 5, threshold: 10 },
    { name: 'Samsung Galaxy S24', stock: 3, threshold: 15 },
    { name: 'MacBook Air M3', stock: 2, threshold: 8 },
    { name: 'iPad Pro', stock: 7, threshold: 12 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Generate Report
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Total Products"
          value="1,234"
          change="+12% from last month"
          changeType="increase"
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Total Orders"
          value="856"
          change="+8% from last month"
          changeType="increase"
          icon={ShoppingCart}
          color="green"
        />
        <StatsCard
          title="Revenue"
          value="$45,678"
          change="+15% from last month"
          changeType="increase"
          icon={DollarSign}
          color="purple"
        />
        <StatsCard
          title="Low Stock Items"
          value="23"
          change="-5% from last month"
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Active Suppliers"
          value="45"
          change="+3% from last month"
          changeType="increase"
          icon={Users}
          color="yellow"
        />
        <StatsCard
          title="Growth Rate"
          value="12.5%"
          change="+2.1% from last month"
          changeType="increase"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sales Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--toast-bg)',
                  border: '1px solid var(--toast-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-700">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Customer
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Amount
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-dark-700">
                    <td className="py-3 px-2 text-sm text-gray-900 dark:text-white font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">
                      {order.customer}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900 dark:text-white font-medium">
                      {order.amount}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : order.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Low Stock Alert
            </h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Threshold: {item.threshold} units
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">
                    {item.stock} left
                  </p>
                  <button className="text-xs text-primary-600 hover:text-primary-700">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard