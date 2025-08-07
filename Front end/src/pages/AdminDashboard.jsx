import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Popconfirm } from 'antd';
import 'antd/dist/reset.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    customer: { name: '', email: '', phone: '' },
    status: '',
    totalAmount: '',
    items: []
  });
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    registrationDate: ''
  });
  const [isEditingUser, setIsEditingUser] = useState(false);

  // Reset the user form
  const resetUserForm = () => {
    setCurrentUser({
      name: '',
      email: '',
      registrationDate: ''
    });
    setIsEditingUser(false);
  };

// Open user form for editing an existing user
const handleEditUser = (user) => {
  setCurrentUser({
    _id: user._id,
    name: user.name,
    email: user.email,
    registrationDate: user.registrationDate
  });
  setIsEditingUser(true);
  setShowUserForm(true);
};

// Handle user form field changes
const handleUserInputChange = (e) => {
  const { name, value } = e.target;
  setCurrentUser({
    ...currentUser,
    [name]: value
  });
};

// Submit user form - update user
const handleSubmitUser = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // Update existing user
    await axios.put(`${API_URL}/admin/users/${currentUser._id}`, {
      name: currentUser.name,
      email: currentUser.email
    });
    
    // Refresh users data
    fetchUsersData();
    setShowUserForm(false);
    resetUserForm();
  } catch (err) {
    console.error('Error saving user:', err);
    setError(err.response?.data?.error || 'Failed to save user. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Delete a user
const handleDeleteUser = async (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    setLoading(true);
    
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      fetchUsersData();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  }
};

// Fetch users data
const fetchUsersData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const usersRes = await axios.get(`${API_URL}/admin/users`);
    setUsers(usersRes.data);
  } catch (err) {
    console.error('Error fetching users:', err);
    setError('Failed to load users data. Please try again later.');
  } finally {
    setLoading(false);
  }
};

// Format user registration date
const formatUserDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return 'Invalid date';
  }
};

// Reset the order form
const resetOrderForm = () => {
  setCurrentOrder({
    customer: { name: '', email: '', phone: '' },
    status: '',
    totalAmount: '',
    items: []
  });
  setIsEditingOrder(false);
};

// Open order form for editing an existing order
const handleEditOrder = (order) => {
  setCurrentOrder({
    _id: order._id,
    customer: order.customer || { name: '', email: '', phone: '' },
    status: order.status,
    totalAmount: order.totalAmount || 0,
    items: order.items || []
  });
  setIsEditingOrder(true);
  setShowOrderForm(true);
};

// Handle order form field changes
const handleOrderInputChange = (e) => {
  const { name, value } = e.target;
  if (name.startsWith('customer.')) {
    const customerField = name.split('.')[1];
    setCurrentOrder({
      ...currentOrder,
      customer: {
        ...currentOrder.customer,
        [customerField]: value
      }
    });
  } else {
    setCurrentOrder({
      ...currentOrder,
      [name]: name === 'totalAmount' ? Number(value) : value
    });
  }
};

// Submit order form - update order
const handleSubmitOrder = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // Update existing order
    await axios.put(`${API_URL}/admin/orders/${currentOrder._id}`, currentOrder);
    
    // Refresh orders data
    fetchDashboardData();
    setShowOrderForm(false);
    resetOrderForm();
  } catch (err) {
    console.error('Error saving order:', err);
    setError('Failed to save order. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Delete an order
const handleDeleteOrder = async (orderId) => {
  if (window.confirm('Are you sure you want to delete this order?')) {
    setLoading(true);
    
    try {
      await axios.delete(`${API_URL}/admin/orders/${orderId}`);
      fetchDashboardData();
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to delete order. Please try again.');
    } finally {
      setLoading(false);
    }
  }
};

// Format date for display
const formatOrderDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Invalid date';
  }
};
  
  // States for dashboard data
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  
  // States for products management
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
    stock: '',
    sizes: [],
    sizeType: 'clothing' // Add sizeType to track which size options to show
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Check admin authentication on page load
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    } else {
      fetchDashboardData();
    }
  }, [navigate]);
  
  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Option 1: Fetch all stats in a single request
      // const statsRes = await axios.get('${API_URL}/admin/dashboard/stats');
      // setStats(statsRes.data);
      
      // Option 2: Fetch each stat separately
      const [usersRes, ordersRes, productsRes, subscribersRes, contactsRes] = await Promise.all([
      axios.get(`${API_URL}/admin/users/count`),
      axios.get(`${API_URL}/admin/orders`),
      axios.get(`${API_URL}/products`),
      axios.get(`${API_URL}/admin/subscribers`),
      axios.get(`${API_URL}/admin/contacts`)
    ]);
      
      // Set products data for products orders management
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setSubscribers(subscribersRes.data);
      setContacts(contactsRes.data);

      // Fetch full users data for customers tab
      const allUsersRes = await axios.get(`${API_URL}/admin/users`);
      setUsers(allUsersRes.data);

      // Calculate total revenue from orders
      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      // Update stats state
      setStats({
        users: usersRes.data.count,
        orders: ordersRes.data.length,
        revenue: totalRevenue,
        products: productsRes.data.length
      });
      
      // Get 5 most recent orders
      const recent = ordersRes.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(order => ({
          id: `#${order._id.substring(0, 10)}`,
          customer: order.customer?.name || 'Unknown',
          date: formatDate(order.createdAt),
          status: order.status,
          amount: order.totalAmount || 0
        }));
        
      setRecentOrders(recent);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format date to relative time (e.g., "5 hours ago")
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000); // difference in seconds
      
      if (diff < 60) return `${diff} sec ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      return `${Math.floor(diff / 86400)} days ago`;
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };
  
  // Reset the product form
  const resetProductForm = () => {
    setCurrentProduct({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: '',
      stock: '',
      sizes: [],
      sizeType: 'clothing' // Reset sizeType to default
    });
    setIsEditing(false);
  };
  
  // Open product form for creating a new product
  const handleAddProduct = () => {
    resetProductForm();
    setShowProductForm(true);
  };
  
  // Open product form for editing an existing product
  const handleEditProduct = (product) => {
    // Try to detect size type based on existing sizes
  const hasLetterSizes = product.sizes?.some(size => 
    ['S', 'M', 'L', 'XL', 'XXL'].includes(size.toUpperCase())
  );
    setCurrentProduct({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl || '',
      category: product.category || '',
      stock: product.stock || 0,
      sizes: product.sizes || [],
      sizeType: hasLetterSizes ? 'clothing' : 'shoes' // Set sizeType based on existing sizes
    });
    setIsEditing(true);
    setShowProductForm(true);
  };
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };
  
  // Submit product form - either create or update product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        // Update existing product
        await axios.put(`${API_URL}/products/${currentProduct._id}`, currentProduct);
      } else {
        // Create new product
        await axios.post(`${API_URL}/products`, currentProduct);
      }
      
      // Refresh product data
      fetchDashboardData();
      setShowProductForm(false);
      resetProductForm();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      
      try {
        await axios.delete(`${API_URL}/products/${productId}`);
        fetchDashboardData();
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch subscribers data
const fetchSubscribersData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const subscribersRes = await axios.get(`${API_URL}/admin/subscribers`);
    setSubscribers(subscribersRes.data);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    setError('Failed to load subscribers data. Please try again later.');
  } finally {
    setLoading(false);
  }
};

// Fetch contacts data
const fetchContactsData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const contactsRes = await axios.get(`${API_URL}/admin/contacts`);
    setContacts(contactsRes.data);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    setError('Failed to load contacts data. Please try again later.');
  } finally {
    setLoading(false);
  }
};

// Delete a subscriber
const handleDeleteSubscriber = async (subscriberId) => {
  setLoading(true);
  
  try {
    await axios.delete(`${API_URL}/admin/subscribers/${subscriberId}`);
    fetchSubscribersData();
  } catch (err) {
    console.error('Error deleting subscriber:', err);
    setError('Failed to delete subscriber. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Delete a contact
const handleDeleteContact = async (contactId) => {
  setLoading(true);
  
  try {
    await axios.delete(`${API_URL}/admin/contacts/${contactId}`);
    fetchContactsData();
  } catch (err) {
    console.error('Error deleting contact:', err);
    setError('Failed to delete contact message. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Mark contact as read/unread
const handleToggleContactStatus = async (contactId, currentStatus) => {
  try {
    await axios.put(`${API_URL}/admin/contacts/${contactId}/status`, {
      isRead: !currentStatus
    });
    fetchContactsData();
  } catch (err) {
    console.error('Error updating contact status:', err);
    setError('Failed to update contact status. Please try again.');
  }
};

// Download subscribers as CSV
const downloadSubscribersCSV = () => {
  const csvContent = [
    ['Email', 'Subscription Date'],
    ...subscribers.map(sub => [
      sub.email,
      new Date(sub.subscribedAt).toLocaleDateString('en-US')
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Download contacts as CSV
const downloadContactsCSV = () => {
  const csvContent = [
    ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'],
    ...contacts.map(contact => [
      contact.name,
      contact.email,
      contact.subject,
      `"${contact.message.replace(/"/g, '""')}"`, // Escape quotes in message
      new Date(contact.createdAt).toLocaleDateString('en-US'),
      contact.isRead ? 'Read' : 'Unread'
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Format date for display
const formatContactDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Invalid date';
  }
};

    // Add this function to open contact details modal
    const handleViewContact = (contact) => {
      setSelectedContact(contact);
      setShowContactModal(true);
    };

    // Add this function to close the modal
    const closeContactModal = () => {
      setSelectedContact(null);
      setShowContactModal(false);
    };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen p-4">
          <nav className="mt-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">📊</span>
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'products' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">📦</span>
                Products
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'orders' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">🛒</span>
                Orders
              </button>
              
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'customers' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">👥</span>
                Customers
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'contacts' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">📞</span>
                Contacts
              </button>

              <button
                onClick={() => setActiveTab('subscribers')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm font-medium ${
                  activeTab === 'subscribers' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">📧</span>
                Subscribers
              </button>

            </div>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                  <button 
                    onClick={fetchDashboardData}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                          <span className="text-2xl">👥</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Total Users</p>
                          <p className="text-2xl font-bold">{stats.users.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                          <span className="text-2xl">💰</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Total Revenue</p>
                          <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                          <span className="text-2xl">🛒</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Total Orders</p>
                          <p className="text-2xl font-bold">{stats.orders.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                          <span className="text-2xl">📦</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Total Products</p>
                          <p className="text-2xl font-bold">{stats.products.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Orders Table */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-medium">Recent Orders</h3>
                      <button 
                        onClick={fetchDashboardData}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                      >
                        Refresh
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      {recentOrders.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {recentOrders.map((order, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                  {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {order.customer}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {order.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${order.status === 'succeeded' ? 'bg-green-100 text-green-800' : 
                                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-blue-100 text-blue-800'}`}>
                                    {order.status === 'succeeded' ? 'Completed' : 
                                     order.status === 'processing' ? 'Processing' : 
                                     order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${order.amount.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="px-6 py-4 text-center text-gray-500">
                          No orders found
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Products Management Tab Content */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Products Management</h2>
                <button
                  onClick={handleAddProduct}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">+</span> Add New Product
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                  <button 
                    onClick={fetchDashboardData}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Product Form Modal */}
                  {showProductForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                          <button
                            onClick={() => setShowProductForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            &times;
                          </button>
                        </div>
                        
                        <form onSubmit={handleSubmitProduct}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={currentProduct.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (USD) <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                name="price"
                                value={currentProduct.price}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                              </label>
                              <input
                                type="text"
                                name="category"
                                value={currentProduct.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock Quantity <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                name="stock"
                                value={currentProduct.stock}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                              </label>
                              <input
                                type="text"
                                name="imageUrl"
                                value={currentProduct.imageUrl}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Add size type selector */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size Type
                        </label>
                        <div className="flex gap-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sizeType"
                              value="clothing"
                              checked={currentProduct.sizeType === 'clothing'}
                              onChange={() => setCurrentProduct({...currentProduct, sizeType: 'clothing', sizes: []})}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Clothing</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sizeType"
                              value="shoes"
                              checked={currentProduct.sizeType === 'shoes'}
                              onChange={() => setCurrentProduct({...currentProduct, sizeType: 'shoes', sizes: []})}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Shoes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sizeType"
                              value="standard"
                              checked={currentProduct.sizeType === 'standard'}
                              onChange={() => setCurrentProduct({...currentProduct, sizeType: 'standard', sizes: ['One Size']})}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Standard/One Size</span>
                          </label>
                        </div>
                      </div>

{/* Dynamic size options */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Available Sizes
  </label>
  <div className="flex flex-wrap gap-2">
    {currentProduct.sizeType === 'clothing' ? (
      // Clothing sizes
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
        <label key={size} className="inline-flex items-center">
          <input
            type="checkbox"
            checked={currentProduct.sizes.includes(size)}
            onChange={(e) => {
              const newSizes = e.target.checked
                ? [...currentProduct.sizes, size]
                : currentProduct.sizes.filter(s => s !== size);
              setCurrentProduct({...currentProduct, sizes: newSizes});
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">{size}</span>
        </label>
      ))
    ) : currentProduct.sizeType === 'shoes' ? (
      // Shoe sizes
      Array.from({length: 14}, (_, i) => i + 36).map(size => (
        <label key={size} className="inline-flex items-center">
          <input
            type="checkbox"
            checked={currentProduct.sizes.includes(size.toString())}
            onChange={(e) => {
              const newSizes = e.target.checked
                ? [...currentProduct.sizes, size.toString()]
                : currentProduct.sizes.filter(s => s !== size.toString());
              setCurrentProduct({...currentProduct, sizes: newSizes});
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">{size}</span>
        </label>
      ))
    ) : (
      // Standard/One Size - automatically selected and disabled
      <div className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
        <input
          type="checkbox"
          checked={true}
          disabled={true}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded opacity-50"
        />
        <span className="ml-2 text-sm text-gray-600">One Size</span>
      </div>
    )}
  </div>
</div>
                            
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                              </label>
                              <textarea
                                name="description"
                                value={currentProduct.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => setShowProductForm(false)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                              {isEditing ? 'Update Product' : 'Add Product'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  
                  {/* Products Table */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      {products.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sizes
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                              <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {product.imageUrl ? (
                                    <img 
                                      src={product.imageUrl} 
                                      alt={product.name}
                                      className="h-12 w-12 object-cover rounded"
                                    />
                                  ) : (
                                    <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded">
                                      <span className="text-gray-500">No img</span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description.substring(0, 50)}
                                    {product.description.length > 50 ? '...' : ''}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {product.category || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {product.stock || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {product.sizes?.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                      {product.sizes.map(size => (
                                        <span key={size} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                          {size}
                                        </span>
                                      ))}
                                    </div>
                                  ) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleEditProduct(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                          <p className="mb-4">No products found</p>
                          <button
                            onClick={handleAddProduct}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
                          >
                            <span className="mr-2">+</span> Add Your First Product
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Orders Management Tab Content */}
{activeTab === 'orders' && (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Orders Management</h2>
      <div className='flex items-center space-x-4'>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
        <button
            onClick={fetchDashboardData}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
          >
            Refresh
          </button>
     </div>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    ) : (
      <>
        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Order</h3>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmitOrder}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customer.name"
                      value={currentOrder.customer?.name || ''}
                      onChange={handleOrderInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Email
                    </label>
                    <input
                      type="email"
                      name="customer.email"
                      value={currentOrder.customer?.email || ''}
                      onChange={handleOrderInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={currentOrder.status}
                      onChange={handleOrderInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="succeeded">Succeeded</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount (USD)
                    </label>
                    <input
                      type="number"
                      name="totalAmount"
                      value={currentOrder.totalAmount}
                      onChange={handleOrderInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Order Items Display (Read-only) */}
                {currentOrder.items && currentOrder.items.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Items
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto">
                      {currentOrder.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-700 mb-1">
                          {item.name} - Qty: {item.quantity} - ${item.price}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Update Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Orders Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {orders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        #{order._id.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer?.email || 'No email'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatOrderDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'succeeded' || order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' || order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'}`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.items ? `${order.items.length} items` : 'No items'}
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {order.items.map(item => item.name).join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No orders found</p>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </div>
)}
{/* Customers Management Tab Content */}
{activeTab === 'customers' && (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Customers Management</h2>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          Total Customers: {users.length}
        </div>
        <button
          onClick={fetchUsersData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
        >
          Refresh
        </button>
      </div>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button 
          onClick={fetchUsersData}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    ) : (
      <>
        {/* User Form Modal */}
        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Customer</h3>
                <button
                  onClick={() => setShowUserForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmitUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleUserInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleUserInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowUserForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Update Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {users.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        #{user._id.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatUserDate(user.registrationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No customers found</p>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </div>
)}

          {/* Subscribers Management Tab Content */}
          {activeTab === 'subscribers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Total Subscribers: {subscribers.length}
                  </div>
                  <button
                    onClick={downloadSubscribersCSV}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={fetchSubscribersData}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                  <button 
                    onClick={fetchSubscribersData}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    {subscribers.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subscription Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {subscribers.map((subscriber) => (
                            <tr key={subscriber._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {subscriber.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatContactDate(subscriber.subscribedAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Popconfirm
                                  title="Delete Subscriber"
                                  description={`Remove ${subscriber.email} from newsletter?`}
                                  onConfirm={() => handleDeleteSubscriber(subscriber._id)}
                                  okText="Delete"
                                  cancelText="Cancel"
                                  okType="danger"
                                >
                                  <button className="text-red-600 hover:text-red-900">
                                    Delete
                                  </button>
                                </Popconfirm>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="px-6 py-8 text-center text-gray-500">
                        <p>No subscribers found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contacts Management Tab Content */}
          {activeTab === 'contacts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Contact Messages</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Total: {contacts.length} | Unread: {contacts.filter(c => !c.isRead).length}
                  </div>
                  <button
                    onClick={downloadContactsCSV}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={fetchContactsData}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                  <button 
                    onClick={fetchContactsData}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Contact Details Modal - KEEP AS IS */}
                  {showContactModal && selectedContact && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                          <h3 className="text-xl font-semibold">Contact Details</h3>
                          <button
                            onClick={closeContactModal}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                          >
                            &times;
                          </button>
                        </div>
                        
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedContact.name}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedContact.email}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatContactDate(selectedContact.createdAt)}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <button
                                onClick={() => handleToggleContactStatus(selectedContact._id, selectedContact.isRead)}
                                className={`px-3 py-1 text-sm font-medium rounded-full ${
                                  selectedContact.isRead 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                } transition-colors cursor-pointer`}
                              >
                                {selectedContact.isRead ? 'Read' : 'Unread'} - Click to toggle
                              </button>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">{selectedContact.subject}</p>
                          </div>
                          
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded border whitespace-pre-wrap max-h-64 overflow-y-auto">
                              {selectedContact.message}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                          {/* ADD POPCONFIRM HERE FOR MODAL DELETE BUTTON */}
                          <Popconfirm
                            title="Delete Contact Message"
                            description="Are you sure you want to delete this contact message? This action cannot be undone."
                            onConfirm={() => {
                              handleDeleteContact(selectedContact._id);
                              closeContactModal();
                            }}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okType="danger"
                            placement="topRight"
                          >
                            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                              Delete Message
                            </button>
                          </Popconfirm>
                          <button
                            onClick={closeContactModal}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Compact Contact List - KEEP AS IS */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    {contacts.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {contacts.map((contact) => (
                          <div 
                            key={contact._id} 
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                              contact.isRead ? 'bg-white' : 'bg-blue-50 border-l-4 border-blue-500'
                            }`}
                            onClick={() => handleViewContact(contact)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className={`w-3 h-3 rounded-full ${
                                      contact.isRead ? 'bg-gray-400' : 'bg-blue-500'
                                    }`}></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {contact.name}
                                      </p>
                                      <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                        {formatContactDate(contact.createdAt)}
                                      </p>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                      {contact.email}
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 mt-1 truncate">
                                      {contact.subject}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1 truncate">
                                      {contact.message.substring(0, 80)}
                                      {contact.message.length > 80 ? '...' : ''}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  contact.isRead 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {contact.isRead ? 'Read' : 'New'}
                                </span>
                                {/* ADD POPCONFIRM HERE FOR LIST DELETE BUTTON */}
                                <Popconfirm
                                  title="Delete Contact"
                                  description={`Are you sure you want to delete the message from ${contact.name}?`}
                                  onConfirm={(e) => {
                                    e?.stopPropagation();
                                    handleDeleteContact(contact._id);
                                  }}
                                  onCancel={(e) => e?.stopPropagation()}
                                  okText="Delete"
                                  cancelText="Cancel"
                                  okType="danger"
                                  placement="topRight"
                                >
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                    title="Delete message"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </Popconfirm>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-6 py-8 text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">No contact messages</p>
                        <p>Contact messages will appear here when customers reach out.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Placeholder content for other tabs */}
          {activeTab !== 'overview' && activeTab !== 'products' && activeTab !== 'orders' && activeTab !== 'customers' && activeTab !== 'contacts' && activeTab !== 'subscribers' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 capitalize">{activeTab}</h2>
              <p className="text-gray-600">
                This is the {activeTab} management section. Content for this section would be implemented
                based on specific requirements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};