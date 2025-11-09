# CampusEats Backend API

Backend API for the CampusEats food ordering platform.

## 🚀 Deployment

### Environment Variables Required:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key for authentication

### Quick Deploy:
1. Set environment variables
2. Run `npm install`
3. Run `npm start`

## 📁 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Food Items
- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get food item by ID

## 🗄️ Database
Uses MongoDB with Mongoose ODM.

## 🔒 Security
- JWT authentication
- bcrypt password hashing
- Input validation