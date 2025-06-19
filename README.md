# ScholarBloom

ScholarBloom is a web application designed to provide students with access to scholarships, job opportunities, and challenges to help them grow academically and professionally.

## Live Application

You can access the live application here: [ScholarBloom Live](https://scholarbloom.netlify.app/)

## Features

- Apply for scholarships and jobs
- Participate in challenges and win rewards
- User profile management
- Application and submission status tracking
- Role-based access control

## Future Improvements

- Enhanced AI-driven scholarship and job recommendations
- Mobile app version for better accessibility
- Integration with more universities and organizations
- Advanced analytics dashboard for users and administrators
- Multi-language support beyond English

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ScholarBloom.git
cd ScholarBloom
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Running the Application Locally

### Frontend

Start the development server:
```bash
npm start
```

### Backend

You can run the backend server locally using Docker:

```bash
docker pull 777batman/scholarbloom-backend
docker run -p 5000:5000 777batman/scholarbloom-backend
```

This will start the backend server on port 5000.

## Usage

1. Create a student account
2. Browse scholarships, jobs, and challenges
3. Submit applications and participate in challenges
4. Manage your profile and track application statuses

## Technologies Used

- React.js
- Firebase Authentication
- Firebase Firestore
- Tailwind CSS

## Contribution

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
