# KRONOS - E-commerce Platform

A full-stack e-commerce platform for streetwear clothing built with the MERN stack, featuring modern design, secure payments, and responsive interface.

## 🚀 Live Demo
- **Website**: [mohamedmaamar.me/kronos](https://mohamedmaamar.me/kronos/)

## ⚡ Features
- Modern responsive design
- User authentication & registration
- Shopping cart & checkout with Stripe
- Admin dashboard for product/order management
- Mobile-optimized navigation
- Real-time animations with Framer Motion

## 🛠️ Tech Stack
**Frontend:** React.js, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Payment:** Stripe  
**Deployment:** GitHub Pages + Vercel

## 🚀 Quick Start

1. **Clone & Install**
```bash
git clone https://github.com/maamar404/kronos.git
cd kronos
npm install
cd "Front end" && npm install && cd ..
```

2. **Environment Setup**
Create `.env` in root:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

Create `Front end/.env`:
```bash
REACT_APP_API_URL=http://localhost:4000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

3. **Run Development**
```bash
# Backend (Terminal 1)
npm start

# Frontend (Terminal 2)
cd "Front end" && npm start
```

Visit `http://localhost:3000` to see the app.

## 📁 Project Structure
```
kronos/
├── Front end/          # React frontend
├── server.js           # Express backend
├── vercel.json         # Vercel config
└── package.json        # Dependencies
```

## 🚀 Deployment
- **Frontend**: GitHub Pages
- **Backend**: Vercel
- **Database**: MongoDB Atlas

## 👨‍💻 Author
**Mohamed Maamar** - [@maamar404](https://github.com/maamar404)

---
⭐ **Star this repo if you found it helpful!**
