<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" /> 
    <img src="https://img.shields.io/badge/-Express_5-000000?style=for-the-badge&logo=Express&logoColor=white" /> 
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
    <br/>
    <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" /> 
    <img src="https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white" /> 
    <img src="https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white" />
    <br/>
    <img src="https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white" />
    <img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" />
    <img src="https://img.shields.io/badge/-Winston-FFCC00?style=for-the-badge&logo=Winston&logoColor=black" />
  </div>
</div>

# Event Registration API

> **Production-Grade Event Management Backend** — A fully-featured REST API for managing events and user registrations, built with modern best practices, enterprise-level security, and scalable architecture.

A comprehensive backend solution for event management that handles complex business logic including event creation, capacity management, user registration, and secure authentication. This project demonstrates production-ready API development with robust error handling, input validation, role-based access control, and comprehensive logging.

---

## 🎯 What This Project Does

The Event Registration API is a complete event management system backend that enables:

- **Event Management**: Create, retrieve, update, and delete events with comprehensive metadata
- **User Registration**: Allow users to register for events with automatic capacity validation and duplicate prevention
- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control (Admin/User)
- **Media Management**: Upload and manage event banners via Cloudinary integration
- **Registration Management**: Users can view and cancel their event registrations with proper authorization checks
- **Data Validation**: Input validation at multiple layers using Zod schemas
- **Production Security**: CORS protection, rate limiting, helmet security headers, password hashing with bcrypt

---

## ✨ Key Features

### 🔐 Security & Authentication
- **JWT Token System**: Access and refresh tokens for secure API access
- **Role-Based Authorization**: Admin and User roles with granular permission control
- **Password Security**: Bcrypt hashing with configurable salt rounds
- **Rate Limiting**: Express rate limit middleware to prevent abuse
- **Security Headers**: Helmet.js for HTTP security headers
- **Input Sanitization**: DOMPurify integration for XSS prevention
- **CORS Protection**: Configurable Cross-Origin Resource Sharing

### 📋 Business Logic
- **Event Capacity Management**: Automatic capacity checks during registration
- **Duplicate Prevention**: Prevents users from registering for the same event twice
- **Real-time Population**: Mongoose lean queries for optimized data fetching
- **User Isolation**: Automatic filtering of data based on user identity
- **Pagination Support**: Efficient event listing with limit and offset

### 🛠️ Developer Experience
- **TypeScript**: Full type safety with custom type definitions
- **Comprehensive Validation**: Zod schemas for all endpoints (body, params, query)
- **Structured Logging**: Winston logger for production-grade monitoring
- **Error Handling**: Consistent error response format across all endpoints
- **Path Aliases**: TypeScript path aliases (@/) for cleaner imports
- **Hot Reload**: Nodemon for development with watch mode

### 🎨 Code Quality
- **Modular Architecture**: Clear separation of concerns (routes, controllers, models, validations)
- **RESTful API Design**: Standard HTTP methods and status codes
- **Middleware Pattern**: Reusable middleware for authentication, validation, and authorization
- **Environment Configuration**: Secure configuration management with .env files
- **Apache 2.0 License**: Copyright protected and open source

---

## 📊 API Endpoints Overview

### **Authentication Routes** (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login and get JWT tokens | ❌ |
| POST | `/refresh-token` | Refresh access token | ❌ |
| POST | `/logout` | Logout user | ✅ |

### **Event Routes** (`/api/v1/events`)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/` | Create new event | Admin |
| GET | `/` | List all events (paginated) | User/Admin |
| GET | `/:eventId` | Get event details | User/Admin |
| PUT | `/:eventId` | Update event | Admin |
| DELETE | `/:eventId` | Delete event | Admin |

### **Registration Routes** (`/api/v1/registrations`)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/` | Get user's registrations | User/Admin |
| POST | `/:eventId` | Register for event | User/Admin |
| DELETE | `/:id` | Cancel registration | User/Admin |

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mine0059/Apexcifytechnologys_event_registration.git
cd Apexcifytechnologys_event_registration
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/event_registration

# JWT
JWT_ACCESS_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Cloudinary
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

# Logging
LOG_LEVEL=debug
```

4. **Start the development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── controllers/v1/          # Request handlers
│   ├── auth/                # Authentication controllers
│   ├── event/               # Event management controllers
│   └── registration/        # Registration controllers
├── models/                  # Mongoose schemas
│   ├── user.ts
│   ├── event.ts
│   ├── registration.ts
│   └── token.ts
├── routes/v1/               # API routes
│   ├── auth.ts
│   ├── event.ts
│   ├── registration.ts
│   └── index.ts
├── middlewares/             # Express middlewares
│   ├── authenticated.ts     # JWT verification
│   ├── authorize.ts         # Role-based access
│   ├── validate.ts          # Request validation
│   └── uploadEventBanner.ts # Cloudinary upload
├── validations/             # Zod schemas
│   ├── auth.ts
│   ├── event.ts
│   └── registration.ts
├── lib/                     # Utilities & configurations
│   ├── mongoose.ts
│   ├── cloudinary.ts
│   ├── jwt.ts
│   └── winston.ts
└── server.ts                # Application entry point
```

---

## 🔒 Authentication Flow

1. **Register**: User provides username, email, password → Stored with bcrypt hashing
2. **Login**: User provides credentials → Returns access & refresh tokens (JWT)
3. **Access Protected Routes**: Send access token in Authorization header
4. **Token Refresh**: Use refresh token to get new access token when expired
5. **Logout**: Invalidate tokens on server

**Header Format:**
```
Authorization: Bearer <access_token>
```

---

## 📝 Example Requests

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { ... }
}
```

### Create Event (Admin Only)
```bash
POST /api/v1/events
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Tech Conference 2026",
  "description": "Annual tech conference",
  "location": "San Francisco, CA",
  "date": "2026-06-15",
  "time": "09:00",
  "capacity": 500,
  "isVirtual": false,
  "banner_image": <file>
}
```

### Register for Event
```bash
POST /api/v1/registrations/:eventId
Authorization: Bearer <token>

Response:
{
  "registration": {
    "_id": "...",
    "event": "...",
    "user": "...",
    "registrationDate": "2026-03-27T..."
  }
}
```

### Get User's Registrations
```bash
GET /api/v1/registrations
Authorization: Bearer <token>

Response:
{
  "registrations": [
    {
      "_id": "...",
      "event": {
        "_id": "...",
        "name": "Tech Conference 2026",
        "date": "2026-06-15",
        "location": "San Francisco, CA"
      },
      "registrationDate": "2026-03-27T..."
    }
  ]
}
```

---

## 🛡️ Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

```json
{
  "code": "ErrorCode",
  "message": "Human-readable error message"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔄 Data Validation

All inputs are validated using Zod schemas:

- **Body Validation**: POST/PUT requests validated against schemas
- **Params Validation**: Route parameters (IDs) validated as MongoDB ObjectIds
- **Query Validation**: Query strings validated for type and range
- **Custom Error Messages**: Descriptive validation errors

Example validation response:
```json
{
  "code": "ValidationError",
  "message": "Invalid request data",
  "errors": {
    "email": "Invalid email format"
  }
}
```

---

## 📊 Database Schema

### User Schema
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `role` - 'admin' or 'user'
- `firstName`, `lastName` - Optional user details

### Event Schema
- `title` - Event name
- `description` - Event details
- `location` - Physical or virtual location
- `date` - Event date
- `time` - Event start time
- `capacity` - Maximum attendees
- `banner` - Cloudinary image reference
- `isVirtual` - Boolean flag
- `createdBy` - Reference to user (admin)
- `status` - 'draft' or 'published'

### Registration Schema
- `event` - Reference to Event
- `user` - Reference to User
- `registrationDate` - Auto-generated timestamp

---

## 🧪 Testing

Currently using HTTP file testing. A test file is included: `test.http`

---

## 🚢 Production Deployment

### Environment Setup
1. Use production MongoDB instance (Atlas, Azure Cosmos, etc.)
2. Set `NODE_ENV=production`
3. Use strong JWT secrets (minimum 32 characters)
4. Enable rate limiting in production
5. Configure proper CORS origins
6. Use HTTPS/SSL certificates
7. Monitor with Winston logs and external services

### Performance Tips
- Enable compression middleware (already included)
- Use MongoDB indexes on frequently queried fields
- Implement caching for event listings
- Consider CDN for image delivery (Cloudinary)
- Monitor endpoints with application performance tools

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
```bash
git clone https://github.com/mine0059/Apexcifytechnologys_event_registration.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```

4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Code Standards
- Follow existing code style (TypeScript)
- Add type definitions for new code
- Include error handling
- Write validation schemas for new endpoints
- Update this README with new features

---

## 📚 Technology Stack

| Technology | Purpose | Version |
|---|---|---|
| **Node.js** | Runtime Environment | 18+ |
| **Express** | Web Framework | 5.2.1 |
| **TypeScript** | Type Safety | 5.9.3 |
| **MongoDB** | NoSQL Database | Latest |
| **Mongoose** | ODM | 9.3.1 |
| **Zod** | Schema Validation | 4.3.6 |
| **JWT** | Authentication | 9.0.3 |
| **Bcrypt** | Password Hashing | 6.0.0 |
| **Cloudinary** | Image Storage | 2.9.0 |
| **Winston** | Logging | 3.19.0 |
| **Helmet** | Security Headers | 8.1.0 |
| **Express Rate Limit** | Rate Limiting | 8.3.1 |
| **Multer** | File Upload | 2.1.1 |
| **Nodemon** | Development Watch | 3.1.14 |

---

## 📖 API Documentation

For detailed endpoint documentation, see the `test.http` file included in the repository. You can use:
- **VS Code Extension**: REST Client
- **Postman**: Import the HTTP file
- **Insomnia**: Compatible format
- **cURL**: Manual testing from terminal

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check if MongoDB service is running
- Ensure network access is allowed (for cloud databases)

### Cloudinary Upload Fails
- Verify `CLOUDINARY_CLOUD_NAME`, `API_KEY`, and `API_SECRET`
- Check image size (must be under 100MB)
- Ensure multer is configured correctly

### JWT Token Errors
- Verify tokens are in Authorization header
- Check token expiration time
- Ensure secrets are configured correctly

### Rate Limiting Issues
- Check rate limit configuration
- Clear browser cookies if testing
- Adjust rate limit settings as needed

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the LICENSE file for details.

**© 2026 Oghenemine Emmanuel** - All rights reserved.

---

## 👨‍💻 Author

**Oghenemine Emmanuel**
- Building production-ready APIs with Node.js and TypeScript
- Focus on security, scalability, and developer experience

---

## 🙏 Acknowledgments

- Express.js team for the robust framework
- MongoDB for reliable data storage
- Cloudinary for media management
- The TypeScript community for type safety
- Zod for schema validation

---

<div align="center">
  
**⭐ If you find this project useful, please star it on GitHub!**

[Issues](https://github.com/mine0059/Apexcifytechnologys_event_registration/issues) • [Discussions](https://github.com/mine0059/Apexcifytechnologys_event_registration/discussions) • [Wiki](https://github.com/mine0059/Apexcifytechnologys_event_registration/wiki)

</div>
