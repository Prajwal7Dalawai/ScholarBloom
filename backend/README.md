# Backend Documentation

This directory contains the backend code for the ScholarBloom application, built with Node.js, Express.js, and MongoDB.

## Directory Structure

```
backend/
├── Models/             # Mongoose models
│   ├── user-schema.js  # User model
│   ├── Job-Schema.js   # Job model
│   └── Scholarship.js  # Scholarship model
├── Routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── jobs.js         # Job routes
│   └── scholarships.js # Scholarship routes
├── Middleware/         # Middleware functions
│   ├── auth.js         # Authentication middleware
│   └── verifyToken.js  # Token verification middleware
├── controllers/        # Route controllers
│   ├── authController.js # Authentication controllers
│   ├── jobController.js  # Job controllers
│   └── scholarshipController.js # Scholarship controllers
├── config/            # Configuration files
│   └── db.js          # Database configuration
└── server.js          # Main server file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Scholarships
- `GET /api/scholarships` - Get all scholarships
- `POST /api/scholarships` - Create a new scholarship
- `GET /api/scholarships/:id` - Get a specific scholarship
- `PUT /api/scholarships/:id` - Update a scholarship
- `DELETE /api/scholarships/:id` - Delete a scholarship
- `GET /api/scholarships/applications` - Get scholarship applications

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get a specific job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job
- `GET /api/jobs/applications` - Get job applications

## Models

### User Model
- Basic user information
- Role-based access (student/university)
- Authentication details
- Profile information

### Scholarship Model
- Scholarship details
- Eligibility criteria
- Application process
- Status tracking

### Job Model
- Job details
- Requirements
- Application process
- Status tracking

## Setup and Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/scholarbloom
JWT_SECRET=your_jwt_secret
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS configuration

## Error Handling

- Centralized error handling
- Custom error classes
- Detailed error messages
- Logging system

## Contributing

When adding new features:
1. Create appropriate models
2. Add route handlers
3. Implement controllers
4. Add middleware if needed
5. Include tests
6. Update documentation 