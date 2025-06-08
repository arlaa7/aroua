import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Truck,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  User,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['Admin', 'Assistant', 'Cashier'] },
      { name: 'Products', href: '/products', icon: Package, roles: ['Admin', 'Assistant'] },
      { name: 'Categories', href: '/categories', icon: FolderOpen, roles: ['Admin', 'Assistant'] },
      { name: 'Suppliers', href: '/suppliers', icon: Truck, roles: ['Admin', 'Assistant'] },
      { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: ['Admin', 'Assistant', 'Cashier'] },
      { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['Admin', 'Assistant'] },
    ]

    const adminItems = [
      { name: 'User Management', href: '/users', icon: Users, roles: ['Admin'] },
      { name: 'Settings', href: '/settings', icon: Settings, roles: ['Admin'] },
    ]

    const userItems = [
      { name: 'Profile', href: '/profile', icon: User, roles: ['Admin', 'Assistant', 'Cashier'] },
    ]

    const allItems = [...baseItems, ...adminItems, ...userItems]
    
    return allItems.filter(item => 
      user && item.roles.includes(user.role)
    )
  }

  const navigation = getNavigationItems()

  return (
    <>
      {/* Desktop sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="hidden lg:flex lg:flex-shrink-0"
      >
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-6 py-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  StockMS
                </span>
              </motion.div>
            </div>

            {/* User Info */}
            {user && (
              <div className="px-6 pb-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 pb-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700"
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between px-6 py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    StockMS
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="px-6 pb-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 px-4 pb-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <item.icon
                      className="mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar