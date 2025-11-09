# 🍽️ CampusEats - BMSCE Online Campus Food Platform

<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
  <img src="https://img.shields.io/badge/Node.js-v18+-green" alt="Node Version">
  <img src="https://img.shields.io/badge/React-18.2.0-blue" alt="React Version">
  <img src="https://img.shields.io/badge/MongoDB-Latest-green" alt="MongoDB">
</div>

## 🎯 Overview

CampusEats is a modern, full-stack online campus food platform specifically designed for BMSCE (BMS College of Engineering) students and faculty. Built with React, Node.js, Express, and MongoDB, it offers a seamless pre-order and pickup experience with a beautiful, responsive interface featuring advanced animations and modern design.

## ✨ Key Features

### 🔐 Secure Authentication System
- **BMSCE Email Validation**: Registration restricted to @bmsce.ac.in domains
- **JWT Token Authentication**: Secure, stateless authentication
- **Password Encryption**: bcryptjs hashing for maximum security
- **Protected Routes**: Comprehensive access control
- **Profile Management**: Complete user profile with edit capabilities

### 🎨 Modern UI/UX Design
- **Glassmorphism Design**: Contemporary visual aesthetics with backdrop blur effects
- **Framer Motion Animations**: Smooth, professional micro-interactions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, loading states, and visual feedback
- **Blue Gradient Theme**: Professional BMSCE-branded color scheme

### 🍕 Advanced Food Menu System
- **17 Vegetarian Items**: Diverse menu with authentic Indian dishes
- **Smart Categories**: 
  - Main Course (8 items): Paneer Butter Masala, Biryani, Pulao, etc.
  - Beverages (3 items): Fresh Lemon Tea, Mango Lassi, Masala Chai
  - Snacks (3 items): Samosa, Bhel Puri, etc.
  - Traditional (1 item): Dal Baati Churma
  - South Indian (1 item): Masala Dosa
  - Desserts (1 item): Gulab Jamun
- **Dynamic Pricing**: Real-time price display with Indian Rupee format
- **High-Quality Images**: Professional food photography from Unsplash
- **Smart Tagging**: Vegetarian indicators and category badges

### 🛒 Advanced Cart System
- **Persistent Storage**: Cart items saved in localStorage
- **Cross-Component Sync**: Real-time updates across pages
- **Quantity Management**: Increase/decrease item quantities
- **Order Summary**: Detailed breakdown with totals
- **Multiple Payment Options**:
  - Cash on Pickup
  - UPI Payment with QR Code integration
- **Pre-order Model**: Campus pickup system (20-30 minutes)

### 👤 User Profile Management
- **Modern Profile Interface**: Clean, professional design
- **Editable Fields**: Name, mobile number updates
- **Quick Statistics**: Orders count, favorites, rating display
- **Security Features**: Protected email field
- **Achievement Badges**: Visual user recognition

## 🛠️ Technology Stack

### Frontend Architecture
```json
{
  "framework": "React 18.2.0",
  "build_tool": "Vite 5.4.21",
  "styling": "Tailwind CSS 3.x + Custom CSS",
  "animations": "Framer Motion 10.x",
  "routing": "React Router DOM 6.x",
  "notifications": "React Hot Toast",
  "icons": "Lucide React",
  "state_management": "React Hooks + localStorage"
}
```

### Backend Architecture
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js 4.x",
  "database": "MongoDB with Mongoose ODM",
  "authentication": "JWT + bcryptjs",
  "middleware": "CORS, body-parser",
  "api_design": "RESTful API endpoints",
  "security": "Environment variables, input validation"
}
```

### Database Schema
```javascript
// User Model
{
  fullName: String,
  email: String (unique, @bmsce.ac.in),
  password: String (hashed),
  mobileNumber: String,
  role: String (default: 'student'),
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}

// Food Item Model
{
  name: String,
  price: Number,
  description: String,
  image: String (URL),
  category: String,
  type: String ('Vegetarian'),
  available: Boolean,
  ingredients: [String],
  preparationTime: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or cloud connection
- Git for version control

### 1. Clone Repository
```bash
git clone <repository-url>
# 🍽️ CampusEats - BMSCE Online Food Platform

A modern, responsive web application for ordering food on the BMSCE campus. Built with React, Node.js, and MongoDB.

## 🌐 Live Demo

**🚀 [Access CampusEats](https://fwd-oxs1-git-main-lallibhais-projects.vercel.app/)**

## ✨ Features

- 🔐 **Secure Authentication** - Email-based registration for BMSCE students
- 🍕 **Food Menu** - Browse delicious campus food items
- 🛒 **Shopping Cart** - Add/remove items with real-time updates
- 💰 **Multiple Payment Options** - UPI and Cash on Delivery
- 📱 **Mobile Optimized** - Responsive design for all devices
- 👤 **User Profile** - Manage personal information
- ⚡ **Real-time Updates** - Instant cart and order updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: MongoDB Atlas

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/lalitsureliya-2005/fwd.git
   cd fwd
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/campuseats
   npm install
   
   # Create .env file
   VITE_API_URL=http://localhost:5000
   
   npm run dev
   ```

## 📱 Payment Options

- **💳 UPI Payment** - Scan QR code with any UPI app
- **💰 Cash on Delivery** - Pay when your order arrives

## 🎯 User Roles

- **👨‍🎓 Students** - Browse menu, place orders, manage profile
- **👨‍💼 Admin** - Manage food items, view orders (future feature)

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campuseats
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

## 📂 Project Structure

```
fwd/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── server.js        # Express server
│   └── db.js           # Database connection
├── frontend/campuseats/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # API utilities
│   │   └── assets/      # Static assets
│   └── public/          # Public files
└── README.md
```

## 🌟 Key Features

### 🔐 Authentication
- BMSCE email validation (@bmsce.ac.in)
- Secure JWT token system
- Protected routes

### 🍽️ Food Ordering
- Real-time cart management
- Category-wise food browsing
- Quantity management
- Order summary

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Lalit Sureliya**
- GitHub: [@lalitsureliya-2005](https://github.com/lalitsureliya-2005)
- Project Link: [https://github.com/lalitsureliya-2005/fwd](https://github.com/lalitsureliya-2005/fwd)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🎉 Made with ❤️ for BMSCE students by Lalit Sureliya**
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/campuseats
JWT_SECRET=your_super_secure_jwt_secret_key_here
PORT=5000
NODE_ENV=production
```

Start backend server:
```bash
npm start
```
Server runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend/campuseats
npm install
```

Start frontend development server:
```bash
npm run dev
```
Application runs on: http://localhost:3000

### 4. Database Seeding
```bash
# Run the seeding script (if available)
cd backend
node seedFoodItems.js
```

## 📁 Project Structure

```
fwd/
├── backend/                    # Express.js API server
│   ├── models/                # MongoDB schemas
│   │   ├── userModel.js       # User authentication model
│   │   └── foodItemModel.js   # Food item data model
│   ├── routes/                # API route handlers
│   ├── middleware/            # Authentication middleware
│   ├── seedFoodItems.js       # Database seeding script
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
├── frontend/campuseats/       # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── DashboardPage.jsx    # Main food menu
│   │   │   ├── CartPage.jsx         # Shopping cart
│   │   │   ├── ProfilePage.jsx      # User profile
│   │   │   ├── LoginPage.jsx        # Authentication
│   │   │   ├── RegisterPage.jsx     # User registration
│   │   │   ├── AddToCartButton.jsx  # Animated cart button
│   │   │   └── PrivateRoute.jsx     # Route protection
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Custom styling
│   │   └── main.jsx           # React entry point
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── package.json           # Frontend dependencies
└── README.md                  # Project documentation
```

## 🌟 Key Features Deep Dive

### 🎭 Animation System
- **Card Hover Effects**: 3D transforms with spring physics
- **Loading States**: Smooth skeleton loading and spinners
- **Page Transitions**: Staggered animations for content
- **Micro-interactions**: Button feedback and state changes
- **Scroll Animations**: Progressive element reveals

### 🎨 Design System
- **Color Palette**: Professional blue gradient theme
- **Typography**: Inter font with consistent hierarchy
- **Spacing**: 8px grid system for perfect alignment
- **Components**: Reusable, consistent UI elements
- **Accessibility**: WCAG compliant color contrasts

### 🔒 Security Features
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Mongoose ODM protection
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token-based requests
- **Environment Security**: Sensitive data in environment variables

### 📱 Mobile Responsiveness
- **Breakpoints**: Tailwind responsive classes
- **Touch Interactions**: Mobile-optimized gestures
- **Performance**: Optimized images and lazy loading
- **PWA Ready**: Progressive web app capabilities

## 🚀 Deployment

### Production Build
```bash
# Frontend build
cd frontend/campuseats
npm run build

# Backend production
cd backend
npm run start
```

### Environment Variables
```env
# Production environment
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-cluster-url
JWT_SECRET=your-production-secret
PORT=5000
```

## 🧪 Testing

### Development Testing
```bash
# Test cart functionality
# Test authentication flows
# Test responsive design
# Test API endpoints
```

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Food Item Endpoints
- `GET /api/food-items` - Get all food items
- `GET /api/food-items/:id` - Get specific food item
- `GET /api/food-items/category/:category` - Get items by category

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Development Team

- **Full-Stack Development**: Complete MERN stack implementation
- **UI/UX Design**: Modern, responsive interface design
- **Database Architecture**: MongoDB schema design and optimization
- **Authentication System**: Secure JWT implementation

## 🔄 Version History

### v2.0.0 (Current)
- ✅ Complete cart system with persistence
- ✅ UPI payment integration with QR codes
- ✅ Modern profile management
- ✅ 17 vegetarian menu items
- ✅ Advanced animations and micro-interactions
- ✅ Pre-order pickup model
- ✅ Comprehensive error handling
- ✅ Production-ready deployment

### v1.0.0 (Previous)
- Basic authentication system
- Simple food menu display
- Basic cart functionality
- Simple UI design

## 📞 Support

For support, email: campuseats@bmsce.ac.in

---

<div align="center">
  <p><strong>Built with ❤️ for BMSCE Community</strong></p>
  <p>🍽️ Enjoy your campus dining experience! 🍽️</p>
</div>