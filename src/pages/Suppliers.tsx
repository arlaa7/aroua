import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Truck, Phone, Mail, MapPin } from 'lucide-react'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  address: string
  productsSupplied: number
  status: 'Active' | 'Inactive'
  joinedDate: string
}

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA',
      productsSupplied: 45,
      status: 'Active',
      joinedDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'Fashion Forward Inc.',
      email: 'info@fashionforward.com',
      phone: '+1 (555) 987-6543',
      address: '456 Fashion Ave, New York, NY',
      productsSupplied: 32,
      status: 'Active',
      joinedDate: '2023-08-22'
    },
    {
      id: 3,
      name: 'BookWorld Publishers',
      email: 'sales@bookworld.com',
      phone: '+1 (555) 456-7890',
      address: '789 Literature Lane, Boston, MA',
      productsSupplied: 78,
      status: 'Inactive',
      joinedDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Home & Garden Supplies',
      email: 'orders@homegardens.com',
      phone: '+1 (555) 321-0987',
      address: '321 Garden Road, Portland, OR',
      productsSupplied: 23,
      status: 'Active',
      joinedDate: '2023-09-05'
    }
  ]

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Suppliers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your supplier relationships
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Supplier</span>
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
      </motion.div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {supplier.name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(supplier.status)}`}>
                    {supplier.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>{supplier.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Products Supplied: <span className="font-medium text-gray-900 dark:text-white">{supplier.productsSupplied}</span>
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Joined: {new Date(supplier.joinedDate).toLocaleDateString()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-3 w-full px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors text-sm font-medium"
              >
                View Products
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSuppliers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Truck className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No suppliers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or add a new supplier
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default Suppliers