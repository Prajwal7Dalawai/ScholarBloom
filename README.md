# ScholarBloom

ScholarBloom is a platform that helps students earn scholarships through skills and learning. It features gamified learning, virtual currency (EduCoins), and job opportunities with universities.

## Features

- **Gamified Learning**: Students earn EduCoins by learning new skills
- **Scholarships**: Apply for scholarships from various universities
- **Job Opportunities**: Access job opportunities with partner universities
- **Wallet System**: Securely store and manage EduCoins
- **Profile Management**: Students and universities can manage their profiles

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion (for animations)
- React Router (for routing)
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (for authentication)
- Mongoose (MongoDB ODM)

## Project Structure

```
ScholarBloom/
├── frontend/                 # Frontend code
│   ├── public/              # Static files
│   └── src/                 # React code
│       ├── Components/      # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # React context
│       └── utils/          # Utility functions
├── backend/                 # Backend code
│   ├── Models/             # Mongoose models
│   ├── Routes/             # API routes
│   ├── Middleware/         # Middleware functions
│   └── controllers/        # Route controllers
└── README.md               # Project documentation
```

## Running Locally

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ScholarBloom.git
cd ScholarBloom
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Set up environment variables**
Create a `.env` file and add the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/scholarbloom
JWT_SECRET=your_jwt_secret
```

4. **Start the backend server**
```bash
npm start
```

5. **Frontend Setup**
```bash
cd ../frontend
npm install
```

6. **Start the frontend server**
```bash
npm start
```

7. **Open the application in your browser**
```
http://localhost:3000
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new users
- `POST /api/auth/login` - Login users
- `GET /api/auth/profile` - Get user profile

### Scholarships
- `GET /api/scholarships` - Get all scholarships
- `POST /api/scholarships` - Create new scholarship
- `GET /api/scholarships/:id` - Get specific scholarship
- `PUT /api/scholarships/:id` - Update scholarship
- `DELETE /api/scholarships/:id` - Delete scholarship

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get specific job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Contact

For questions or feedback, please email: support@scholarbloom.com 