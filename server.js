const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

// Updated CORS for production
app.use(cors({ 
  origin: [
    'http://localhost:3000', 
    'https://mohamedmaamar.me',
    'https://www.mohamedmaamar.me'
  ]
}));

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db('kronos');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB().then((database) => {
  const usersCollection = database.collection('users');
  const ordersCollection = database.collection('orders');
  const subscribersCollection = database.collection('subscribers');
  const contactsCollection = database.collection('contacts');
  const productsCollection = database.collection('products');
  const adminCollection = database.collection('admins');

// Get total user count
app.get('/admin/users/count', async (req, res) => {
  try {
    const count = await usersCollection.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Failed to count users' });
  }
});

// Get all orders
app.get('/admin/orders', async (req, res) => {
  try {
    const orders = await ordersCollection.find().toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update an existing order
app.put('/admin/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, customer, totalAmount, items } = req.body;
    
    // Validate required fields
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const updatedOrder = {
      status,
      customer,
      totalAmount: Number(totalAmount),
      items,
      updatedAt: new Date()
    };
    
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedOrder }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({
      message: 'Order updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete an order
app.delete('/admin/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await ordersCollection.deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({
      message: 'Order deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Admin login route - with debugging
app.post('/admin/login', async (req, res) => {
  try {

    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find admin by username
    const admin = await adminCollection.findOne({ adminUsername: username });
        
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    
    // Simple string comparison instead of bcrypt
    if (password !== admin.adminPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate a simple token (or you can remove this if not needed)
    const token = 'admin-token-' + Date.now();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price, description, imageUrl, category, stock, sizes } = req.body;
    
    // Validate required fields
    if (!name || !price || !description) {
      return res.status(400).json({ error: 'Name, price, and description are required' });
    }
    
    const newProduct = {
      name,
      price: Number(price),
      description,
      imageUrl: imageUrl || '',
      category: category || '',
      stock: Number(stock) || 0,
      sizes: sizes || [],
      createdAt: new Date()
    };
    
    const result = await productsCollection.insertOne(newProduct);
    
    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update an existing product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageUrl, category, stock, sizes } = req.body;
    
    // Validate required fields
    if (!name || !price || !description) {
      return res.status(400).json({ error: 'Name, price, and description are required' });
    }
    
    const updatedProduct = {
      name,
      price: Number(price),
      description,
      imageUrl: imageUrl || '',
      category: category || '',
      stock: Number(stock) || 0,
      sizes: sizes || [],
      updatedAt: new Date()
    };
    
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProduct }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      message: 'Product updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await productsCollection.deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      message: 'Product deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});



  // Fetch all products
  app.get('/products', async (req, res) => {
    try {
      const products = await productsCollection.find().toArray();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Fetch a single product by ID
  app.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Searching for product with ID:", id);
      
      const product = await productsCollection.findOne({ _id: new ObjectId(id) });
      if (!product) {
        console.log("Product not found");
        return res.status(404).json({ error: 'Product not found' });
      }
      
      console.log("Product found:", product);
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error.message, error.stack);
      res.status(500).json({ error: 'Failed to fetch product', message: error.message });
    }
  });

// Register User
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with registration date
    await usersCollection.insertOne({ 
      name, 
      email, 
      password: hashedPassword,
      registrationDate: new Date() // Add current date/time
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

  // Login User
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Incorrect email or password' });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });
  
  // Get all users (for admin)
app.get('/admin/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user (for admin)
app.put('/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, registrationDate } = req.body;

    // Check if email is already taken by another user
    const existingUser = await usersCollection.findOne({ 
      email, 
      _id: { $ne: new ObjectId(id) } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, registrationDate } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (for admin)
app.delete('/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});



  // JWT Middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // Stripe Checkout - Updated URLs for production
  app.post('/create-checkout-session', authenticateToken, async (req, res) => {
    try {
      const { totalAmount, items, customer } = req.body;
      if (!totalAmount || totalAmount <= 0) return res.status(400).send({ error: 'Invalid total amount' });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'https://mohamedmaamar.me/kronos/success',
        cancel_url: 'https://mohamedmaamar.me/kronos/cancel',
        customer_email: customer.email,
        metadata: { ...customer },
      });

      await ordersCollection.insertOne({
        items,
        totalAmount,
        customer,
        paymentIntentId: session.payment_intent,
        status: 'Pending',
        createdAt: new Date(),
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).send({ error: 'Failed to create checkout session' });
    }
  });

  // Get User Orders
  // Fetch Orders for Authenticated User
  app.get('/orders', authenticateToken, async (req, res) => {
    console.log('Fetching orders for:', req.user.email); // Log the email
    try {
      const query = {
        'customer.email': req.user.email,
        status: { $in: ['processing', 'shipped', 'delivered', 'succeeded'] }
      };
      console.log('Query:', query); // Log the query
  
      const orders = await ordersCollection.find(query).toArray();
      console.log('Orders found:', orders); // Log the orders
  
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

   // Subscribe to Newsletter
   app.post('/subscribe', async (req, res) => {
    try {
      const { email } = req.body;

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Check if email is already subscribed
      const existingSubscriber = await subscribersCollection.findOne({ email });
      if (existingSubscriber) {
        return res.status(200).json({ message: 'Email already subscribed' });
      }

      // Add email to subscribers collection
      await subscribersCollection.insertOne({ email, subscribedAt: new Date() });

      res.status(201).json({ message: 'Thank you for subscribing!' });
    } catch (error) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: 'Failed to subscribe' });
    }
  });

  // Contact endpoint
  app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Save the message to the contacts collection
      const result = await contactsCollection.insertOne({
        name,
        email,
        subject,
        message,
        createdAt: new Date(), // Add a timestamp
      });

      if (result.insertedId) {
        res.status(201).json({ message: 'Message sent successfully!' });
      } else {
        res.status(500).json({ message: 'Failed to save message.' });
      }
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Failed to send message.' });
    }
  });
  
  // Updated port configuration for Vercel
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});