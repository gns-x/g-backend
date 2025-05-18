# Student Management and Pickup System

A comprehensive NestJS-based backend system for managing student information, pickup requests, and real-time notifications in an educational institution.

## 🚀 Features

- **Authentication System**
  - Multi-role authentication (Staff, Parents, Teachers)
  - JWT-based secure authentication
  - Role-based access control

- **Student Management**
  - Complete student profile management
  - Grade-wise student organization
  - Parent and teacher associations
  - Card-based identification system

- **Pickup System**
  - Real-time pickup request management
  - Email notifications for pickup requests
  - Location tracking
  - Status updates (In Class, Pending Pickup, With Parent)

- **Real-time Communication**
  - WebSocket integration for live updates
  - Pusher integration for real-time notifications
  - Multi-channel communication system

- **Financial Management**
  - Student balance tracking
  - Subscription management (Annual/Term based)
  - Transaction history
  - Product management system

## 🛠 Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Communication**: 
  - WebSocket (Socket.io)
  - Pusher
- **Email Service**: Nodemailer
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Validation**: class-validator & class-transformer

## 📦 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Pusher account
- SMTP server access

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/gns-x/g-backend.git
   cd project-directory-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   JWT_SECRET="your-secret-key"
   PUSHER_APP_ID="your-pusher-app-id"
   PUSHER_KEY="your-pusher-key"
   PUSHER_SECRET="your-pusher-secret"
   PUSHER_CLUSTER="your-pusher-cluster"
   SMTP_HOST="your-smtp-host"
   SMTP_PORT="587"
   SMTP_USER="your-smtp-user"
   SMTP_PASS="your-smtp-password"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run start:dev
   ```

## 🏗 Project Structure

```
src/
├── auth/           # Authentication module
├── email/          # Email service module
├── pickup/         # Pickup system module
├── prisma/         # Database configuration
├── pusher/         # Real-time notifications
├── students/       # Student management
├── websocket/      # WebSocket implementation
└── main.ts         # Application entry point
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - Parent/Teacher login
- `POST /api/auth/clogin` - Staff login

### Student Management
- `GET /api/students/grade/:grade` - Get students by grade
- `GET /api/students/:userId/:role` - Get students by user
- `PATCH /api/students/:studentId/status` - Update student status

### Pickup System
- `POST /api/pickup/request` - Create pickup request

### Products and Transactions
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product

## 🔒 Security Features

- CORS protection
- Input validation
- JWT authentication
- Role-based access control
- Request rate limiting
- Secure password hashing

## 🚀 Deployment

The application is configured for deployment on Vercel with the following features:
- Automatic deployments
- Environment variable management
- WebSocket support
- API routing configuration

## 📈 Monitoring and Insights

The system includes built-in insights and monitoring:
- Student statistics
- Transaction analytics
- Real-time system status
- Subscription tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
